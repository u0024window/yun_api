async function handleFilesUpload(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const excelData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
  console.log(excelData)
}
$(document).ready(function () {
  $('#excelTable').DataTable({
    paging: false,
    searching: false,
    data: [
      {
          "name":       "Tiger Nixon",
          "position":   "System Architect",
          "salary":     "$3,120",
          "start_date": "2011/04/25",
          "office":     "Edinburgh",
          "extn":       "5421"
      },
      {
          "name":       "Garrett Winters",
          "position":   "Director",
          "salary":     "$5,300",
          "start_date": "2011/07/25",
          "office":     "Edinburgh",
          "extn":       "8422"
      }
  ],
    columns: [
      { data: 'name' },
      { data: 'salary' },
      { data: 'office' },
      { data: 'position' },
      { data: 'start_date' },
      { data: 'extn' }
    ]
  });
});