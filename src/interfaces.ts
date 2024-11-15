export interface FormattedData {
  month: string;
  [entityType: string]: string | number;
}

export interface MonthEntityCount {
  [month: string]: {
    [entityType: string]: number;
  };
}
