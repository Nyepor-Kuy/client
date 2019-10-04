function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    Swal.fire({
        title: `Connecting to server...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();
    $.ajax({
        url: `${baseURL}/users/loginGoogle`,
        method: 'post',
        data: {
            token: id_token
        }
    })
        .done(({ token }) => {
            localStorage.setItem('token', token)
            $('.landingPage').hide()
            $('.main').show()
            Swal.close()
            Swal.fire('Success!', "Your Account is Logged in!", 'success')
        })
        .fail(err => {
            let msg = "Fail to Login";
            Swal.fire("Error!", msg, "error");
        })
}

function getRegister() {
    let name = $('#nameRegis').val()
    let email = $('#emailRegis').val()
    let password = $('#passwordRegis').val()

    Swal.fire({
        title: `Creating Your Account...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();

    $.ajax({
        url: `${baseURL}/users/register`,
        method: `post`,
        data: {
            name, email, password
        }
    })
        .done(({ token }) => {
            localStorage.setItem('token', token)
            $('.landingPage').hide()
            $('.main').show()
            Swal.close()
            Swal.fire('Success!', "Your Account is Created!", 'success')
        })
        .fail(err => {
            let msg = "Fail to Register";
            Swal.fire("Error!", msg, "error");
        })
        .always(() => {
            $('#nameRegis').val('')
            $('#emailRegis').val('')
            $('#passwordRegis').val('')
        })
}


function getLogin() {
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()

    Swal.fire({
        title: `Connecting to Server...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();

    $.ajax({
        url: `${baseURL}/users/login`,
        method: `post`,
        data: {
            email, password
        }
    })
        .done(({ token }) => {
            localStorage.setItem('token', token)
            $('.landingPage').hide()
            $('.main').show()
            Swal.close()
            Swal.fire('Success!', "Your Account is Logged in!", 'success')
        })
        .fail(err => {
            let msg = "Fail to Login";
            Swal.fire("Error!", msg, "error");
        })
        .always(() => {
            $('#emailLogin').val('')
            $('#passwordLogin').val('')
        })
}

function signOut() {
    if (gapi.auth2) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.removeItem('token')
        });
    }
    console.log('User signed out.');
    localStorage.removeItem('token')
    $('.landingPage').show()
    $('.main').hide()
    Swal.fire('Success!', "Your Account is Logged out!", 'success')
}

