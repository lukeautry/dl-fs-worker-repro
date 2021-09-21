import path from "path";
import * as esbuild from "esbuild";

export const setupEsbuild = () => {
  return new Promise<void>((resolve, reject) => {
    esbuild
      .build({
        watch: {
          onRebuild(error) {
            if (error) {
              console.error("[esbuild] build failed: ", error);
            } else {
              console.log("[esbuild] build success");
            }
          },
        },
        outdir: path.join(__dirname, "../../public"),
        bundle: true,
        entryPoints: [
          path.join(__dirname, "../client/index.tsx"),
          path.join(__dirname, "../client/worker.ts"),
        ],
      })
      .then(
        () => {
          console.log("[esbuild] build success");
          resolve();
        },
        (err) => {
          console.error("[esbuild] build failed: ", err);
          reject();
        }
      );
  });
};
