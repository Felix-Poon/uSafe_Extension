/** @jsx jsx */
import { jsx } from "@emotion/core";
/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React from "react";
import ReactDOM from "react-dom";
import CameraIcon from "@atlaskit/icon/glyph/camera";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";

import Snapshot from "./snapshot";
import Filter from "./filter";

import styles from "@atlaskit/css-reset";

const IconTab = ({ children, icon }: any) => {
  return (
    <Tab>
      <span css={{ marginRight: "8px" }}>{icon}</span>
      {children}
    </Tab>
  );
};

const PanelContent: React.FC<{}> = ({ children }) => {
  return <div css={{ padding: "8px 0" }}>{children}</div>;
};

const Popup = () => {
  return (
    <div css={{ width: 500, padding: 8 }}>
      <style>{styles}</style>
      <Tabs id="features">
        <TabList>
          <IconTab icon={<CameraIcon label="" size="small" />}>
            Snapshot
          </IconTab>
          <IconTab icon={<WatchIcon label="" size="small" />}>Filter</IconTab>
        </TabList>
        <TabPanel>
          <PanelContent>
            <Snapshot />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <Filter />
          </PanelContent>
        </TabPanel>
      </Tabs>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
