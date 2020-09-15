import { DocumentNode } from "@apollo/client";
import dayjs from "dayjs";
import { client } from "./App";
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
  const dateCreated = dayjs(parseInt(created)).format("DD/MM/YYYY");
  const dateUpdated = dayjs(parseInt(updated)).format("DD/MM/YYYY");
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
    timestamp: updated,
  };
};

export const getReportObj = (report: ReportResponse): ReportType => {
  const { reporter, project, created, updated, severity, status } = report;
  const { firstName, lastName } = reporter;
  const reporterName = `${firstName} ${lastName}`;
  const { name: projectName } = project;
  const dateCreated = dayjs(parseInt(created)).format("DD/MM/YYYY");
  const dateUpdated = dayjs(parseInt(updated)).format("DD/MM/YYYY");
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

export const timelineItemColor = (description: string): string => {
  if (description.includes("OPEN")) return "blue";
  if (description.includes("PROGRESS")) return "orange";
  if (description.includes("TESTED")) return "green";
  if (description.includes("CLOSED")) return "geekblue";
  if (description.includes("comment")) return "cyan";
  if (description.includes("assigned")) return "red";
  return "magenta";
};

export const updateCache = <Record>(query: DocumentNode, data: Record) => {
  const cache = client.readQuery<Record>({ query });
  if (cache) {
    client.writeQuery<Record>({ query, data: { ...cache, ...data } });
  }
};

export const isManager = (manager: number | undefined): boolean => {
  if (!manager) return false;
  const currentUser = localStorage.getItem("userId");
  if (!currentUser) return false;
  if (manager !== parseInt(currentUser)) return false;
  return true;
};

export const any = (array: any[]): boolean => {
  for (const item of array) {
    if (item) return true;
  }
  return false;
};

export const all = (array: any[]): boolean => {
  for (const item of array) {
    if (!item) return false;
  }
  return true;
};

export const comparePassword = (pwd_1: string, pwd_2: string): boolean =>
  pwd_1 === pwd_2;
