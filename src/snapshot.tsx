import React, { useEffect, useState } from "react";
import Button from "@atlaskit/button";
import ReactDOM from "react-dom";
import { consolidateStreamedStyles } from "styled-components";

const Snapshot = () =>{
    const [userList, setUserList] = useState<string[]>([]);

    function handleChange(e:any, id:any) {
      let newList = [...userList];
      newList[id] = e.target.value;
      setUserList(newList);
    }

    function addFormFields() {
      setUserList([...userList, ""]);
    }

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

        let users = userList.join(', ');
        text_arr.push(users);

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

          <form onSubmit={screenShot} className="form">
            <h5>Download evidence of online harrassment.</h5>
            <h6>Add the names of users involved. Current date and screenshot will be downloaded automatically.</h6>
            <div className="form-input">
              {userList.map((e, id) => (
                  <input type="text" onChange={e => handleChange(e, id)} />
              ))}
            </div>
            <div className="form-buttons">
              <Button appearance="primary" type="button" onClick={() => addFormFields()}>Add user</Button> <br/>
              <Button appearance="warning" type="submit">Download</Button>
            </div>
          </form>
        </>
    );
}

export default Snapshot;