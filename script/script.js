const baseURL = `http://localhost:3000`

$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('.landingPage').hide()
        $('.main').show()
    } else {
        $('.landingPage').show()
        $('.main').hide()
    }

    $('#btn-register').on('click', function (e) {
        e.preventDefault()
        getRegister()
    })

    $('#btn-login').on('click', function (e) {
        e.preventDefault()
        getLogin()

    })
})