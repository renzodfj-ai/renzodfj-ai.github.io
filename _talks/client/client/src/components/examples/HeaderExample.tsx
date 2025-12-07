import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      currentPrice={6870.40} 
      priceChange={0.19} 
      onRefresh={() => console.log('Refresh clicked')}
      isLoading={false}
    />
  );
}
