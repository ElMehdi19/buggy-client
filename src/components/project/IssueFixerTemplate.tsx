import React from "react";
import { Avatar } from "antd";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/Queries";

type IssueFixer = {
  userId: number;
  count: number;
};

type User = {
  firstName: string;
  lastName: string;
  image: string;
};

const avatar =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const IssueFixerTemplate: React.FC<IssueFixer> = ({ userId, count }) => {
  const { data, loading } = useQuery<{ user: User }>(GET_USER, {
    variables: { id: userId },
  });

  if (!loading && data) {
    return (
      <li>
        <Avatar src={avatar} size="default" />
        <span style={{ flex: 1 }}>
          {data.user.firstName} {data.user.lastName}
        </span>
        <span
          style={{
            fontSize: "1.2rem",
            color: "#1890ff",
            marginLeft: "auto",
            flex: 1,
          }}
        >
          {count}
        </span>
      </li>
    );
  }

  return null;
};

export default IssueFixerTemplate;
