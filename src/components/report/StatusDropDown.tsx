import React from "react";
import { useMutation } from "@apollo/client";
import { Menu, Dropdown, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UPDATE_ISSUE_STATUS } from "../../gql/Mutations";
import { STATUS_COLORS } from "../../layout/Colors";
import { REPORT } from "../../gql/Queries";
import { StatusTag } from "../../layout/Report";

type Props = {
  reportId: number | undefined;
  status: string | undefined;
};

const StatusDropDown: React.FC<Props> = ({ reportId, status }) => {
  const [UpdateStatus] = useMutation(UPDATE_ISSUE_STATUS, {
    variables: { reportId, status },
    onCompleted: () => console.log("updated"),
    onError: () => console.log("error"),
    refetchQueries: [{ query: REPORT, variables: { id: reportId } }],
  });
  const menuItems = Object.keys(STATUS_COLORS)
    .filter((statusKey) => statusKey !== status)
    .map((item) => {
      return (
        <Menu.Item
          key={item}
          onClick={() =>
            UpdateStatus({ variables: { reportId, status: item } })
          }
        >
          <StatusTag color={STATUS_COLORS[item]}>{item}</StatusTag>
        </Menu.Item>
      );
    });
  const menu = <Menu>{menuItems}</Menu>;
  return (
    <>
      {status ? (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Tag color={STATUS_COLORS[status]}>{status}</Tag>
            <DownOutlined />
          </a>
        </Dropdown>
      ) : null}
    </>
  );
};

export default StatusDropDown;
