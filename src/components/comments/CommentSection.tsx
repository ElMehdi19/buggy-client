import React from "react";
import { CommentSectionWrapper } from "../../layout/Comment";
import CommentList from "./CommentList";

const CommentSection: React.FC<{ reportId: number }> = ({ reportId }) => {
  return (
    <CommentSectionWrapper>
      <h2>Comments</h2>
      <CommentList reportId={reportId} />
    </CommentSectionWrapper>
  );
};

export default CommentSection;
