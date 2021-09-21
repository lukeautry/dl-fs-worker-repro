import React from "react";
import { FILE_NAME } from "./constants";

export const App = () => {
  const onClickCrash = async () => {
    // select directory and ask user for permissions
    const directory = await showDirectoryPicker();
    await directory.requestPermission({ mode: "readwrite" });

    // get the handle for the file we plan on saving to
    const handle = await directory.getFileHandle(FILE_NAME, {
      create: true,
    });

    // spawn worker that will do the download
    const worker = new Worker("./worker.js");

    // give worker a reference to the file handle
    worker.postMessage(handle);
  };

  return (
    <div>
      <button onClick={onClickCrash}>Make Chrome Crash</button>
    </div>
  );
};
