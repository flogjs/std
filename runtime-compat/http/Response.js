import BunResponse from "./BunResponse.js";
import NodeResponse from "./NodeResponse.js";
import {runtime} from "runtime-compat/meta";

export default runtime === "bun" ? BunResponse : NodeResponse;
