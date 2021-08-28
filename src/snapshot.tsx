import React, { useEffect, useState } from "react";
import Button from "@atlaskit/button";
import ReactDOM from "react-dom";
import { consolidateStreamedStyles } from "styled-components";

const Snapshot = () =>{
    
    function downloadScreenshot(data : string) {
        const link = document.createElement("a");
        link.download = "screenshot";
        link.href = data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function screenShot() {
        chrome.tabs.captureVisibleTab(function(data) {
            downloadScreenshot(data);
        })
    }
    return (
        <>
            <Button appearance="danger" onClick={screenShot}>Take a screenshot!</Button>
            <h1>snapshot insides</h1>
        </>
    );
}

export default Snapshot;