import is_bun from "../is_bun.js";
import * as node_streams from "node:stream/web";

const RS = is_bun ? ReadableStream : node_streams.ReadableStream;
const WS = is_bun ? WritableStream : node_streams.WritableStream;
const TS = is_bun ? TransformStream : node_streams.TransformStream;

export {RS as ReadableStream, WS as WritableStream, TS as TransformStream};
export {default as stringify} from "./stringify.js";
