export type CradovaElemetType = HTMLElement &
  Record<string, any> & {
    style: Record<string, unknown>;
    stateID: string;
  };
