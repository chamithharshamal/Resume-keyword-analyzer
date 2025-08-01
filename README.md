🧠 Resume Keyword Analyzer (ATS Optimizer)
This project helps job seekers improve their resumes by comparing them with job descriptions using NLP. It calculates a match score and highlights matched/missing keywords to optimize for Applicant Tracking Systems (ATS).

✨ Features

- Upload resume (PDF or plain text)
- Paste or upload job description
- Match score based on semantic similarity
- Highlight matched and missing keywords
- Downloadable report as PDF
- Clean and responsive UI with React + Tailwind


🛠️ Tech Stack

- Frontend:
- React + Vite
- Tailwind CSS
- Axios
- Backend:
- Node.js + Express
- Python (via child_process)
- HuggingFace Sentence Transformer: all-MiniLM-L6-v2
- NLTK for keyword extraction


🤖 Model Used

- sentence-transformers/all-MiniLM-L6-v2
- Measures semantic similarity between resume and job description


📁 Project Structure

```plaintext
├── client/                 # React + Tailwind frontend  
│   ├── src/  
│   │   ├── components/     # UI components (UploadSection, ScoreCard, etc.)  
│   │   ├── pages/          # Home.jsx  
│   │   └── utils/          # API wrapper  
├── server/                 # Node.js backend  
│   ├── controllers/        # Handles /analyze route  
│   ├── routes/             # Express routes  
│   ├── utils/              # PDF parsing & Python integration  
│   └── similarityHelper.py # Python keyword matcher & scorer
```

🚀 How to Run

Install frontend dependencies:
```
cd client
npm install
npm run dev
```
Install backend dependencies:
```
cd ../server
npm install
node server.js
```

Navigate to http://localhost:5173 in your browser.


📝 Sample Usage

- Upload your resume (PDF or text)
- Paste or upload a job description
- Click "Analyze"
- View similarity score and keyword comparison
- Optionally download the PDF report


📌 Notes

- Ensure Python is installed and accessible in your system path

- The backend runs a Python script via Node’s child_process

- Resume and JD files are processed and deleted automatically


📄 License

MIT License
