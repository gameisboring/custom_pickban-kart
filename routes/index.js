const express = require('express')
const router = express.Router()
const fs = require('fs')
const models = require('../models')
const { upload } = require('../multer')
const layoutConfig = require('../data/layout-config.json')

/*
 * check and make
 */

try {
  fs.existsSync('public/images/upload')
} catch {
  console.error('public/images/upload 폴더가 없습니다. 폴더를 생성합니다.')
  fs.mkdirSync('public/images/upload', { recursive: true }) // 폴더 생성
}

try {
  fs.readFileSync('data/map.json')
} catch (error) {
  const data = []
  console.error('map.json 파일이 없습니다. 새로운 map.js 파일을 생성합니다.')
  fs.writeFileSync('data/map.json', JSON.stringify(data)) // 폴더 생성
}
const maps = require('../data/map.json')

/**
 * GET /
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: '맵 등록' })
})

/**
 * GET /champ : get Map data from DB
 */
router.get('/map', async (req, res) => {
  await models.map
    .findAll({ raw: true })
    .then((result) => {
      res.send(result)
    })
    .catch((e) => {
      console.log(e)
      res.send({ ok: false })
    })
})

/**
 * POST /chmap : write json
 */
router.post('/map', upload.single('mapThumb'), async function (req, res, next) {
  console.log(req.file.path + ' 에 저장되었습니다')
  /*  console.log(req.body.mapName)
  console.log(req.body.mapDesc)
  console.log(req.file.filename) */

  //DB 입력
  await models.map
    .create({
      map_thumb: req.file.filename,
      map_name: req.body.mapName,
      map_desc: req.body.mapDesc,
    })
    .then((result) => {
      if (result._options.isNewRecord) {
        res.status(200)
        res.statusMessage = 'good'
        res.send()
      } else {
        res.status(500)
        res.statusMessage = 'wrong'
      }
    })
    .catch((err) => {
      console.error(err)
    })

  // const result = fs.writeFileSync('data/champ.json', JSON.stringify(champions))
})

/**
 * GET /view
 */
router.get('/view', async (req, res) => {
  var obj = new Object()

  await models.Config.findAll({ raw: true }).then((result) => {
    result.forEach((element) => {
      obj[element.config_name] = element.config_value
    })
    res.render('view', obj)
  })
})

/**
 * GET /controller
 */
router.get('/controller', async (req, res) => {
  var obj = new Object()

  await models.Config.findAll({ raw: true }).then((result) => {
    result.forEach((element) => {
      obj[element.config_name] = element.config_value
    })
    res.render('controller', obj)
  })
})

/**
 * GET /view
 */
router.get('/view2', async (req, res) => {
  var obj = new Object()

  await models.Config.findAll({ raw: true }).then((result) => {
    result.forEach((element) => {
      obj[element.config_name] = element.config_value
    })
    res.render('view_bo', obj)
  })
})

/**
 * GET /controller
 */
router.get('/controller2', async (req, res) => {
  var obj = new Object()

  await models.Config.findAll({ raw: true }).then((result) => {
    result.forEach((element) => {
      obj[element.config_name] = element.config_value
    })
    res.render('controller_bo', obj)
  })
})

module.exports = router
