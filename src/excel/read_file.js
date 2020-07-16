const XLSX = require('xlsx');

const readFileExcel = (filePath, sheetIndex = 0) => {
  const workbook = XLSX.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheetIndex]]);
  return xlData;
};

module.exports = { readFileExcel };
