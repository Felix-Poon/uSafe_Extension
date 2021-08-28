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
        downloadText();
    }
    //https://stackoverflow.com/a/18197341
    function downloadText() {
      //Text to include date, url, users involved? 
      let text_arr: string[] = [];

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url_str = tabs[0].url;
        if (url_str) {
          text_arr.push(url_str);
        } else {
          text_arr.push('url-not-found');
        }

        let date = new Date();

        //https://stackoverflow.com/a/8363049 format
        let dateStr = 
          date.getUTCFullYear() + "-" +
          ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" + 
          ("0" + date.getUTCDate()).slice(-2) + " " + 
          ("0" + date.getUTCHours()).slice(-2) + ":" + 
          ("0" + date.getUTCMinutes()).slice(-2) + ":" + 
          ("0" + date.getUTCSeconds()).slice(-2);
        text_arr.push(dateStr);

        let text = text_arr.join('\n');
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'data.txt');
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);  

     });

    }
    

    
    return (
        <>
            <Button appearance="danger" onClick={screenShot}>Take a screenshot!</Button>
            <h1>snapshot insides</h1>
        </>
    );
}

export default Snapshot;