import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts";
import {
  aggregateData,
  entityTypeCollection,
  transformToFormattedData,
} from "../../../utils/data";

type Props = {
  data: any;
  loading?: boolean;
};

export const DataChart = (props: Props) => {
  const { data, loading = false } = props;

  const chartData = useMemo(
    () =>
      transformToFormattedData(aggregateData(data), entityTypeCollection(data)),
    [data]
  );

  return (
    <BarChart
      dataset={chartData}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month",
          label: "Month",
        },
      ]}
      yAxis={[{ label: "Count" }]}
      series={Object.keys(chartData[0] || {})
        .filter((key) => key !== "month")
        .map((key) => ({
          dataKey: key,
          label: key,
          color: "#02B2AF",
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
        },
        tickLabelStyle: {
          fontSize: 12,
        },
      }}
      height={500}
      loading={loading}
    />
  );
};
