import React, {useState} from "react";
// LOAD in info

function CheckURL(url: any) {
  const [available, setAvailable] = useState(true)
  let r;
  if (url !== undefined) {
    // Do URL checks/formatting/splitting here
    r = url;

    // Check if available
    //setAvailable(1)
  }
  else {
    r = "undefined"
  }

  const guide = (
    <div>
      <h3>This page has an eSafety guide available!</h3>
      <a href={url}>View</a>
    </div>
  );

  return (
    <>
      {available && guide}
      <p>Checking {r}</p>
    </>
  );
}

export default CheckURL;