document
  .getElementById("fileInput")
  .addEventListener("change", handleFile, false);

function handleFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "binary" });

    // Assuming the first sheet is the one you want to convert
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Define the columns you want to remove (replace 'A', 'B', and 'C' with the actual column letters)
     const columnsToRemove = [''];

    // Convert to an array of objects (table-like structure)
    const tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Remove the columns from the tableData
    const filteredTableData = tableData.map((row) =>
      row.filter(
        (_, index) => !columnsToRemove.includes(XLSX.utils.encode_col(index))
      )
    );

    // Convert filteredTableData to a PDF
    const doc = new jsPDF();
    doc.autoTable({
      head: [filteredTableData[0]],
      body: filteredTableData.slice(1),
    });

    // Save the PDF
    doc.save("output.pdf");
  };

  reader.readAsBinaryString(file);
}
