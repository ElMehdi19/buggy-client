import { gql } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
    }
  }
`;

export const WHOAMI = gql`
  {
    whoami {
      id
      email
      firstName
    }
  }
`;

export const PROJECTS = gql`
  {
    projects {
      id
      name
    }
  }
`;

export const REPORTS = gql`
  {
    reports {
      id
      bug
      details
      created
      updated
      status
      severity
      reporter {
        id
        firstName
        lastName
      }
      project {
        id
        name
      }
    }
  }
`;

export const REPORT = gql`
  query Report($id: Int!) {
    report(id: $id) {
      id
      bug
      details
      status
      severity
      created
      updated
      reproduceSteps
      events
      project {
        name
        manager {
          id
        }
        users {
          id
        }
      }
      reporter {
        id
        firstName
        lastName
        email
      }
      assignee {
        id
        firstName
        lastName
      }
    }
  }
`;

export const COMMENTS = gql`
  query Comments($reportId: Int!) {
    comments(reportId: $reportId) {
      id
      content
      posted
      author {
        firstName
        lastName
      }
    }
  }
`;

export const NOTIFICATION_COUNT = gql`
  query {
    notificationCount
  }
`;

export const NOTIFICATIONS = gql`
  query {
    notifications {
      count
      notifications {
        report
        notifier
        notification
      }
    }
  }
`;
