import is_bun from "../is_bun.js";
const [,, ...args] = is_bun ? Bun.argv : process.argv;
export default args;
