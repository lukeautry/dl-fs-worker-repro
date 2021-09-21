import fs from "fs";
import path from "path";
import express from "express";
import { setupEsbuild } from "./setup-esbuild";

const app = express();

const sendError = (message: string, status: number, res: express.Response) =>
  res.send({ error: message }).status(status);

app
  .use("/", express.static("public"))
  .get("/files/download/:file", async (req, res) => {
    const file = req.params.file;
    if (!file) {
      return sendError("no file path parameter provided", 400, res);
    }

    const filePath = path.join(__dirname, `../../files/${file}`);

    try {
      await fs.promises.access(filePath);
    } catch (err) {
      return sendError("no file found", 404, res);
    }

    fs.createReadStream(filePath).pipe(res);
  });

(async () => {
  await setupEsbuild();

  const SERVER_PORT = 8337;
  app.listen(SERVER_PORT, () => {
    console.log(`server listening on port ${SERVER_PORT}`);
  });
})();
