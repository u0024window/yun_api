$('#input-excel').change(function (e) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {

    // upload file
    const binarystr = new Uint8Array(e.target.result);
    const wb = XLSX.read(binarystr, { type: 'array', raw: true, cellFormula: false });
    console.log(wb.Sheets)

    const wsname = wb.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    console.log(data)
  }
})
$('#excelTable').DataTable({
    paging: false,
    searching: false,
    data: [
      {
        "name": "Tiger Nixon",
        "position": "System Architect",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
      },
      {
        "name": "Garrett Winters",
        "position": "Director",
        "salary": "$5,300",
        "start_date": "2011/07/25",
        "office": "Edinburgh",
        "extn": "8422"
      }
    ],
    columns: [
      { title: 'name', data: 'name' },
      { title: 'salary', data: 'salary' },
      { title: 'office', data: 'office' },
      { title: 'position', data: 'position' },
      { title: 'start_date', data: 'start_date' },
      { title: 'extn', data: 'extn' }
    ]
  });
