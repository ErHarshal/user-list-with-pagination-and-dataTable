$(document).ready(() => {
    $('#signUpForm').validate({
        'rules': {
            'firstName': {
                'required': true
            },
            'lastName': {
                'required': true
            },
            'email': {
                'required': true
            },
            'pwd': {
                'required': true
            }
        },
        'messages': {
            'firstName': {
                'required': 'Please enter first name',
            },
            'lastName': {
                'required': 'Please enter last name'
            },
            'email': {
                'required': 'Please enter email address'
            },
            'pwd': {
                'required': 'Please enter password'
            }
        },
        'submitHandler': () => {
            let formData = $('#signUpForm').serialize();
            console.log('form data :',formData);

            $.ajax({
                'url': '/register',
                'data': formData,
                'type': 'POST'
            }).then((res) => {                
                alert(res.message);
                window.location.href = '/';
            }).catch((err) => {
                console.log('Something went wrong while registration')
            });
        }
    });
});
