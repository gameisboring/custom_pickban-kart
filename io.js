module.exports = (app) => {
  app.io = require('socket.io')()

  app.io.on('connection', (socket) => {
    console.log('User Connect')

    socket.on('joinRoom', (name) => {
      console.log('joinRoom : ' + name)
      app.io.emit('joinRoom', name)
    })

    socket.on('chat message', (roomName, name, msg) => {
      console.log(msg)
      app.io.emit('chat message', roomName, name, msg)
    })

    socket.on(
      'map select',
      (selectedChamp, selectedChampName, teamAndNumber) => {
        console.log(selectedChamp)
        console.log(selectedChampName)
        console.log(teamAndNumber)
        app.io.emit(
          'map select',
          selectedChamp,
          selectedChampName,
          teamAndNumber
        )
      }
    )

    socket.on('view on', () => {
      console.log('view on')
      app.io.emit('view on')
    })

    socket.on('view off', () => {
      console.log('view off')
      app.io.emit('view off')
    })
  })

  return app.io
}
