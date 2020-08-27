import React from "react";
import { Card, Avatar, Button, Tag } from "antd";
import { SingleReportType } from "./Report";
import StatusDropDown from "./StatusDropDown";

type Props = {
  loading: boolean;
  report: SingleReportType | undefined;
};

const { Meta, Grid } = Card;

const ReportTemplate: React.FC<Props> = ({ loading, report }) => {
  return (
    <Card
      loading={loading}
      style={{ gridColumn: "span 3" }}
      title={
        <Meta
          title={`Issue: ${report ? report.bug : ""}`}
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />
      }
    >
      <Grid
        style={{
          height: 80,
          width: "70%",
          display: "flex",
          justifyContent: "space-around",
        }}
        hoverable={false}
      >
        <Button danger>Edit</Button>
        <Button type="primary">Assign</Button>
        <Button>
          <a href="#comments">Comment</a>
        </Button>
      </Grid>
      <Grid
        style={{
          height: 80,
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        hoverable={false}
      >
        <StatusDropDown reportId={report?.id} status={report?.status} />
        <Tag color="volcano">{report?.severity}</Tag>
      </Grid>
      <Grid style={{ width: "100%" }} hoverable={false}>
        <h2>Details</h2>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quia,
        odit assumenda odio, voluptatibus, quis commodi repellendus voluptates
        totam placeat officia! Ipsum, veritatis ipsam quos aliquid maiores
        assumenda. Sequi, culpa? Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Reiciendis, consectetur architecto amet dolorem earum,
        quae iusto voluptatibus praesentium quos illum quaerat cupiditate
        repellat ad. Totam tempora quod nam corrupti non.
      </Grid>
      <Grid style={{ width: "100%" }} hoverable={false}>
        <h2>Steps to reproduce</h2>
        <ul>
          {report?.reproduceSteps.map((step) => (
            <li key={step}>
              {step}: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quas, vel illo sunt sequi molestias dolorum eligendi aut similique
              asperiores sint unde, culpa sit nulla aliquam quisquam officia
              deserunt, itaque eos?
            </li>
          ))}
        </ul>
      </Grid>
    </Card>
  );
};

export default ReportTemplate;
