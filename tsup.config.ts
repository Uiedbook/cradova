import type { Options } from "tsup";

const config: Options = {
  entry: ["src/index.ts"],
  dts: true,
  clean: true,
  format: ["esm"],
  minify: true,
  treeshake: "safest",
  bundle: true,
  esbuildOptions(options) {
    options.legalComments = "none";
  },
};

export default config;
