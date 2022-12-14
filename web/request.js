var carrierStatus=[]
var resCreateOrderStatus=true
$('#createOrder').click(() => {
    for (var i in tableArr) {
        ((i) => {
            var datareq = $('#createOrder').attr(`data-req${i}`)
            var data = datareq && JSON.parse(datareq)
            data && axios.post('/createOrder', {
                data,
                authorization: $('#apitoken').val(),
                url: $('#createOrderUrl').val()
            })
                .then(function (response) {
                    var res = response.data.result
                    var createOrderAttr=[]
                    res.forEach(it=>{
                        var arr=it['Item'].map(it => {
                            if (it['WayBillNumber']) {
                                return it['WayBillNumber']
                            } else {
                                resCreateOrderStatus=false
                                return 'Remark:' + it['Remark']
                            }

                        })
                        createOrderAttr=createOrderAttr.concat(arr)
                    })
                    console.log(createOrderAttr)
                    var resFilter = createOrderAttr.filter(it => !it.includes('Remark'))
                    $('#createOrder').attr(`data-res${i}`, JSON.stringify(resFilter))
                    $('#tracking').attr(`data-req${i}`, JSON.stringify(resFilter))
                    $('#labelResult').append('<p>WayBillNumber:' + JSON.stringify(createOrderAttr) + "</p>")

                    if (resCreateOrderStatus) {
                        carrierStatus.push(1)
                        $('#createOrder').css('color', 'green')
                    } else {
                        carrierStatus.push(0)
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
                        carrierStatus.push(1)
                        $('#printLabel').css('color', 'green')
                    } else {
                        carrierStatus.push(0)
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
            var datareq = $('#rateQuery').attr(`data-req${i}`)
            var data = datareq && JSON.parse(datareq)
            data && axios.post('/rateQuery', {
                query: data,
                authorization: $('#apitoken').val(),
                url: $('#rateQueryUrl').val()
            })
                .then(function (response) {
                    var res = response.data.result
                    $('#labelResult').append('<p>' + res + '</p>')

                    if (response.data.code == '0') {
                        carrierStatus.push(1)
                        $('#rateQuery').css('color', 'green')
                    } else {
                        carrierStatus.push(0)
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
            var datareq = $('#tracking').attr(`data-req${i}`)
            var data = datareq && JSON.parse(datareq)
            data && axios.post('/tracking', {
                query: data,
                authorization: $('#apitoken').val(),
                url: $('#trackingUrl').val()
            })
                .then(function (response) {
                    var res = response.data.result
                    $('#labelResult').append('<p>' + res + '</p>')

                    if (response.data.code == '0') {
                        carrierStatus.push(1)
                        $('#tracking').css('color', 'green')
                    } else {
                        carrierStatus.push(0)
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
    $('#tip').text('loading??????')
    $('#createOrder').click()
    $('#rateQuery').click()
    setTimeout(() => {
        $('#printLabel').click()
        $('#tracking').click()
        $('#tip').text(' ')


        if (carrierStatus.every(it=>it===1)) {
            $('#carrier').css('color', 'green')
        } else {
            $('#carrier').css('color', 'red')
            $('#log').append('<p>' + response.data.data + '</p>')
        }

    }, 10 * 1000)
})