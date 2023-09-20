import NodeFile from "./NodeFile.js";
import BunFile from "./BunFile.js";
import is_bun from "../../is_bun.js";

export default is_bun ? BunFile : NodeFile;
