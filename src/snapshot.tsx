import React, { useEffect, useState } from "react";
import Button from "@atlaskit/button";
import ReactDOM from "react-dom";
import { consolidateStreamedStyles } from "styled-components";

const Snapshot = () =>{
    const [numScreenshots, setNumScreenshots] = useState<number>(0);
    chrome.storage.local.get('screenshots', function(result){
        if (result.screenshots != undefined) {
            setNumScreenshots(result.screenshots.length);
        }
    });

    function downloadScreenshot(data : string) {
        const link = document.createElement("a");
        link.download = "screenshot";
        link.href = data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function downloadScreenshots() {
        chrome.storage.local.get('screenshots', function(result){
            let screenshots: string[] = [];
            if (result.screenshots != undefined) {
                console.log(result.screenshots);
                result.screenshots.map((uri:string, index: number) => console.log("index: " + index));
            }
            // screenshots.map(uri => downloadScreenshot(uri));
            chrome.storage.local.clear();
            setNumScreenshots(0);
        });
    }

    function screenShot() {
        console.log("screenshot taken");
        chrome.tabs.captureVisibleTab(function(data) {
            let screenshots: string[] = [];
            chrome.storage.local.get('screenshots', function(result){
                console.log("get finished");
                if (result.screenshots != undefined) {
                    screenshots = result.screenshots;
                }
                console.log(screenshots);
                screenshots.push(data);
                chrome.storage.local.set({'screenshots': screenshots});
                setNumScreenshots(screenshots.length);
            });
        });
    }

    function createTab() {
        chrome.tabs.create({url: chrome.extension.getURL("screenshots.html")});
    }

    return (
        <>
            <Button appearance="danger" onClick={screenShot}>Take a screenshot!</Button>
            <Button appearance="danger" onClick={downloadScreenshots}>Download screenshots!</Button>
            <Button appearance="danger" onClick={createTab}>View Screenshots</Button>
            <h1> Number of screenshots taken: {numScreenshots} </h1>
        </>
    );
}

export default Snapshot;