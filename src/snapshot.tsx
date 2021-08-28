import React, { useEffect, useState } from "react";
import Button from "@atlaskit/button";
import ReactDOM from "react-dom";
import { consolidateStreamedStyles } from "styled-components";
import JSZip from "jszip";
import { AutoDismissFlag, FlagGroup } from "@atlaskit/flag";
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { G300 } from '@atlaskit/theme/colors'

interface Screenshot {
  uri: string;
  text: string[];
}

const Snapshot = () => {
  const [numScreenshots, setNumScreenshots] = useState<number>(0);
  chrome.storage.local.get('screenshots', function (result) {
    if (result.screenshots != undefined) {
      setNumScreenshots(result.screenshots.length);
    }
  });
  const [userList, setUserList] = useState<string[]>([]);
  const [flags, setFlags] = useState<number[]>([]);

  function handleChange(e: any, id: any) {
    let newList = [...userList];
    newList[id] = e.target.value;
    setUserList(newList);
  }

  function addFormFields() {
    setUserList([...userList, ""]);
  }

  function downloadScreenshot(data: string) {
    const link = document.createElement("a");
    link.download = "screenshot";
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function zipScreenshot(data: string, zip:JSZip, filename: string) {
    zip.file(filename, data.split(",")[1], {base64: true});
  }

  function zipTextFile(data: string, zip:JSZip) {
    console.log(data);
    zip.file("data.txt", data);
  }

  function screenShot() {
    console.log("screenshot taken");
    chrome.tabs.captureVisibleTab(function (data) {
      let screenshots: Screenshot[] = [];
      chrome.storage.local.get('screenshots', function (result) {
        console.log("get finished");
        if (result.screenshots != undefined) {
          screenshots = result.screenshots;
        }

        let text_arr: string[] = [];
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          text_arr.push((screenshots.length).toString()+".jpeg");
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
            ("0" + (date.getUTCMonth() + 1)).slice(-2) + "-" +
            ("0" + date.getUTCDate()).slice(-2) + " " +
            ("0" + date.getUTCHours()).slice(-2) + ":" +
            ("0" + date.getUTCMinutes()).slice(-2) + ":" +
            ("0" + date.getUTCSeconds()).slice(-2);

          text_arr.push(dateStr);
          const new_screen:Screenshot = {uri: data, text: text_arr};
          screenshots.push(new_screen);
          chrome.storage.local.set({ 'screenshots': screenshots});
          setNumScreenshots(screenshots.length);
          console.log(screenshots);
          
          // flags
          const newFlagId = numScreenshots;
          const newFlags = flags.slice();
          newFlags.splice(0, 0, newFlagId);
          setFlags(newFlags);
        });
      });
    });
  }

  function handleDismiss() {
    setFlags(flags.slice(1));
  }

  const download = (event:any) => {
    event.preventDefault();
    let text_arr:string[] = [];
    let zip:JSZip = new JSZip();
    if (userList.length === 0) {
      text_arr.push('No user data available');
    } else {
      let users = userList.join(', ');
      text_arr.push(users);
    }

    chrome.storage.local.get('screenshots', function(result){
      console.log('finished get');
      if (result.screenshots != undefined) {
        result.screenshots.map( (s: Screenshot) => {
          console.log('whole screenshot');
          const url_data:string = s.text.join(' ');
          text_arr.push(url_data);
          // downloadScreenshot(s.uri);
          zipScreenshot(s.uri, zip, s.text[0]);
        })
      }

      let text = text_arr.join('\n');
      zipTextFile(text, zip);
      zip.generateAsync({type: "base64"}).then(function(content){
        const link = document.createElement("a");
        link.download = "evidence.zip";
        link.href = "data:application/zip;base64," + content;
        console.log(content);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });

    chrome.storage.local.clear();
    setNumScreenshots(0);
  }

  function createTab() {
    chrome.tabs.create({ url: chrome.extension.getURL("screenshots.html") });
  }

  function redirectLink() {
    window.open('https://www.esafety.gov.au/report');
  }

  return (
    <>
      <form onSubmit={download} className="form">
        <h5>Download and report evidence of online abuse </h5>
        <div className="form-buttons">
          <div className="section">
            <h6>1. Take screenshots. Current date and URL will be saved automatically.</h6>
            <Button className="add-button" type="button" onClick={() => screenShot()}>Add screenshot</Button> <br />
            <a className="view-button" onClick={() => createTab()}>View saved screenshots</a> <br /> 
          </div>
          <div className="section">
            <h6>2. Add the names of people involved </h6>
            <div className="form-input">
              {userList.map((e, id) => (
                <input type="text" onChange={e => handleChange(e, id)} />
              ))}
            </div>
            <Button className="name-button" type="button" onClick={() => addFormFields()}>Add name</Button> <br />
          </div>
          <div className="section">
            <h6>3. Download all saved screenshots to .zip file</h6>
            <Button className="download-button" type="submit">Download All</Button>
          </div>
          <div className="section">
            <h6>4. Submit report using the following link:</h6>
            <a onClick={redirectLink}>https://www.esafety.gov.au/report</a>
          </div>
        </div>
      </form>
      <FlagGroup onDismissed={handleDismiss}>
        {flags.map((id) => {
          return (
            <AutoDismissFlag 
              id={id}
              key={id}
              icon={<SuccessIcon label="Success" primaryColor={G300}/>}
              title={`Screenshot ${id+1} was taken!`}
            />);
        })}
      </FlagGroup>
    </>
  );
}

export default Snapshot;