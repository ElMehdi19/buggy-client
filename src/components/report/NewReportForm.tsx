import React, { useState, useEffect } from "react";
import { Form, Button, Input, Select, Upload, message } from "antd";
import {
  InfoCircleOutlined,
  PlusOutlined,
  MinusCircleFilled,
  InboxOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

type Props = {
  projects: { id: number; name: string }[];
  handleSubmit: (values: { [key: string]: string }) => Promise<void>;
};

const ReportForm: React.FC<Props> = ({ projects, handleSubmit }) => {
  const [nSteps, setNSteps] = useState<number>(1);
  const [steps, setSteps] = useState<{ key: string; desc: string }[]>([
    { key: "1", desc: "" },
  ]);
  useEffect(() => {
    if (steps.length < nSteps) {
      setSteps([...steps, { key: nSteps.toString(), desc: "" }]);
    }
    if (steps.length > nSteps) {
      steps.pop();
      setSteps([...steps]);
    }
  }, [nSteps, steps]);

  return (
    <Form
      style={{ width: 400 }}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <div style={{ display: "flex", gap: 3 }}>
        <Form.Item
          name="project"
          style={{ display: "inline", flex: 1 }}
          rules={[{ required: true, message: "Please select a project" }]}
        >
          <Select placeholder="Select a project">
            {projects.map((project) => {
              return (
                <Option value={project.id} key={project.id}>
                  {project.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="severity"
          style={{ display: "inline", flex: 1 }}
          rules={[
            { required: true, message: "Please select a severity level" },
          ]}
        >
          <Select placeholder="Severity">
            <Option value="MINOR">Minor</Option>
            <Option value="MODERATE">Moderate</Option>
            <Option value="MAJOR">Major</Option>
            <Option value="CRITICAL">Critical</Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        name="bug"
        rules={[{ required: true, message: "Please add a title!" }]}
      >
        <Input
          type="text"
          prefix={<InfoCircleOutlined className="site-form-item-icon" />}
          placeholder="Subject"
        />
      </Form.Item>
      <Form.Item
        name="details"
        rules={[{ required: true, message: "Please provide some details!" }]}
      >
        <TextArea
          rows={8}
          placeholder="Please provide some details about the bug"
        ></TextArea>
      </Form.Item>
      <div style={{ marginBottom: 10 }}>
        <h3>Steps to reproduce</h3>
        <Form.Item
          label="Step 1"
          name="step1"
          rules={[{ required: true, message: "Please describe the 1st step" }]}
        >
          <TextArea
            id="1"
            rows={2}
            placeholder="Please provide some details about the bug"
          ></TextArea>
        </Form.Item>
        {steps
          .filter((step) => step.key !== "1")
          .map((step) => {
            return (
              <Form.Item
                key={`${step.key}`}
                label={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span>Step {`${step.key}`}</span>
                    <span
                      onClick={() => setNSteps(nSteps - 1)}
                      style={{ textAlign: "center" }}
                    >
                      <MinusCircleFilled style={{ color: "red" }} />
                    </span>
                  </div>
                }
                name={`step${step.key}`}
                rules={[
                  { required: true, message: "Please describe the step" },
                ]}
              >
                <TextArea
                  id={`${step.key}`}
                  rows={2}
                  placeholder="Please provide some details about the bug"
                ></TextArea>
              </Form.Item>
            );
          })}
        <div style={{ textAlign: "center", fontSize: "1.6em" }}>
          <Button type="dashed" onClick={() => setNSteps(nSteps + 1)}>
            <PlusOutlined /> Add Step
          </Button>
        </div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <h3>Add attachments</h3>
        <Form.Item
          name="attachments"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          noStyle
        >
          <Upload.Dragger
            name="files"
            accept="image/*"
            beforeUpload={(file) => {
              const allowed = ["image/jpeg", "image/png"];
              if (!allowed.includes(file.type)) {
                message.error("File type not allowed");
              }
              return false;
            }}
            customRequest={(options) => {
              console.log(options.file);
              return;
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </div>
      <Form.Item style={{ display: "flex" }}>
        <Button
          style={{ width: "50%", margin: "0 auto", display: "block" }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Report
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
