import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { GET_USERS, REPORT } from "../../gql/Queries";
import { ASSIGN_BUG } from "../../gql/Mutations";
import { RootState } from "../../store/reducers/rootReducer";
import { modalState } from "../../store/reducers/modalReducer";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

const ReportAssignModal: React.FC<{ id: number | undefined }> = ({ id }) => {
  const modalState = useSelector<RootState, modalState>((store) => store.modal);
  const dispatch = useDispatch();
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const [assignBug] = useMutation(ASSIGN_BUG, {
    onCompleted: () => dispatch({ type: "HIDE_MODAL" }),
    onError: () => console.log("error"),
    refetchQueries: [{ query: REPORT, variables: { id } }],
  });
  const [userId, setUserId] = useState<number>();
  const [commitLoading, setCommitLoading] = useState<boolean>(false);
  const handleChange = (e: RadioChangeEvent) => {
    setUserId(e.target.value);
  };
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setCommitLoading(true);
    setCommitLoading(false);
    await assignBug({ variables: { id: 9, userId } });
  };
  return (
    <Modal
      title="Assign this issue to a project member"
      visible={modalState.showModal}
      onOk={handleSubmit}
      onCancel={() => dispatch({ type: "HIDE_MODAL" })}
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

export default ReportAssignModal;
