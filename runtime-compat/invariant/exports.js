import Is from "./src/Is.js";
import Every from "./src/Every.js";

const is = value => new Is(value);
const every = value => new Every(value);
const defined = (value, error) => is(value).defined(error);

export {is, every, defined};
export {default as maybe} from "./src/maybe.js";
export {default as assert} from "./src/assert.js";
export {constructible, inconstructible_function} from "./src/construct.js";
export {numeric, boolish, nullish} from "./src/attributes.js";
