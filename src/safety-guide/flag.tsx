import React, { useState, useCallback } from "react";

import InfoIcon from "@atlaskit/icon/glyph/info";
import { B300 } from "@atlaskit/theme/colors";

import Flag from "@atlaskit/flag";

import {
  ExitingPersistence,
  SlideIn,
  mediumDurationMs,
  easeIn,
} from "@atlaskit/motion";

type SafetyGuideFlagProps = {
  href: string;
  name: string;
};

const SafetyGuideFlag = ({ href, name }: SafetyGuideFlagProps) => {
  const [show, setShow] = useState(true);

  const hideFlag = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <div
      style={{
        position: "fixed",
        maxWidth: "400px",
        zIndex: 9999,
        right: 16,
        top: 8,
      }}
    >
      <ExitingPersistence appear>
        {show && (
          <SlideIn
            enterFrom="right"
            fade="in"
            duration={mediumDurationMs}
            animationTimingFunction={() => easeIn}
          >
            {(props) => (
              <div {...props}>
                <Flag
                  icon={<InfoIcon label="Info" primaryColor={B300} />}
                  id="info"
                  key="info"
                  title="E-Safety Guide Available!"
                  description={`Learn how to protect yourself and report inappropriate content while browsing ${name}.`}
                  actions={[
                    // View guide opens in new tab
                    { content: "View Guide", href },
                    { content: "Close", onClick: hideFlag },
                  ]}
                  onDismissed={hideFlag}
                />
              </div>
            )}
          </SlideIn>
        )}
      </ExitingPersistence>
    </div>
  );
};

export default SafetyGuideFlag;
