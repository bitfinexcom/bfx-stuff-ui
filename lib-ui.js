function addMark(wss, opts) {
  opts.type = 'marker_create'
  wss.send(JSON.stringify(
    [0, 'n', 12345, {
      type: 'ucm-ui-chart',
      info: opts 
    }])
  )
}

function clearMarks(wss) {
  wss.send(JSON.stringify([0, 'n', 12345, { type: 'ucm-ui-chart', info: {
    type: 'marker_clear',
  } }])
  )
}

function sendNotification (wss, image, link, message, sound) {
  wss.send(JSON.stringify([0, 'n', 12345, { type: 'ucm-notify-ui', info: {
    type: 'all',
    level: 'success',
    image: image,
    link: link,
    message: message,
    sound: sound
  } }]))
}

module.exports = {
  clearMarks: clearMarks,
  sendNotification: sendNotification,
  addMark: addMark
}
