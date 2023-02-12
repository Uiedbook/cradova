import type { Options } from "tsup";

const config: Options = {
  entry: ["lib/index.ts"],
  dts: true,
  clean: true,
  format: ["esm"],
  // format: ["cjs", "esm"],
};

export default config;
