$('#toLogin').on('click', function (e) {
    e.preventDefault()
    $('.login-box').show()
    $('.register-box').hide()
})

$('#toRegister').on('click', function (e) {
    e.preventDefault()
    $('.login-box').hide()
    $('.register-box').show()
})