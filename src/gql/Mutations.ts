import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const ADD_REPORT = gql`
  mutation AddReport(
    $bug: String!
    $details: String!
    $severity: String!
    $project: Int!
    $steps: String!
  ) {
    addReport(
      bug: $bug
      details: $details
      severity: $severity
      projectId: $project
      reproduceSteps: $steps
    ) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($reportId: Int!, $content: String!) {
    addComment(reportId: $reportId, content: $content) {
      id
    }
  }
`;
