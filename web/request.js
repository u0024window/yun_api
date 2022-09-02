$('#createOrder').click(() => {
    localStorage.setItem('url', $('#createOrderUrl').val())
    localStorage.setItem('authorization', $('#apitoken').val())
    axios.post('/createOrder', {
        data: JSON.parse($('#createOrder').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#createOrderUrl').val()
    })
        .then(function (response) {
            var res = response.data.result
            var createOrderAttr = res[0]['Item'].map(it => {
                return it['WayBillNumber']
            })
            $('#createOrder').attr('data-res', JSON.stringify(createOrderAttr))
            $('#labelResult').append('<p>WayBillNumber:' + JSON.stringify(createOrderAttr) + "</p>")

            if (response.data.code == '0') {
                $('#createOrder').css('color', 'green')
            } else {
                $('#createOrder').css('color', 'red')
            }
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#printLabel').click(() => {
    var dataWayBillNumbers = JSON.parse($('#createOrder').attr('data-res'))

    axios.post('/printLabel', {
        data: dataWayBillNumbers,
        authorization: $('#apitoken').val(),
        url: $('#printLabelUrl').val()
    })
        .then(function (response) {
            var res = response.data.result
            res.forEach(it => {
                $('#labelResult').append('<embed src=' + it.Url + '>')
            });

            if (response.data.code == '0') {
                $('#printLabel').css('color', 'green')
            } else {
                $('#printLabel').css('color', 'red')
            }
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#rateQuery').click(() => {
    axios.post('/rateQuery', {
        query: JSON.parse($('#rateQuery').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#rateQueryUrl').val()
    })
        .then(function (response) {
            var res = response.data.result
            $('#labelResult').append('<p>' + res + '</p>')

            if (response.data.code == '0') {
                $('#rateQuery').css('color', 'green')
            } else {
                $('#rateQuery').css('color', 'red')
            }
        })
        .catch(function (error) {
            console.log(error);
        });

})



$('#carrier').click(() => {
    $('#tip').text('loading……')
    $('#createOrder').click()
    setTimeout(() => {
        $('#printLabel').click()
    }, 10 * 1000)
    setTimeout(() => {
        $('#rateQuery').click()
        $('#tip').text('')
    }, 20 * 1000)
})