import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar, Button, Tag } from "antd";
import { SingleReportType } from "./Report";
import StatusDropDown from "./StatusDropDown";
import ReportAssignModal from "./ReportAssignModal";
import ReportAssign from "./ReportAssign";
import { RootState } from "../../store/reducers/rootReducer";
import { modalState } from "../../store/reducers/modalReducer";

type Props = {
  loading: boolean;
  report: SingleReportType | undefined;
};

const { Meta, Grid } = Card;

const ReportTemplate: React.FC<Props> = ({ loading, report }) => {
  const modalState = useSelector<RootState, modalState>((store) => store.modal);
  const dispatch = useDispatch();
  return (
    <>
      {modalState.showModal && <ReportAssignModal id={report?.id} />}
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
          <ReportAssign
            manager={report?.project.manager}
            assignee={report?.assignee}
            dispatch={dispatch}
          />
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
          adipisicing elit. Reiciendis, consectetur architecto amet dolorem
          earum, quae iusto voluptatibus praesentium quos illum quaerat
          cupiditate repellat ad. Totam tempora quod nam corrupti non.
        </Grid>
        <Grid style={{ width: "100%" }} hoverable={false}>
          <h2>Steps to reproduce</h2>
          <ul>
            {report?.reproduceSteps.map((step) => (
              <li key={step}>
                {step}: Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Quas, vel illo sunt sequi molestias dolorum eligendi aut
                similique asperiores sint unde, culpa sit nulla aliquam quisquam
                officia deserunt, itaque eos?
              </li>
            ))}
          </ul>
        </Grid>
        {report?.attachments && (
          <Grid hoverable={false}>
            <h2>Attachments</h2>
            <ul>
              {report.attachments.map((file) => (
                <li key={file}>
                  <a href={`http://127.0.0.1:4000/attachments/${file}`}>
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          </Grid>
        )}
      </Card>
    </>
  );
};

export default ReportTemplate;
