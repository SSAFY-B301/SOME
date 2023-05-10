import { useEffect, useState } from "react";
import React from "react";

function Share() {
  const [state, setstate] = useState(123);
  const fileInput = React.useRef(null);
  useEffect(() => {
    document;
  }, []);

  // Share must be triggered by "user activation"

  const test = async () => {
    const files = fileInput.current.files;
    console.log(files);
    const shareData = {
      files: files,
    };
    try {
      await navigator.share(shareData);
      document.querySelector(".result").textContent = "MDN shared successfully";
    } catch (err) {
      document.querySelector(".result").textContent = `Error: ${err}`;
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInput}
        multiple
        accept="image/jpg,image/png,image/jpeg,image/gif"
        className="upload"
      />
      <p>
        <button onClick={test}>Share MDN!</button>
      </p>
      <p class="result"></p>
    </>
  );
}
export default Share;
