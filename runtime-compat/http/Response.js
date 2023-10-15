import NativeResponse from "./NativeResponse.js";
import NodeResponse from "./NodeResponse.js";
import {runtime} from "runtime-compat/meta";

export default runtime === "node" ? NodeResponse : NativeResponse;
