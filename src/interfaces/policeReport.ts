export interface TheftByDay {
  date: string;
  count: number;
}
export interface PoliceReport {
  id:number;
  lor_code: string;
  num_thefts: number;
  theft_percentage: number;
  population: number;
  total_value: number;
  thefts_per_population?: number;
  thefts_by_day?: TheftByDay[];
  color_level: number;
}
export interface PoliceReportList {
  [key: string]: PoliceReport;
}
export interface InfoWindowContent extends PoliceReport {
  title: string;
}
