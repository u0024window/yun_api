

$('#createOrder').click(()=>{
    axios.post('/createOrder', {
        data: JSON.parse($('#createOrder').attr('data-req'))
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#printLabel').click(() => {
    axios.post('/printLabel', {
        data: JSON.parse($('#printLabel').attr('data-req'))
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})

$('#estimate').click(() => {
    axios.post('/estimate', {
        data: JSON.parse($('#estimate').attr('data-req'))
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})
