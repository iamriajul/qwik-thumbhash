import {defineConfig, type UserConfig} from "vite";
import pkg from "./package.json";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

const { dependencies = {}, peerDependencies = {} } = pkg as any;

const makeRegex = (dep: any) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj: any) => Object.keys(obj).map(makeRegex);

export default defineConfig((): UserConfig => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        // externalize deps that shouldn't be bundled into the library
        external: [
          /^node:.*/,
          ...excludeAll(dependencies),
          ...excludeAll(peerDependencies),
        ],
      },
    },
    plugins: [
      qwikVite(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: "src/worker.ts",
            dest: ".",
          },
        ],
      }),
    ],
  };
});
