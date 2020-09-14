import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import ReportsTable, { ReportType } from "./ReportsTable";
import { REPORTS } from "../../gql/Queries";
import { getReportRow } from "../../utils";
import { SingleReportType } from "./Report";

const ReportsMain: React.FC = () => {
  const { loading, data } = useQuery<{ reports: SingleReportType[] }>(REPORTS);

  const [reports, setReports] = useState<ReportType[]>([]);
  useEffect(() => {
    if (data) {
      const { reports } = data;
      let reportList = reports.map((report) => getReportRow(report));
      reportList = reportList.sort(
        (a, b) => parseInt(b.timestamp!) - parseInt(a.timestamp!)
      );
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
