import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Table, Tag } from "antd";
import { PROJECTS } from "../../gql/Queries";
import { SEVERITY_COLORS, STATUS_COLORS } from "../../layout/Colors";

const columns = (projects: { text: string; value: string }[]) => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "BUG",
    dataIndex: "bug",
    key: "bug",
    render: (bug: { id: number; title: string }, record: ReportType) => (
      <a href={`reports/${record.id}`}>{bug}</a>
    ),
  },
  {
    title: "PROJECT",
    dataIndex: "project",
    key: "project",
    filters: projects,
    onFilter: (value: any, record: ReportType) =>
      record.project.includes(value),
  },
  {
    title: "REPORTER",
    dataIndex: "reporter",
    key: "reporter",
  },
  {
    title: "REPORTED",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "LAST UPDATE",
    dataIndex: "updated",
    key: "updated",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
    filters: [
      { text: "OPEN", value: "OPEN" },
      { text: "IN PROGRESS", value: "IN PROGRESS" },
      { text: "TO BE TESTED", value: "TO BE TESTED" },
      { text: "CLOSED", value: "CLOSED" },
    ],
    onFilter: (value: any, record: ReportType) => record.status.includes(value),
    render: (status: string) => (
      <Tag color={STATUS_COLORS[status]} key={status}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "SEVERITY",
    key: "severity",
    dataIndex: "severity",
    filters: [
      { text: "MINOR", value: "MINOR" },
      { text: "MODERATE", value: "MODERATE" },
      { text: "MAJOR", value: "MAJOR" },
      { text: "CRITICAL", value: "CRITICAL" },
    ],
    onFilter: (value: any, record: ReportType) =>
      record.severity.includes(value),
    render: (severity: string) => (
      <Tag color={SEVERITY_COLORS[severity]} key={severity}>
        {severity.toUpperCase()}
      </Tag>
    ),
  },
];
export type ReportType = {
  id: number;
  bug: string;
  reporter: string;
  status: string;
  severity: string;
  created: string;
  project: string;
  updated: string;
  timestamp?: string;
};

type Props = {
  reports: ReportType[] | [];
  loading: boolean;
};

const ReportsTable: React.FC<Props> = ({ reports, loading }) => {
  const [projects, setProjects] = useState<{ text: string; value: string }[]>(
    []
  );
  const { data } = useQuery<{ projects: { id: number; name: string }[] }>(
    PROJECTS
  );
  useEffect(() => {
    if (data) {
      const { projects } = data;
      const projectList = projects.map((project) => ({
        text: project.name,
        value: project.name,
      }));
      setProjects(projectList);
    }
  }, [data]);
  return (
    <Table
      columns={columns(projects)}
      dataSource={reports}
      rowKey={() => Math.random()}
      style={{ background: "#fff" }}
      loading={loading}
    />
  );
};

export default ReportsTable;
