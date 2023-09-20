import BunRequest from "./BunRequest.js";
import NodeRequest from "./NodeRequest.js";
import {runtime} from "runtime-compat/meta";

export default runtime === "bun" ? BunRequest : NodeRequest;
