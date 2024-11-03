import React, { useEffect, useRef } from "react";

const Image360Viewer = ({ imageUrl }) => {
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const loadPanolens = () => {
      const PANOLENS = window.PANOLENS;
      const panoramaImage = new PANOLENS.ImagePanorama(imageUrl);

      const viewer = new PANOLENS.Viewer({
        container: imageContainerRef.current,
        autoRotate: true,
        autoRotateSpeed: 0.3,
        controlBar: false,
      });

      viewer.add(panoramaImage);
    };

    if (window.PANOLENS) {
      loadPanolens();
    } else {
      const script = document.createElement("script");
      script.src = "/src/assets/js/panolens.min.js";
      script.onload = () => loadPanolens();
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "60%",
        margin: "auto",
      }}
    >
      <div
        ref={imageContainerRef}
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          overflow: "hidden",
          position: "relative",
        }}
        className="image-container"
      ></div>
    </div>
  );
};

export default Image360Viewer;
