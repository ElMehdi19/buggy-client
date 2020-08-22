import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { REPORT } from "../../gql/Queries";
import ReportTemplate from "./ReportTemplate";
import ReportTimeline from "./ReportTimeline";
import { ReportWrapper } from "../../layout/Wrapper";
import { getReportObj } from "../../utlis";

type Reporter = {
  id: number;
  firstName: string;
  lastName: string;
};

type Comment = {
  id: number;
  content: number;
  posted: string;
  author: Reporter;
};

export type SingleReportType = {
  id: number;
  bug: string;
  details: string;
  status: string;
  severity: string;
  created: string;
  updated: string;
  reproduceSteps: string[];
  project: { name: string };
  reporter: Reporter;
  // comments?: Comment[];
};

const Report: React.FC<RouteComponentProps<{ reportId: string }>> = ({
  match,
}) => {
  const { loading, data } = useQuery<{ report: SingleReportType }>(REPORT, {
    variables: { id: parseInt(match.params.reportId) },
  });
  //   const [loading, setLoading] = useState<boolean>(true);
  const [report, setReport] = useState<SingleReportType>();

  useEffect(() => {
    if (data?.report) {
      getReportObj(data.report);
      setReport(data.report);
    }
  }, [data]);

  return (
    <ReportWrapper>
      <ReportTemplate loading={loading} report={report} />
      <ReportTimeline />
    </ReportWrapper>
  );
};

export default Report;
