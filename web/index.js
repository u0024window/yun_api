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
    console.log(wb.Sheets)

    const wsname = wb.SheetNames[0];
    excelData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    console.log(excelData)
    $('#createOrder').attr('data-req', JSON.stringify(excelData))
    columns = Object.keys(excelData[0]).map(it=>{
      return {
        data: it.replace(/\./g, '\\.'),
        title: it
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



  }



  
})

