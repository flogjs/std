import { tryreturn } from "runtime-compat/async";
import { to } from "runtime-compat/object";

const MODULE_NOT_FOUND = "ERR_MODULE_NOT_FOUND";

export default async dependencies => {
  const modules = Object.keys(dependencies);

  const results = await Promise.all(modules.map(module =>
    tryreturn(_ => import(module))
      .orelse(({ code }) => code === MODULE_NOT_FOUND ? module : {})));

  const errored = results.filter(result => typeof result === "string");
  const versions = to(dependencies)
    .filter(([dependency]) => errored.includes(dependency))
    .map(([key, value]) => `${key}@${value}`);
  if (errored.length > 0) {
    const error = new Error();
    error.names = errored;
    error.versions = versions;
    throw error;
  }
  return results.filter(result => typeof result !== "string");
};
