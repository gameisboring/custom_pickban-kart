const name = '컨트롤러'
const socket = io.connect()

const modalmap = $('.modal .modalBody .maps')
const onBtn = $('.buttons button.on')
const offBtn = $('.buttons button.off')

/**
 * pick buttons click event
 */
$('#pickban .team .picks .pick').on('click', (e) => {
  modalOn()
  if (!$('.modal').hasClass('show')) {
    $('body').css('overflow', 'hidden')
  }
  sendmapSelectWithAjax(e)
})

$('#pickban .team .bans .ban').on('click', (e) => {
  modalOn()
  if (!$('.modal').hasClass('show')) {
    $('body').css('overflow', 'hidden')
  }
  sendmapSelectWithAjax(e)
})

$('.modal').on('click', (e) => {
  if (e.target === $('.modal')[0]) {
    modalOff()
    if (!$('.modal').hasClass('show')) {
      $('body').css('overflow', 'auto')
    }
  }
})

onBtn.on('click', (e) => {
  console.log('on click')
  socket.emit('view on')
  $('.buttons .status').text('ON')
})

offBtn.on('click', (e) => {
  console.log('off click')
  socket.emit('view off')
  $('.buttons .status').text('OFF')
})

function modalOn() {
  $('.modal').addClass('show')
  $('.modal').removeClass('hide')
}
function modalOff() {
  $('.modal').addClass('hide')
  $('.modal').removeClass('show')
}

function mapBtnClick(e, map) {
  // 입력될 Info
  const mapName = map.srcElement.attributes.cname.value
  const mapThumb = map.srcElement.attributes.cthumb.value
  const teamAndNumber = JSON.parse(JSON.stringify(e.target.classList))
  // 입력될 Element
  // e.target.innerText = mapName
  e.target.innerText = ''
  e.target.previousElementSibling.style.background = `url('images/upload/${mapThumb}') no-repeat center top/ cover`
  console.log()
  modalOff()
  socket.emit('map select', mapThumb, mapName, teamAndNumber)
}

function sendmapSelectWithAjax(e) {
  $.ajax({
    url: 'map',
    methods: 'GET',
    success: (res) => {
      modalmap.empty()
      console.log(res)
      for (i in res) {
        const mapBtn = document.createElement('div')
        mapBtn.classList.add('mapSelectBtn')
        mapBtn.style.background = `rgba(0, 0, 0, 0.5) url('images/upload/${res[i].map_thumb}') no-repeat center center/cover`
        mapBtn.setAttribute('cname', res[i].map_name)
        mapBtn.setAttribute('cthumb', res[i].map_thumb)
        mapBtn.onclick = (map) => {
          mapBtnClick(e, map)
        }
        mapBtn.innerText = res[i].map_name

        modalmap.append(mapBtn)
      }
    },
  })
}
