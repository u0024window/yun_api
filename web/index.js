var excelData = []
var columns
var tableArr=[0,1,2,3]
$('#input-excel').change(function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {

    // upload file
    const binarystr = new Uint8Array(e.target.result);
    const wb = XLSX.read(binarystr, { type: 'array', raw: true, cellFormula: false });

    for (var i in tableArr) {
      var data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]])
      excelData.push(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]]));
      $('#createOrder').attr(`data-req${i}`, JSON.stringify(data))

      var rateQueryParam = data.map(it => {
        return {
          CountryCode: 'US',
          Weight: it['WEIGHT'],
          Length: 1,
          Width: 1,
          Height: 1,
          PackageType: 0,
          PostCode: it['ZIP'],
          Origin: 'CE'
        }
      })
      $('#rateQuery').attr(`data-req${i}`, JSON.stringify(rateQueryParam))

      var columns = Object.keys(data[0] || {}).map(it => {
        if (it) {
          return {
            data: it,
            title: it
          }
        }
      })

      columns.length > 0 && $(`#excelTable${i}`).DataTable({
        paging: false,
        searching: false,
        scrollX: true,
        scrollY: true,
        data: data,
        columns: columns
      });



    }


  }
})


$(document).ready(function () {
  $('#createOrderUrl').val('https://gapi.yunexpressusa.com/api/WayBill/CreateOrder')
  $('#printLabelUrl').val('https://gapi.yunexpressusa.com/api/Label/Print')
  $('#rateQueryUrl').val('https://gapi.yunexpressusa.com/api/Freight/GetPriceTrial')
  $('#trackingUrl').val('https://gapi.yunexpressusa.com/api/Tracking/GetTrackInfo')
  $('#apitoken').val('Basic MDAwMDEmSGZRNW5CRE8wYnc9')
});


$('#logClear').click(() => {
  $('#labelResult').html('')
})