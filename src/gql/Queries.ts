import { gql } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      id
      email
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
      bug
      details
      status
      severity
      created
      updated
      reproduceSteps
      project {
        name
      }
      reporter {
        id
        firstName
        lastName
        email
      }
      comments {
        id
        content
        posted
        author {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
