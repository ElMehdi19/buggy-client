import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Modal, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { GET_USERS } from "../../gql/Queries";
import { ASSIGN_BUG } from "../../gql/Mutations";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

const ReportAssign: React.FC = () => {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const [assignBug] = useMutation(ASSIGN_BUG, {
    onCompleted: () => console.log("success"),
    onError: () => console.log("error"),
  });
  const [userId, setUserId] = useState<number>();
  const [commitLoading, setCommitLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const handleChange = (e: RadioChangeEvent) => {
    setUserId(e.target.value);
  };
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setCommitLoading(true);
    await assignBug({ variables: { id: 9, userId } });
    setCommitLoading(false);
  };
  return (
    <Modal
      title="Assign this issue to a project member"
      visible={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
      confirmLoading={commitLoading}
    >
      {!loading && data ? (
        <Radio.Group onChange={handleChange}>
          {data.users.map((user) => (
            <Radio value={user.id} style={{ display: "block" }} key={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </Radio>
          ))}
        </Radio.Group>
      ) : null}
    </Modal>
  );
};

export default ReportAssign;
