import { useState } from "react";
import api from "../utils/api";

function UploadSection({ onResult }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!resumeFile || !jobDescription.trim()) {
      return alert("Both fields are required");
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);
      const res = await api.post("/analyze", formData);
      onResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
      onSubmit={handleUpload}
    >
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Job Description</label>
        <textarea
          rows="6"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Paste job description here..."
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}

export default UploadSection;
