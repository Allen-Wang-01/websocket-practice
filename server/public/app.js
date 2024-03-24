const socket = io('ws://localhost:3500')
const activity = document.querySelector('.activity')
const msginput = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()
    if (msginput.value) {
        socket.emit('message', msginput.value)
        msginput.value = ""
    }
    msginput.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages
socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msginput.addEventListener("keypress", () => {
    socket.emit('activity', socket.id.substring(0, 5))
})

let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`
    //Clear after 1 seconds
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ''
    }, 1000)
})

