import {runtime} from "runtime-compat/meta";
import bun_serve from "./bun-serve.js";
import node_serve from "./node-serve.js";

export default runtime === "bun" ? bun_serve : node_serve;
