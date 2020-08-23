import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { COMMENTS } from "../../gql/Queries";
import { List, Comment } from "antd";

type Author = {
  firstName: string;
  lastName: string;
};

type CommentResponse<T> = {
  id: number;
  content: string;
  posted: string;
  author: T;
};

const avatar =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const CommentList: React.FC<{ reportId: number }> = ({ reportId }) => {
  const [comments, setComments] = useState<CommentResponse<string>[]>([]);
  const { loading, data } = useQuery<{ comments: CommentResponse<Author>[] }>(
    COMMENTS,
    { variables: { reportId } }
  );
  useEffect(() => {
    if (!loading && data) {
      const { comments } = data;
      const commentList: CommentResponse<string>[] = comments.map((comment) => {
        const { firstName, lastName } = comment.author;
        const author = `${firstName} ${lastName}`;
        const posted = moment(parseInt(comment.posted)).format("MMM Do, YYYY");
        return { ...comment, author, posted };
      });
      setComments(commentList);
    }
  }, [data]);
  return (
    <List
      bordered={true}
      id="comments"
      loading={loading}
      className="comment-list"
      header={`${comments.length} replies`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.author}
            avatar={avatar}
            content={item.content}
            datetime={item.posted}
          />
        </li>
      )}
    />
  );
};

export default CommentList;
