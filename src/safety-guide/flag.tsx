
import React, {useState} from 'react';

import InfoIcon from '@atlaskit/icon/glyph/info';
import { N500, B300 } from '@atlaskit/theme/colors';

import Flag from '@atlaskit/flag';

const FlagPopup = () => {
  const [show, setShow] = useState(true);

  const name = "Facebook"

  const hideFlag = () => {
    setShow(false)
  }
  return (
    <div style={{position: "fixed", maxWidth: '400px', zIndex: 9999, right: 8, top: 8}}>
      {show && <Flag
        icon={<InfoIcon label="Info" primaryColor={B300} />}
        id="info"
        key="info"
        title="E-Safety Guide Available!"
        description="This website"
        actions={[
          // View guide opens in new tab
          { content: 'View Guide', onClick: () => {} },
          { content: 'Close', onClick: hideFlag},
        ]}
      />}
    </div>
  );
};


export default FlagPopup;