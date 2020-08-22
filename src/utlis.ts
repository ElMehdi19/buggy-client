import moment from "moment";
import { ReportType } from "./components/report/ReportsTable";

type ReportResponse = {
  id: number;
  bug: string;
  details: string;
  status: string;
  severity: string;
  created: string;
  updated: string;
  reproduceSteps: string[];
  project: {
    name: string;
  };
  reporter: {
    id: number;
    firstName: string;
    lastName: string;
  };
  comments?: {
    id: number;
    content: string;
    posted: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
};

export const getReportRow = (report: ReportResponse): ReportType => {
  const {
    id,
    bug,
    project,
    reporter,
    created,
    updated,
    severity,
    status,
  } = report;
  const dateCreated = moment(parseInt(created)).format("MMM Do, YYYY");
  const dateUpdated = moment(parseInt(updated)).format("MMM Do, YYYY");
  const { firstName, lastName } = reporter;
  const reporterName = `${firstName} ${lastName}`;
  return {
    id,
    bug,
    status,
    severity,
    reporter: reporterName,
    project: project.name,
    created: dateCreated,
    updated: dateUpdated,
  };
};

export const getReportObj = (report: ReportResponse): ReportType => {
  // export const getReportObj = (report: any): ReportType => {
  const { reporter, project, created, updated, severity, status } = report;
  const { firstName, lastName } = reporter;
  const reporterName = `${firstName} ${lastName}`;
  const { name: projectName } = project;
  const dateCreated = moment(parseInt(created)).format("MMM Do, YYYY");
  const dateUpdated = moment(parseInt(updated)).format("MMM Do, YYYY");
  return {
    ...report,
    reporter: reporterName,
    created: dateCreated,
    updated: dateUpdated,
    project: projectName,
    severity,
    status,
  };
};
