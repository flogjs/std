const packager = import.meta.runtime?.packager ?? "npm";
const manifest = import.meta.runtime?.manifest ?? "package.json";
const library = import.meta.runtime?.library ?? "node_modules";
const runtime = typeof Bun === "undefined" ? "node" : "bun";

export {packager, manifest, library, runtime};
