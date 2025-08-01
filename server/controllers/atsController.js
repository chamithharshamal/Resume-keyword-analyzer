// server/controllers/atsController.js
const { extractTextFromPDF } = require('../utils/textParser');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.analyzeResume = async (req, res) => {
try {
const resumePath = req.file.path;
const jobDescription = req.body.jobDescription;

const resumeText = await extractTextFromPDF(resumePath);

const pythonScriptPath = path.join(__dirname, '../utils/similarityHelper.py');

const args = [resumeText, jobDescription];

const process = execFile('python', [pythonScriptPath, ...args], { maxBuffer: 1024 * 5000 }, (err, stdout, stderr) => {
  fs.unlinkSync(resumePath); 

  if (err) {
    console.error('Error running Python script:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    const result = JSON.parse(stdout);
    return res.status(200).json(result);
  } catch (parseErr) {
    console.error('Failed to parse Python output:', parseErr);
    return res.status(500).json({ error: 'Failed to parse model output' });
  }
});
} catch (error) {
console.error(error);
return res.status(500).json({ error: 'Internal server error' });
}
};