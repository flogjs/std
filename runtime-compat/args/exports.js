import {runtime} from "runtime-compat/meta";

const [,, ...args] = runtime === "bun" ? Bun.argv : process.argv;
export default args;
