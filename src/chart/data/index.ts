import { IChartData } from '../types';

function generateDummyStockData(symbol: string, days: number) {
  const startDate = new Date();
  const stockData = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    const price = Math.random() * (100 - 1) + 1;
    const volume = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;

    stockData.push({
      date: date.toISOString().split('T')[0],
      value: Number(price.toFixed(2)),
      volume: volume
    });
  }

  return {
    symbol: symbol,
    data: stockData.reverse()
  };

}

export const chart: IChartData = generateDummyStockData('AAPL', 30);
console.log(chart);
