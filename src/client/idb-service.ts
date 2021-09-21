import * as idb from "idb";
import { DB_NAME, HANDLE_OBJECT_STORE } from "./constants";

export interface IFileInfo {
  path: string;
  handle: FileSystemFileHandle;
}

export class IDBService {
  getDb() {
    return idb.openDB<{}>(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(HANDLE_OBJECT_STORE, {
          keyPath: "path",
          autoIncrement: true,
        });
      },
    });
  }

  async save(fileInfo: IFileInfo) {
    const db = await this.getDb();

    const tx = db.transaction([HANDLE_OBJECT_STORE], "readwrite");

    await tx.store.put(fileInfo);
  }

  async getFileInfoFromIDB(path: string): Promise<IFileInfo> {
    const db = await this.getDb();

    const tx = db.transaction([HANDLE_OBJECT_STORE], "readonly");

    return (await tx.store.get(path)) as IFileInfo;
  }
}
