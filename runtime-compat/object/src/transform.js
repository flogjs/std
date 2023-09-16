import {is} from "../../invariant/exports.js";
import {identity} from "../../function/exports.js";
import from from "./from.js";
import to from "./to.js";

export default (object = {}, transformer = identity) => {
  is(object).object();
  is(transformer).function();
  return from(transformer(to(object)));
};
