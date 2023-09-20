import {is} from "runtime-compat/invariant";
import {identity} from "runtime-compat/function";
import from from "./from.js";
import to from "./to.js";

export default (object = {}, transformer = identity) => {
  is(object).object();
  is(transformer).function();
  return from(transformer(to(object)));
};
