import ModelStats from '../ModelStats';

export default function ModelStatsExample() {
  return (
    <div className="max-w-xs p-4">
      <ModelStats 
        accuracy={54.6}
        totalSamples={6550}
        lastUpdated="Dec 5, 2025"
      />
    </div>
  );
}
