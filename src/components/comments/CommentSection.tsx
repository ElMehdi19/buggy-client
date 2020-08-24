import React from "react";
import { CommentSectionWrapper } from "../../layout/Comment";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const CommentSection: React.FC<{ reportId: number }> = ({ reportId }) => {
  return (
    <CommentSectionWrapper>
      <h2>Comments</h2>
      <CommentList reportId={reportId} />
      <CommentForm reportId={reportId} />
    </CommentSectionWrapper>
  );
};

export default CommentSection;
