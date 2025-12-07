import PredictionResult from '../PredictionResult';

export default function PredictionResultExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-4xl">
      <PredictionResult 
        prediction="up" 
        confidence={67.5}
        timestamp="12:45 PM"
      />
      <PredictionResult 
        prediction="down" 
        confidence={58.2}
        timestamp="10:30 AM"
      />
      <PredictionResult 
        prediction={null} 
        confidence={0}
      />
    </div>
  );
}
