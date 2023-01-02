const socket = io()

socket.on('map select', (image, name, classList) => {
  let selector = $(`#pickban .${classList[0]}.${classList[2]}`)

  /* let selector = document.querySelectorAll(
    `#pickban .picks .${classList[0]}.${classList[2]}`
  ) */
  console.log(image)
  console.log('selector1', selector)
  if (classList[0] === 'pick') {
    selector.css('background-image', `url("images/upload/${image}")`)
  } else if (classList[0] === 'ban') {
    selector.css('background-image', `url("images/upload/${image}")`)
  }
})

socket.on('view on', () => {
  console.log('pickban started !')

  let selector = $(`#pickban`)
  selector.addClass('on')
})

socket.on('view off', () => {
  console.log('pickban ended !')

  let selector = $(`#pickban`)
  selector.removeClass('on')
})
