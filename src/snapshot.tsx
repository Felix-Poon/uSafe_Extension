/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { useState } from "react";
import Button, { ButtonGroup } from "@atlaskit/button";
import JSZip from "jszip";
import { AutoDismissFlag, FlagGroup } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { B300, G300, N0 } from "@atlaskit/theme/colors";
import { h400, h500 } from "@atlaskit/theme/typography";

import Textfield from "@atlaskit/textfield";

interface Screenshot {
  uri: string;
  text: string[];
}

const liStyles = css([
  h400(),
  {
    listStyleType: "none",
    counterIncrement: "list",
    paddingInlineStart: "0",
    position: "relative",
    "::before": {
      content: "counter(list)",
      display: "inline-grid",
      background: B300,
      borderRadius: "50%",
      // width: "20px",
      // height: "20px",
      width: 20,
      height: 20,
      position: "absolute",
      left: -30,
      top: -2,
      color: N0,
      placeItems: "center",
      fontSize: "12px",
      fontWeight: "bold",
      lineHeight: 0,
    },
    ":first-of-type": {
      marginTop: 0,
    },
  },
]);

const sectionStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  alignItems: "flex-start",
});

const Snapshot = () => {
  const [numScreenshots, setNumScreenshots] = useState<number>(0);
  chrome.storage.local.get("screenshots", function (result) {
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

  function zipScreenshot(data: string, zip: JSZip, filename: string) {
    zip.file(filename, data.split(",")[1], { base64: true });
  }

  function zipTextFile(data: string, zip: JSZip) {
    console.log(data);
    zip.file("data.txt", data);
  }

  function screenShot() {
    console.log("screenshot taken");
    chrome.tabs.captureVisibleTab(function (data) {
      let screenshots: Screenshot[] = [];
      chrome.storage.local.get("screenshots", function (result) {
        console.log("get finished");
        if (result.screenshots != undefined) {
          screenshots = result.screenshots;
        }

        let text_arr: string[] = [];
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            text_arr.push(screenshots.length.toString() + ".jpeg");
            let url_str = tabs[0].url;
            if (url_str) {
              text_arr.push(url_str);
            } else {
              text_arr.push("url-not-found");
            }

            let date = new Date();

            //https://stackoverflow.com/a/8363049 format
            let dateStr =
              date.getUTCFullYear() +
              "-" +
              ("0" + (date.getUTCMonth() + 1)).slice(-2) +
              "-" +
              ("0" + date.getUTCDate()).slice(-2) +
              " " +
              ("0" + date.getUTCHours()).slice(-2) +
              ":" +
              ("0" + date.getUTCMinutes()).slice(-2) +
              ":" +
              ("0" + date.getUTCSeconds()).slice(-2);

            text_arr.push(dateStr);
            const new_screen: Screenshot = { uri: data, text: text_arr };
            screenshots.push(new_screen);
            chrome.storage.local.set({ screenshots: screenshots });
            setNumScreenshots(screenshots.length);
            console.log(screenshots);

            // flags
            const newFlagId = numScreenshots;
            const newFlags = flags.slice();
            newFlags.splice(0, 0, newFlagId);
            setFlags(newFlags);
          }
        );
      });
    });
  }

  function handleDismiss() {
    setFlags(flags.slice(1));
  }

  const download = (event: any) => {
    event.preventDefault();
    let text_arr: string[] = [];
    let zip: JSZip = new JSZip();
    if (userList.length === 0) {
      text_arr.push("No name data provided");
    } else {
      text_arr.push("People invovled in cyber bullying: ");
      let users = userList.join(", ");
      text_arr.push(users);
    }

    chrome.storage.local.get("screenshots", function (result) {
      console.log("finished get");
      if (result.screenshots != undefined) {
        result.screenshots.map((s: Screenshot) => {
          console.log("whole screenshot");
          const url_data: string = s.text.join(" ");
          text_arr.push(url_data);
          // downloadScreenshot(s.uri);
          zipScreenshot(s.uri, zip, s.text[0]);
        });
      }

      let text = text_arr.join("\n");
      zipTextFile(text, zip);
      zip.generateAsync({ type: "base64" }).then(function (content) {
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
  };

  function createTab() {
    chrome.tabs.create({ url: chrome.extension.getURL("screenshots.html") });
  }

  return (
    <div>
      <div css={[h500(), { marginTop: 8 }]}>
        Download and report evidence of online abuse.
      </div>
      <div css={{ marginTop: 24 }}>
        <ol
          css={{
            counterReset: "list",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <li css={liStyles}>
            <section css={sectionStyles}>
              <span>Take screenshots.</span>
              <small css={{ margin: 0 }}>
                Current date and URL will be saved automatically.
              </small>
              <div
                css={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <ButtonGroup>
                  <Button onClick={() => screenShot()}>Add screenshot</Button>
                  <Button appearance="link" onClick={createTab}>
                    View saved screenshots
                  </Button>
                </ButtonGroup>
              </div>
            </section>
          </li>
          <li css={liStyles}>
            <section css={sectionStyles}>
              Add the names of people involved.
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 4,
                  width: 250,
                }}
              >
                {userList.map((e, id) => (
                  <Textfield
                    key={id}
                    type="text"
                    onChange={(e) => handleChange(e, id)}
                  />
                ))}
                <Button onClick={addFormFields}>Add name</Button>
              </div>
            </section>
          </li>
          <li css={liStyles}>
            <section css={sectionStyles}>
              Download saved screenshots.
              <Button onClick={download}>Download All</Button>
            </section>
          </li>
          <li css={liStyles}>
            <section css={sectionStyles}>
              Submit report using the following link:
              <Button
                href="https://www.esafety.gov.au/report"
                target="_blank"
                appearance="link"
              >
                https://www.esafety.gov.au/report
              </Button>
            </section>
          </li>
        </ol>
      </div>
      <FlagGroup onDismissed={handleDismiss}>
        {flags.map((id) => {
          return (
            <AutoDismissFlag
              id={id}
              key={id}
              icon={<SuccessIcon label="Success" primaryColor={G300} />}
              title={`Screenshot ${id + 1} was taken!`}
            />
          );
        })}
      </FlagGroup>
    </div>
  );
};

export default Snapshot;
