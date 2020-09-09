import React, { useState } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PROJECT } from "../../gql/Queries";
import {
  ProjectWrapper,
  ProjectHeading,
  ChartsWrapper,
} from "../../layout/Project";
import { ActiveIssuesChart } from "./ProjectCharts";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export type Issue = {
  id: number;
  status: string;
};

type Project = {
  id: string;
  name: string;
  manager: User;
  reports: Issue[];
};

const Project: React.FC<RouteComponentProps<{ projectId: string }>> = ({
  match,
}) => {
  const projectId = match.params.projectId;
  const [project, setProject] = useState<Project>();

  const { loading, data } = useQuery<{ project: Project }>(PROJECT, {
    variables: { id: parseInt(projectId) },
    onCompleted: ({ project }) => setProject(project),
  });
  if (!loading && !data) return <Redirect to="/" />;
  if (!project) return null;
  return (
    <ProjectWrapper>
      <ProjectHeading>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>
            PR-{project.id}:{" "}
            <span style={{ fontFamily: "Arial" }}>{project.name}</span>
          </h2>
          <span style={{ fontFamily: "Arial" }}>
            Manager: {project.manager.firstName} {project.manager.lastName}
          </span>
        </div>
        <div>Some text here</div>
      </ProjectHeading>
      <ChartsWrapper>
        <ActiveIssuesChart reports={project.reports} />
        <div></div>
        <div></div>
      </ChartsWrapper>
      <div>Some stuff here</div>
    </ProjectWrapper>
  );
};

export default Project;
