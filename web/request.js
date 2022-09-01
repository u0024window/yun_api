$('#createOrder').click(()=>{
    localStorage.setItem('url',$('#createOrderUrl').val())
    localStorage.setItem('authorization',$('#apitoken').val())
    axios.post('/createOrder', {
        data: JSON.parse($('#createOrder').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#createOrderUrl').val()
    })
        .then(function (response) {
            var createOrderAttr=response.data[0]['Item'].map(it=>{
                return it['WayBillNumber']
            })
            $('#createOrder').attr('data-res',JSON.stringify(createOrderAttr))
            $('#labelResult').append('<p>WayBillNumber:'+JSON.stringify(createOrderAttr)+"</p>")

        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#printLabel').click(() => {
   var dataWayBillNumbers=JSON.parse($('#createOrder').attr('data-res'))

    axios.post('/printLabel', {
        data: dataWayBillNumbers,
        authorization: $('#apitoken').val(),
        url: $('#printLabelUrl').val()
    })
        .then(function (response) {
            console.log(response.data);
            response.data.forEach(it => {
                $('#labelResult').append('<embed src='+it.Url+'>')
            });
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#estimate').click(() => {
    axios.post('/estimate', {
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
