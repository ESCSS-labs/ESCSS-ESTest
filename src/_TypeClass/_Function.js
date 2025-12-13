import { _Common } from "./extends/_Common";

export class _Function extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._Function._count += 1;
  }
}
