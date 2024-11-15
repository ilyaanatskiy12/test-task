import React from "react";
import { BarChart } from "@mui/x-charts";
import { pivotChartData } from "../../../utils/data";

type Props = {
  data: any;
  grouping?: string;
  loading?: boolean;
};

export const PivotTableChart = (props: Props) => {
  const { data, grouping, loading = false } = props;

  return (
    <BarChart
      dataset={pivotChartData[grouping as string](data)}
      xAxis={[
        {
          scaleType: "band",
          dataKey: grouping?.toLowerCase(),
          label: "",
          valueFormatter(value) {
            return value?.split(" ").slice(0, 2).join(" ");
          },
        },
      ]}
      yAxis={[{ label: "Count" }]}
      series={Object.keys(pivotChartData[grouping as string](data)[0] || {})
        .filter((key) => key !== grouping?.toLowerCase())
        .map((key) => ({
          dataKey: key,
          label: "Companies count",
        }))}
      slotProps={{
        legend: {
          hidden: true,
          labelStyle: {
            fontSize: 12,
            display: "none",
          },
        },
      }}
      leftAxis={{
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tickLabelStyle: {
          fontSize: 12,
        },
      }}
      bottomAxis={{
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
      height={500}
      loading={loading}
    />
  );
};
