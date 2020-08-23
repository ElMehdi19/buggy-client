import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import ReportsTable, { ReportType } from "./ReportsTable";
import { REPORTS } from "../../gql/Queries";
import { getReportRow } from "../../utlis";
import { SingleReportType } from "./Report";

const ReportsMain: React.FC = () => {
  const { loading, data } = useQuery<{ reports: SingleReportType[] }>(REPORTS);

  const [reports, setReports] = useState<ReportType[]>([]);
  useEffect(() => {
    if (data) {
      const { reports } = data;
      const reportList = reports.map((report) => getReportRow(report));
      setReports(reportList);
    }
  }, [data]);

  return (
    <div>
      <ReportsTable reports={reports} loading={loading} />
    </div>
  );
};

export default ReportsMain;
