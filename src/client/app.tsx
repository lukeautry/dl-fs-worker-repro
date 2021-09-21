import React from "react";
import { FILE_NAME } from "./constants";
import { IDBService } from "./idb-service";

export const App = () => {
  const onClickCrash = async () => {
    // select directory and ask user for permissions
    const directory = await showDirectoryPicker();
    await directory.requestPermission({ mode: "readwrite" });

    // get the handle for the file we plan on saving to
    const handle = await directory.getFileHandle(FILE_NAME, {
      create: true,
    });

    // persist handle in IndexedDB
    await new IDBService().save({
      path: FILE_NAME,
      handle,
    });

    // spawn worker that will do the download
    new Worker("./worker.js");
  };

  return (
    <div>
      <button onClick={onClickCrash}>Make Chrome Crash</button>
    </div>
  );
};
