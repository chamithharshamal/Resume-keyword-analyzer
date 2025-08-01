function ScoreCard({ score }) {
const getColor = () => {
if (score >= 80) return 'bg-green-500';
if (score >= 50) return 'bg-yellow-500';
return 'bg-red-500';
};

return (
<div className="bg-white shadow p-6 rounded-lg text-center">
<h2 className="text-xl font-semibold mb-4">Match Score</h2>
<div className={`text-5xl font-bold text-white p-6 rounded-full inline-block ${getColor()}`}>
{score}%
</div>
</div>
);
}

export default ScoreCard;