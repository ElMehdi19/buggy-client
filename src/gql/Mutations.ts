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
    $attachments: [Upload!]
  ) {
    addReport(
      bug: $bug
      details: $details
      severity: $severity
      projectId: $project
      reproduceSteps: $steps
      attachments: $attachments
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

export const UPDATE_ISSUE_STATUS = gql`
  mutation UpdateStatus($reportId: Int!, $status: String!) {
    updateIssueStatus(reportId: $reportId, status: $status)
  }
`;

export const RESET_NOTIFICATIONS_COUNT = gql`
  mutation {
    resetNotificationCount
  }
`;

export const ASSIGN_BUG = gql`
  mutation AssingIssue($id: Int!, $userId: Int!) {
    assingIssue(id: $id, userId: $userId)
  }
`;

export const UPLOAD_FILE = gql`
  mutation addFile($file: [Upload!]) {
    addFile(attachments: $file)
  }
`;
