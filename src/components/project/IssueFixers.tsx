import React from "react";
import Template from "./IssueFixerTemplate";
import { FixersWrapper } from "../../layout/Project";

type IssueFixer = {
  userId: number;
  count: number;
};

const IssueFixers: React.FC<{ fixers: string }> = ({ fixers }) => {
  const issueFixers: IssueFixer[] = JSON.parse(fixers);
  if (!fixers) return null;
  return (
    <FixersWrapper>
      <h2>Top issue fixers</h2>
      <div>
        {issueFixers.map(({ userId, count }) => (
          <Template userId={userId} count={count} key={userId} />
        ))}
      </div>
    </FixersWrapper>
  );
};

export default IssueFixers;
