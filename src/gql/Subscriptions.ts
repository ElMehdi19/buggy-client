import { gql } from "@apollo/client";

export const NEW_COMMENT = gql`
  subscription NewComment($reportId: Int!) {
    newComment(reportId: $reportId) {
      id
      content
      author {
        firstName
        lastName
      }
    }
  }
`;

export const NEW_NOTIFICATION = gql`
  subscription {
    newNotification {
      report
      notifier
      notification
    }
  }
`;
