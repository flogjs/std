import {parse} from "dotenv";
import {runtime} from "runtime-compat/meta";
import {Path} from "runtime-compat/fs";
import {tryreturn} from "runtime-compat/async";

const {JS_ENV} = runtime === "bun" ? Bun.env : process.env;
const root = await Path.root();
const env = root.join(`.env${JS_ENV ? `.${JS_ENV}` : ""}`);
const local = new Path(`${env.path}.local`);

const read = async () => parse(await (await local.exists ? local : env).text());

export default await tryreturn(_ => read()).orelse(_ => ({}));
