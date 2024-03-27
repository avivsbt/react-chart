export interface IChart {
  date: string;
  value: number;
  volume: number;
}

export interface IChartData {
  data: IChart[];
  symbol: string;
}