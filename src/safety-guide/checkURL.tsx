import React, {useState} from "react";

function CheckURL(url: any) {
  const [available, setAvailable] = useState(false)
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
      <p>{r}</p>
    </>
  );
}

export default CheckURL;