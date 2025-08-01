import React from 'react';

const KeywordHighlights = ({ keywords }) => {
  if (!keywords) return null;

  const { matched = [], missing = [] } = keywords;

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-green-50 border border-green-200 rounded-md p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-green-700 mb-2">✅ Matched Keywords</h4>
        <ul className="list-disc list-inside text-green-800">
          {matched.map((word, idx) => <li key={idx}>{word}</li>)}
        </ul>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-md p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-red-700 mb-2">❌ Missing Keywords</h4>
        <ul className="list-disc list-inside text-red-800">
          {missing.map((word, idx) => <li key={idx}>{word}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default KeywordHighlights;