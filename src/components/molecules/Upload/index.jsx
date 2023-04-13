import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { createToast } from "../../../utils/createToast";
import axios from "axios";
import ImagePreview from "../../atoms/ImagePreview";

export default function Upload({
  maxSize,
  type,
  setIsLoading,
  fileUpload,
  setFileUpload,
  disabled,
}) {
  const [file, setFile] = useState({
    name: "",
    size: "",
  });

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    const fileAccept = acceptedFiles[0];
    const fileReject = rejectedFiles[0];

    if (fileAccept) {
      setFile({
        name: fileAccept.path,
        size: fileAccept.size,
      });

      setIsLoading(true);

      const formData = new FormData();
      if (type === "photo") {
        formData.append("photo", fileAccept);
      } else {
        formData.append("video", fileAccept);
      }

      axios
        .post(`${process.env.REACT_APP_API_URL}/upload/aws`, formData, {
          headers: {
            token: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (type === "photo") {
            setFileUpload(response.data.data.photo);
          } else {
            setFileUpload(response.data.data.video);
          }
        })
        .catch((error) => {
          setFileUpload("");
          setFile({
            name: "",
            size: "",
          });

          if (error.response) {
            createToast(error.response.data.error, "error");
          } else {
            createToast(error.message, "error");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createToast(fileReject?.errors[0]?.message, "error");
    }
  };

  return (
    <>
      <Dropzone
        maxSize={maxSize}
        onDrop={handleDrop}
        multiple={false}
        disabled={disabled}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drop file di sini atau klik untuk memilih file</p>
          </div>
        )}
      </Dropzone>
      <p>
        {file.name && file.size && (
          <>
            {file.name} - {file.size}
          </>
        )}
      </p>
      {type === "photo" ? (
        <>{fileUpload && <ImagePreview imageUrl={fileUpload} />}</>
      ) : (
        <>
          {fileUpload && (
            <div className="video-preview">
              <video src={fileUpload} controls></video>
            </div>
          )}
        </>
      )}
    </>
  );
}
