var host = '127.0.0.1'
$('#createOrder').click(()=>{
    localStorage.setItem('url',$('#apiurl').val())
    localStorage.setItem('authorization',$('#apitoken').val())
    axios.post('/createOrder', {
        data: JSON.parse($('#createOrder').attr('data-req')),
        authorization: $('#apitoken').val(),
        url: $('#apiurl').val()
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("log").innerHTML = JSON.stringify(response.data, null, 4);
            var createOrderAttr=response.data[0]['Item'].map(it=>{
                return it['WayBillNumber']
            })
            $('#createOrder').attr('data-res',JSON.stringify(createOrderAttr))
            $('#log').text('WayBillNumber:'+JSON.stringify(createOrderAttr))

        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#printLabel').click(() => {
   var dataWayBillNumbers=JSON.parse($('#createOrder').attr('data-res'))


    axios.post(host + '/printLabel', {
        data: dataWayBillNumbers,
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
