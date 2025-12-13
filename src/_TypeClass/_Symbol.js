import { _Common } from "./extends/_Common";

export class _Symbol extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._Symbol._count += 1;
  }
}
