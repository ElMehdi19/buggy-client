import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import { timelineItemColor } from "../../utils";
// import moment from "moment";
import dayjs from "dayjs";

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
        // const timestamp = moment(parseInt(date)).format("MMM Do, YYYY");
        const timestamp = dayjs(parseInt(date)).format("DD/MM/YYYY");
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
  return (
    <Timeline
      mode="alternate"
      style={{ background: "#10185e", color: "#f1f1f1", borderRadius: "10px" }}
    >
      {events.reverse()}
    </Timeline>
  );
};

export default ReportTimeline;
