import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import ReportForm from "./NewReportForm";
import Wrapper from "../../layout/Wrapper";
import { PROJECTS, REPORTS } from "../../gql/Queries";
import { ADD_REPORT } from "../../gql/Mutations";

export type ProjectType = {
  id: number;
  name: string;
};

const NewReport: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const { loading, data } = useQuery<{ projects: ProjectType[] }>(PROJECTS);
  const [addReport] = useMutation(ADD_REPORT, {
    onCompleted: () => history.push("/"),
    onError: ({ message }) => console.log(message),
    refetchQueries: [{ query: REPORTS }],
  });

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const step_keys = Object.keys(formValues).filter((key) =>
      key.startsWith("step")
    );
    const steps = JSON.stringify(step_keys.map((key) => formValues[key]));
    const { project, severity, bug, details, attachments } = formValues;
    const report = {
      project: parseInt(project),
      severity,
      bug,
      details,
      steps,
      attachments,
    };
    await addReport({ variables: { ...report } });
  };
  return (
    <Wrapper>
      <h2 style={{ color: "#10185e" }}>New Report</h2>
      {loading ? (
        "Loading..."
      ) : data ? (
        <ReportForm projects={data.projects} handleSubmit={handleSubmit} />
      ) : null}
    </Wrapper>
  );
};

export default NewReport;
