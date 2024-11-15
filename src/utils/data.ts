import { FormattedData, MonthEntityCount } from "../interfaces";

export const aggregateData = (data: any[]): MonthEntityCount => {
  const monthEntityCount: MonthEntityCount = {};

  data.forEach(({ created_dt, entity_type }) => {
    const date = new Date(created_dt);
    const month = date.toLocaleString("en-US", { month: "long" });

    if (!monthEntityCount[month]) {
      monthEntityCount[month] = {};
    }

    monthEntityCount[month][entity_type] =
      (monthEntityCount[month][entity_type] || 0) + 1;
  });

  return monthEntityCount;
};

export const transformToFormattedData = (
  monthEntityCount: MonthEntityCount,
  allEntityTypes: any[]
): FormattedData[] => {
  return Object.keys(monthEntityCount).map((month) => {
    const counts = monthEntityCount[month];

    const entry: FormattedData = { month };

    allEntityTypes.forEach((type) => {
      if (type) entry[type] = counts[type] || 0;
    });

    return entry;
  });
};

export const entityTypeCollection = (data: any[]) => {
  const entityTypes = new Set();

  data.forEach(({ entity_type }: { entity_type: any }) => {
    entityTypes.add(entity_type);
  });

  return Array.from(entityTypes);
};

const dataCountByMonth = (parsedData: any[]) => {
  const monthWiseDataCount = parsedData.reduce((acc, curr) => {
    const month = curr.date_month;
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(monthWiseDataCount).map((dataKey) => ({
    date_month: dataKey,
    count: monthWiseDataCount[dataKey],
  }));
};

const dataCountByYear = (parsedData: any[]) => {
  const yearWiseDataCount = parsedData.reduce((acc, curr) => {
    const year = curr.date_year;
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(yearWiseDataCount).map((dataKey) => ({
    date_year: dataKey,
    count: yearWiseDataCount[dataKey],
  }));
};

const dataCountByWeek = (parsedData: any[]) => {
  const weekWiseDataCount = parsedData.reduce((acc, curr) => {
    const week = curr.date_week;
    acc[week] = (acc[week] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(weekWiseDataCount).map((dataKey) => ({
    date_week: dataKey,
    count: weekWiseDataCount[dataKey],
  }));
};

export const pivotChartData: Record<string, any> = {
  date_week: dataCountByWeek,
  date_month: dataCountByMonth,
  date_year: dataCountByYear,
};
