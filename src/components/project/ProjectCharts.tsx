import React from "react";
import { Donut } from "@ant-design/charts";
import { donutConfig } from "../../utils";
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
  const config = donutConfig({
    title: { text: "Issues status", size: 20 },
    radius: 0.8,
    data,
  });
  return (
    <Donut
      {...config}
      statistic={{ totalLabel: "Total", visible: true }}
      forceFit={true}
      style={{ background: "white" }}
    ></Donut>
  );
};
