import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichEditor({ data, setData }) {
  return (
    <ReactQuill
      theme="snow"
      value={data}
      onChange={(value) => {
        setData(value);
      }}
      style={{ height: "250px", marginBottom: "60px" }}
    />
  );
}
