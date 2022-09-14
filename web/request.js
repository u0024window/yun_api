var resCreateOrder=true
$('#createOrder').click(() => {
    for (var i in tableArr) {
        ((i) => {
            var data = JSON.parse($('#createOrder').attr(`data-req${i}`))
            data && axios.post('/createOrder', {
                data,
                authorization: $('#apitoken').val(),
                url: $('#createOrderUrl').val()
            })
                .then(function (response) {
                    var res = response.data.result
                    var createOrderAttr = res[0]['Item'].map(it => {
                        if (it['WayBillNumber']) {
                            return it['WayBillNumber']
                        } else {
                            resCreateOrder=false
                            return 'Remark:' + it['Remark']
                        }

                    })
                    var resFilter = createOrderAttr.filter(it => !it.includes('Remark'))
                    $('#createOrder').attr(`data-res${i}`, JSON.stringify(resFilter))
                    $('#tracking').attr(`data-req${i}`, JSON.stringify(resFilter))
                    $('#labelResult').append('<p>WayBillNumber:' + JSON.stringify(createOrderAttr) + "</p>")

                    if (resCreateOrder) {
                        $('#createOrder').css('color', 'green')
                    } else {
                        $('#createOrder').css('color', 'red')
                        //$('#log').append(`<p>table${i}` + response.data.data + '</p>')

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })(i)

    }

})

$('#printLabel').click(() => {
    for (var i in tableArr) {
        ((i) => {
            var datares=$('#createOrder').attr(`data-res${i}`)
            var data =datares && JSON.parse(datares)
            console.log('#printLabel', data)
            data && axios.post('/printLabel', {
                data,
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
                        $('#log').append('<p>' + response.data.data + '</p>')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })(i)

    }

})

$('#rateQuery').click(() => {
    for (var i in tableArr) {
        ((i) => {
            var data = JSON.parse($('#rateQuery').attr(`data-req${i}`))
            data && axios.post('/rateQuery', {
                query: data,
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
                        $('#log').append('<p>' + response.data.data + '</p>')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })(i)
    }

})


$('#tracking').click(() => {
    for (var i in tableArr) {
        ((i) => {
            var data = JSON.parse($('#tracking').attr(`data-req${i}`))
            data && axios.post('/tracking', {
                query: data,
                authorization: $('#apitoken').val(),
                url: $('#trackingUrl').val()
            })
                .then(function (response) {
                    var res = response.data.result
                    $('#labelResult').append('<p>' + res + '</p>')

                    if (response.data.code == '0') {
                        $('#tracking').css('color', 'green')
                    } else {
                        $('#tracking').css('color', 'red')
                        $('#log').append('<p>' + response.data.data + '</p>')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })(i)

    }

})


$('#carrier').click(() => {
    $('#tip').text('loading……')
    $('#createOrder').click()
    $('#rateQuery').click()
    setTimeout(() => {
        $('#printLabel').click()
        $('#tracking').click()
        $('#tip').text('')
    }, 10 * 1000)
})