import { FILE_NAME } from "./constants";

self.onmessage = async (msg) => {
  const handle = msg.data;
  const writable = await handle.createWritable();

  const response = await fetch(`/files/download/${FILE_NAME}`);

  await response.body?.pipeTo(writable);
};
