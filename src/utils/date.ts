import { DateTime } from "luxon";

export const dateFormat = "dd LLL, yyyy hh:MM a";

export const getDateObject = (value: string) =>
  DateTime.fromFormat(value, dateFormat);

export const dateCompare = (date1: string, date2: string) =>
  getDateObject(date1) > getDateObject(date2) ? -1 : 1;
