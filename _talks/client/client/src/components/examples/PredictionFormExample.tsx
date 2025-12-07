import PredictionForm from '../PredictionForm';

export default function PredictionFormExample() {
  return (
    <div className="max-w-sm p-4">
      <PredictionForm 
        onPredict={(data) => console.log('Prediction requested:', data)}
        isLoading={false}
        onLoadSample={() => console.log('Sample data loaded')}
      />
    </div>
  );
}
