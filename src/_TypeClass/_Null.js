import { _Common } from "./extends/_Common";

export class _Null extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._Null._count += 1;
  }
}
