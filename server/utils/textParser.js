// server/utils/textParser.js
const fs = require('fs');
const pdfParse = require('pdf-parse');

exports.extractTextFromPDF = async (pdfPath) => {
const dataBuffer = fs.readFileSync(pdfPath);
const data = await pdfParse(dataBuffer);
return data.text;
};