import {webcrypto as node_crypto} from "node:crypto";
import is_bun from "../is_bun.js";

export default is_bun ? crypto : node_crypto;
