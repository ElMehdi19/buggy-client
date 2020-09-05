import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import { timelineItemColor } from "../../utils";
import moment from "moment";

type Props = {
  issueEvents: string | undefined;
};

type IssueEvent = {
  user: string;
  date: string;
  description: string;
};

const ReportTimeline: React.FC<Props> = ({ issueEvents }) => {
  const [events, setEvents] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    if (issueEvents) {
      const parsedEvents = JSON.parse(issueEvents) as IssueEvent[];
      const renderEvents = parsedEvents.map((event) => {
        const { user, date, description } = event;
        const color = timelineItemColor(description);
        const timestamp = moment(parseInt(date)).format("MMM Do, YYYY");
        return (
          <Timeline.Item color={color} key={Math.random()}>
            {user} {description} @ {timestamp}
          </Timeline.Item>
        );
      });
      setEvents([...events, ...renderEvents]);
    }
    // eslint-disable-next-line
  }, [issueEvents]);
  return <Timeline mode="alternate">{events.reverse()}</Timeline>;
};

export default ReportTimeline;
