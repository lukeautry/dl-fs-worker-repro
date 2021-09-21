import { FILE_NAME } from "./constants";
import { IDBService } from "./idb-service";

(async () => {
  const { handle } = await new IDBService().getFileInfoFromIDB(FILE_NAME);
  const writable = await handle.createWritable();

  const response = await fetch(`/files/download/${FILE_NAME}`);

  await response.body?.pipeTo(writable);
})();
