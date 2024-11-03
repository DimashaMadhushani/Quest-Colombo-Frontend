import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

const ImageUploadComponent = ({ setImageUrl }) => {
  const props = {
    name: "file",
    maxCount: 1,
    action: "https://api.escuelajs.co/api/v1/files/upload",
    accept: "image/*",
    onChange(info) {
      const { status, response } = info.file;

      if (status === "done") {
        setImageUrl(response.location);
      } else if (status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default ImageUploadComponent;
