import PredictionHistory from '../PredictionHistory';

// todo: remove mock functionality
const mockPredictions = [
  { id: '1', date: 'Dec 5', prediction: 'up' as const, confidence: 67.5, actual: 'up' as const },
  { id: '2', date: 'Dec 4', prediction: 'down' as const, confidence: 58.2, actual: 'up' as const },
  { id: '3', date: 'Dec 3', prediction: 'up' as const, confidence: 72.1, actual: 'up' as const },
  { id: '4', date: 'Dec 2', prediction: 'up' as const, confidence: 55.8, actual: 'down' as const },
  { id: '5', date: 'Dec 1', prediction: 'down' as const, confidence: 61.3, actual: null },
];

export default function PredictionHistoryExample() {
  return (
    <div className="p-4 max-w-3xl">
      <PredictionHistory predictions={mockPredictions} />
    </div>
  );
}
