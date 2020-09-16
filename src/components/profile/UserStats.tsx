import React from "react";
import { Donut } from "@ant-design/charts";
import { UserStatsWrapper } from "../../layout/Profile";
import { donutConfig } from "../../utils";

type Props = {
  reportCount: number;
  fixedCount: number;
};

const UserStats: React.FC<Props> = ({ reportCount, fixedCount }) => {
  const data = [
    { type: "REPORTS", value: reportCount },
    { type: "FIXES", value: fixedCount },
  ];
  const config = donutConfig({
    title: { text: "User stats", size: 14 },
    data,
    radius: 0.7,
  });
  return (
    <UserStatsWrapper>
      <Donut
        {...config}
        statistic={{ totalLabel: "Total", visible: true }}
        forceFit={true}
        style={{ background: "white" }}
      />
    </UserStatsWrapper>
  );
};

export default UserStats;
