import {runtime} from "runtime-compat/meta";
import {webcrypto as node_crypto} from "node:crypto";

export default runtime === "bun" ? crypto : node_crypto;
