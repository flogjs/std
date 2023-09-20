import NodeFile from "./NodeFile.js";
import BunFile from "./BunFile.js";
import {runtime} from "runtime-compat/meta";

export default runtime === "bun" ? BunFile : NodeFile;
