import html2pdf from 'html2pdf.js';

function PDFExportButton({ result }) {
const exportPDF = () => {
const content = document.createElement('div');
content.innerHTML = `
  <div>
	<h1>Resume Analyzer Result</h1>
	<h2>Match Score: ${result.matchScore}%</h2>
	<h3>Matched Keywords</h3>
	<ul>${result.keywords.matched.map(k => `<li>${k}</li>`).join('')}</ul>
	<h3>Missing Keywords</h3>
	<ul>${result.keywords.missing.map(k => `<li>${k}</li>`).join('')}</ul>
  </div>
`;

html2pdf().from(content).set({ filename: 'ATS_Result.pdf' }).save();
};

return (
<button onClick={exportPDF} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
Download PDF
</button>
);
}

export default PDFExportButton;