const fs = require('fs');
const pdfParse = require('pdf-parse');

// Read the PDF file
const pdfFile = fs.readFileSync('./cv.pdf');

// Parse the PDF content
pdfParse(pdfFile).then(data => {
  console.log('CV Content:');
  console.log(data.text);
}).catch(error => {
  console.error('Error reading PDF:', error);
}); 