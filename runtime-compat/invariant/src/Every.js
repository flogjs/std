import Is from "./Is.js";
import assert from "./assert.js";

const test = ({condition, def, error}) => assert(condition, error || def);

export default class Every {
  #values;

  constructor(values) {
    new Is(values).array();
    this.#values = values;
  }

  #test(...args) {
    test(...args);
    return this.#values;
  }

  #typeof(type, error) {
    const def = `all this array's values must be of type ${type}`;
    const condition = this.#values.every(v => typeof v === type);
    return this.#test({condition, def, error});
  }

  number(error) {
    return this.#typeof("number", error);
  }
}
