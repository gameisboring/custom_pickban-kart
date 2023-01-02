const multer = require('multer')
const path = require('path')
const config = require('./data/server-config.json')

/**
 * Multer Upload Middleware
 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, config.thumbSaveRoute) // config에 세팅된 폴더 안에 저장
    },
    filename(req, file, done) {
      console.log(req.body)
      if (!req.body.mapName) {
        console.log('champ name is empty')
      }
      done(null, req.body.mapName + path.extname(file.originalname)) // 파일이름-날짜.확장자로 저장
    },
  }),
  fileFilter: (req, file, done) => {
    switch (file.mimetype) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
      case 'image/jpg':
        {
          console.log('이미지 파일 입니다')
          done(null, true)
        }
        break
      default:
        console.log('이미지 파일만 업로드 가능합니다.')
        done(null, false)
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
})

module.exports = { upload }
