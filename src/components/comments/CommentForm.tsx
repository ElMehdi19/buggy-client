import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../gql/Mutations";
import { Input, Button, Form, Avatar } from "antd";
import { COMMENTS, REPORT } from "../../gql/Queries";

const { TextArea } = Input;
const { Item } = Form;
const avatar =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

type Props = {
  reportId: number;
};

const CommentForm: React.FC<Props> = ({ reportId }) => {
  const [comment, setComment] = useState<string>("");
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { reportId, content: "" },
    refetchQueries: [
      { query: COMMENTS, variables: { reportId } },
      { query: REPORT, variables: { id: reportId } },
    ],
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  const handleSubmit = (values: { [key: string]: string }) => {
    const { comment } = values as { comment: string };
    addComment({ variables: { reportId, content: comment } });
    setComment("");
  };

  return (
    <Form onFinish={handleSubmit}>
      <Item label={<Avatar size="small" src={avatar} />} name="comment">
        <TextArea
          rows={4}
          placeholder="Add new comment"
          value={comment}
          onChange={handleChange}
          required
        />
      </Item>
      <Item style={{ float: "right" }}>
        <Button type="primary" htmlType="submit">
          Comment
        </Button>
      </Item>
    </Form>
  );
};

export default CommentForm;
