import React from "react";
import { Donut } from "@ant-design/charts";
import { DonutViewConfig } from "@antv/g2plot/lib/plots/donut/layer";
import { Issue } from "./Project";

export const ActiveIssuesChart: React.FC<{ reports: Issue[] }> = ({
  reports,
}) => {
  const data = [
    {
      type: "ACTIVE",
      value: reports.filter((report) => report.status !== "CLOSED").length,
    },
    {
      type: "CLOSED",
      value: reports.filter((report) => report.status === "CLOSED").length,
    },
  ];
  const config: DonutViewConfig = {
    title: {
      alignTo: "left",
      visible: true,
      text: "Issues status",
      style: { fontSize: 20 },
    },
    radius: 0.8,
    padding: "auto",
    data,
    angleField: "value",
    colorField: "type",
    legend: {
      position: "bottom-center",
    },
  };
  return (
    <Donut
      {...config}
      statistic={{ totalLabel: "Total", visible: true }}
      forceFit={true}
      style={{ background: "white" }}
    ></Donut>
  );
};
