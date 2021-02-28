$(document).ready(function () {
    var abc = $('#userList').DataTable({
        "bLengthChange": false,
        "searching": true,
        "processing": true,
        "serverSide": true,
        'filter': false,
        'orderMulti': false,
        "iDisplayLength": 2,
        'columns': [
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "emailId" },
            { "data": "orgnizationName" },
            { "data": "employeeId" },
        ],        
        'ajax': {
                'url': '/getUserList',
                'type': 'POST',
                'dataType': 'json'
        }
    });
});

