import React from "react";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"]
              ]
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
              "image"
            ]}
            style={{ height: "300px", marginBottom: "40px" }}
          />
        )}
      />
    </div>
  );
}
