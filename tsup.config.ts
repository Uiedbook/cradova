import type { Options } from "tsup";
import { readFile, writeFile } from "node:fs";

const config: Options = {
  entry: ["lib/index.ts"],
  dts: true,
  clean: true,
  format: ["esm"],
  minify: true,
  treeshake: "safest",
  async onSuccess() {
    readFile("./dist/index.js", "utf-8", (e, d) => {
      if (e) throw e;
      writeFile("./dist/index.js", details + d, (e) => {
        if (e) throw e;
      });
    });
    // setTimeout(() => {
    //   readFile("./dist/index.d.ts", "utf-8", (e, d) => {
    //     if (e) throw e;
    //     writeFile("./dist/index.d.ts", details + d, (e) => {
    //       if (e) throw e;
    //     });
    //   });
    //   console.log("done");
    // }, 10_000);
  },
  // target: "esnext",
  // target: "es2015",
  bundle: true,
  esbuildOptions(options) {
    options.legalComments = "none";
  },
};

const details = `
/*
============================================================================="
    ██████╗   ██████╗    █████═╗   ███████╗    ███████╗    ██╗   ██╗  █████╗   
   ██╔════╝   ██╔══██╗  ██╔═╗██║   █      ██  ██╔═════╝█   ██║   ██║  ██╔═╗██  
   ██║        ██████╔╝  ███████║   █      ██  ██║     ██   ██║   ██║  ██████╗  
   ██║        ██╔══██╗  ██║  ██║   █      ██  ██║     ██   ╚██╗ ██╔╝  ██║  ██╗ 
   ╚██████╗   ██║  ██║  ██║  ██║   ███████╔╝   ████████      ╚███╔╝   ██║  ██║ 
    ╚═════╝   ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝        ╚══╝    ╚═╝  ╚═╝ 
=============================================================================
Cradova
@version  3.3.0
License: Apache V2
Copyright 2022 Friday Candour. 
Repository - https://github.com/fridaycandour/cradova
=============================================================================
*/
`;

export default config;
