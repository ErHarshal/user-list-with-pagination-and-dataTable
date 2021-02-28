$(document).ready(() => {
    $('#btn').on('click', () => {
        if($('#email').val() !== '' && $('#password').val() !== '') {
            let formData = {
                'email': $('#email').val(),
                'pwd': $('#password').val()
            };
    
            $.ajax({
                'url': '/',
                'data': formData,
                'type': 'POST'
            }).then((res) => {
                if(res.url === '/login'){
                    alert('Please enter correct password');
                    location.reload();
                }else{
                    window.location.href = '/dashboard'
                }
            }).catch((err) => {
                console.log('Something went wrong while registration')
            });
        }else{
            $('#loginError').show();
        }
    });

    $('#email,#password' ).keyup(() => {
        $('#loginError').hide();
    })
});