
var host = '127.0.0.1'
$('#createOrder').click(()=>{
    axios.post('/createOrder', {
        data: JSON.parse($('#createOrder').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#apiurl').val()
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#printLabel').click(() => {
    axios.post(host + '/printLabel', {
        data: JSON.parse($('#printLabel').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#apiurl').val()
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#estimate').click(() => {
    axios.post(host + '/estimate', {
        data: JSON.parse($('#estimate').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#apiurl').val()
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})
