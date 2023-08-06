// import { jsPDF } from "./jspdf";
// console.log(document.getElementById('fileInput'));

// const { jsPDF } = require("jspdf");
document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(e) {
  console.log('working...');
  const file = e.target.files[0];
  const reader = new FileReader();

  // console.log('working...');

  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    // Assuming the first sheet is the one you want to convert
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Delete unwanted columns (replace A, B, and C with the column letters you want to remove)
    delete worksheet['Narration'];
    delete worksheet['credit'];
    // delete worksheet['C'];

    // Convert to an array of objects (table-like structure)
    const tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


    // Convert tableData to a PDF
    const doc = new jsPDF({
      orientation: "landscape",

    });
    console.log(doc);
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
    });
    console.log(doc);

    // Save the PDF
    doc.save('./output.pdf');
  };

  reader.readAsBinaryString(file);
}
