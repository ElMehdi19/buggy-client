import React from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../gql/Mutations";
import { Upload, Form } from "antd";

const Blank: React.FC = () => {
  const [addFile] = useMutation(UPLOAD_FILE, {
    onCompleted: () => console.log("success"),
  });
  const handleSubmit = (formValues: { [key: string]: string }) => {
    addFile({ variables: { file: formValues.attachments } });
    console.log(formValues);
  };
  return (
    <div>
      <Form onFinish={handleSubmit}>
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
                // message.error("File type not allowed");
                console.log("not allowed");
              }
              return false;
            }}
            customRequest={(options) => {
              console.log(options.file);
              return;
            }}
          >
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
        <button type="submit">Check</button>
      </Form>
    </div>
  );
};

export default Blank;
