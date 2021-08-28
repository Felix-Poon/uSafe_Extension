/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@atlaskit/button";
import CameraIcon from '@atlaskit/icon/glyph/camera';
import WatchIcon from '@atlaskit/icon/glyph/watch';
import Snapshot from "./snapshot";


const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [page, setPage] = useState(0);

  return (
    <>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Space+Grotesk:wght@300&display=swap');
      </style>

      <div className="extension-container">
        {page ? (
          <h1>Filter stuff</h1>
        ) : (
          <Snapshot />
        )}
      </div>
      <div className="buttons">
        <Button iconBefore={<CameraIcon label="Camera icon" size="small"/>} onClick={() => setPage(0)} className="info-button">
          Snapshot
        </Button>
        <Button iconBefore={<WatchIcon label="Watch icon" size="small"/>} onClick={() => setPage(1)} className="snapshot-button">
          Filter
        </Button>

      </div>
    </>
  
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
