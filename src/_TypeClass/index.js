import { _Array } from "./_Array";
import { _BigInt } from "./_Bigint";
import { _Boolean } from "./_Boolean";
import { _Function } from "./_Function";
import { _Null } from "./_Null";
import { _Number } from "./_Number";
import { _Object } from "./_Object";
import { _String } from "./_String";
import { _Symbol } from "./_Symbol";
import { _Undefined } from "./_Undefined";

export const _TypeClass = {
  array: _Array,
  bigint: _BigInt,
  boolean: _Boolean,
  function: _Function,
  null: _Null,
  number: _Number,
  object: _Object,
  string: _String,
  symbol: _Symbol,
  undefined: _Undefined, // To prevent the app from breaking
};
