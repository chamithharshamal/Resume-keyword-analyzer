import { useState } from 'react';
import UploadSection from '../components/UploadSection';
import ScoreCard from '../components/ScoreCard';
import KeywordHighlights from '../components/KeywordHighlights';
import PDFExportButton from '../components/PDFExportButton';

function Home() {
const [result, setResult] = useState(null);

return (
<div className="min-h-screen bg-slate-50 p-8">
<h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Resume Keyword Analyzer</h1>
<UploadSection onResult={setResult} />
{result && (
<div className="mt-10 space-y-6">
<ScoreCard score={result.matchScore} />
<KeywordHighlights keywords={result.keywords} />
<PDFExportButton result={result} />
</div>
)}
</div>
);
}

export default Home;