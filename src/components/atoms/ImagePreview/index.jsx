import React from "react";

const ImagePreview = ({ imageUrl }) => {
  return (
    <div style={{ maxWidth: "200px", maxHeight: "200px", overflow: "auto" }}>
      <img
        src={imageUrl}
        alt="Image Preview"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default ImagePreview;
