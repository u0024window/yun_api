var excelData
var columns
$('#input-excel').change(function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {

    // upload file
    const binarystr = new Uint8Array(e.target.result);
    const wb = XLSX.read(binarystr, { type: 'array', raw: true, cellFormula: false });

    const wsname = wb.SheetNames[0];
    excelData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    console.log(excelData)
    excelData = excelData.map(it => {
      for (var key in it) {
        if (it[key] && typeof (it[key]) != 'number') {
          it[key]= it[key].replace(/"/g, '')
        }
      }
      return it
    })
    console.log(excelData)

    //get Weight Receiver.Zip
    var rateQueryParam = excelData.map(it=>{
      return {
        CountryCode:'US',
        Weight: it['Weight'],
        Length:1,
        Width:1,
        Height:1,
        PackageType:0,
        PostCode: it['Receiver.Zip'],
        Origin:'CE'
      }
    })
    console.log('rateQueryParam', rateQueryParam)
    $('#rateQuery').attr('data-req', JSON.stringify(rateQueryParam))
    columns = Object.keys(excelData[0]).map(it => {
      if (it) {
        return {
          data: it.replace(/\./g, '\\.'),
          title: it
        }
      }
    })

    console.log(columns)


    $('#excelTable').DataTable({
      paging: false,
      searching: false,
      scrollX: true,
      scrollY: true,
      data: excelData,
      columns: columns
    });




    const transformObj = obj => {
      return Object.keys(obj).reduce((acc, key) => {
        if (key.indexOf('.') >= 0) {
          const [parentKey, childKey] = key.split('.');
          acc[parentKey] = acc[parentKey] || {};
          acc[parentKey][childKey] = obj[key];
        } else {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    }

    var reExData = excelData.map(it => {
      var obj = transformObj(it)
      obj.Parcels = [obj.Parcels]
      return obj
    })
    $('#createOrder').attr('data-req', JSON.stringify(reExData))


    console.log('transformObj', reExData);


    













  }






})




$(document).ready(function(){
  $('#createOrderUrl').val('https://gapi.yunexpressusa.com/api/WayBill/CreateOrder')
  $('#printLabelUrl').val('https://gapi.yunexpressusa.com/api/Label/Print')
  $('#rateQueryUrl').val('https://gapi.yunexpressusa.com/api/Freight/GetPriceTrial')
  $('#apitoken').val('Basic MDAwMDEmSGZRNW5CRE8wYnc9')
});




$('#logClear').click(()=>{
  $('#labelResult').html('')
})