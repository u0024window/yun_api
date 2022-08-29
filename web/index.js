import * as XLSX from 'xlsx/xlsx.mjs';

function handleFilesUpload(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const excelData=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
  console.log(excelData)
  }


  function excelTotable(){
      
  }