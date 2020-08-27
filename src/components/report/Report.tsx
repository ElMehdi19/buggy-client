import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { REPORT } from "../../gql/Queries";
import ReportTemplate from "./ReportTemplate";
import ReportTimeline from "./ReportTimeline";
import CommentSection from "../comments/CommentSection";
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
  events: string;
};

const Report: React.FC<RouteComponentProps<{ reportId: string }>> = ({
  match,
}) => {
  const { loading, data } = useQuery<{ report: SingleReportType }>(REPORT, {
    variables: { id: parseInt(match.params.reportId) },
  });
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
      <ReportTimeline issueEvents={report?.events} />
      <CommentSection reportId={parseInt(match.params.reportId)} />
    </ReportWrapper>
  );
};

export default Report;
