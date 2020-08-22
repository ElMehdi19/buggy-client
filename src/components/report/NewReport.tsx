import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import ReportForm from "./NewReportForm";
import Wrapper from "../../layout/Wrapper";
import { PROJECTS } from "../../gql/Queries";
import { ADD_REPORT } from "../../gql/Mutations";

export type ProjectType = {
  id: number;
  name: string;
};

const NewReport: React.FC = () => {
  const { loading, data } = useQuery<{ projects: ProjectType[] }>(PROJECTS);
  const [addReport] = useMutation(ADD_REPORT, {
    onCompleted: () => console.log("added to db"),
    onError: ({ message }) => console.log(message),
  });

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const step_keys = Object.keys(formValues).filter((key) =>
      key.startsWith("step")
    );
    const steps = step_keys.map((key) => formValues[key]);
    const { project, severity, bug, details } = formValues;
    const report = {
      project: parseInt(project),
      severity,
      bug,
      details,
      steps,
    };
    await addReport({ variables: { ...report } });
  };
  return (
    <Wrapper>
      <h2>New Report</h2>
      {loading ? (
        "Loading..."
      ) : data ? (
        <ReportForm projects={data.projects} handleSubmit={handleSubmit} />
      ) : null}
    </Wrapper>
  );
};

export default NewReport;
