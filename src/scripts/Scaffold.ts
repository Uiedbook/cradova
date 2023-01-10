/* eslint-disable no-undef */
import { CradovaScreenType } from "../types.js";
export class Scaffold {
  private history: string[] = [];
  private Scaffolds: Record<string, CradovaScreenType> = {};
  async push(label: string, data?: unknown, force?: boolean) {
    if (this.Scaffolds[label]) {
      if (this.history.length) {
        // console.log("deact");
        // @ts-ignore
        this.Scaffolds[this.history[this.history.length - 1]].deActivate();
      }
      if (data) {
        // @ts-ignore
        await this.Scaffolds[label].Activate(data, force);
      } else {
        // @ts-ignore
        await this.Scaffolds[label].Activate();
      }
      // console.log("rendered new");
      this.history.push(label);
    } else {
      throw new Error(
        "✘  Cradova err : no  Scaffold labeled  " + label + " provided!"
      );
    }
  }
  async pop(data?: unknown, force?: boolean) {
    if (!this.history.length || this.history.length === 1) {
      return;
    }
    // @ts-ignore
    this.Scaffolds[this.history[this.history.length - 1]].deActivate();
    this.history.pop();
    // label = ;
    // @ts-ignore
    await this.Scaffolds[this.history[this.history.length - 1]].Activate(
      data,
      force
    );
  }
  async addScaffolds(scaffolds: Record<string, CradovaScreenType>) {
    let i = 0,
      lab = "";
    for (const label in scaffolds) {
      const scaffold = scaffolds[label];
      if (scaffold.template) {
        this.Scaffolds[label] = scaffold;
      } else {
        console.error("✘  Cradova got", scaffold);
        throw new Error(
          "✘  Cradova err : Scaffold of label '" +
            label +
            "' didn't receive a invalid Scaffold component type"
        );
      }
      if (i === 0) {
        lab = label;
      }
      i++;
    }
    if (lab) {
      await this.push(lab);
      return;
    }
    throw new Error("✘  Cradova err : no  Scaffold given!");
  }
}
