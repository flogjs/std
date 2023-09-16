import Every from "./Every.js";

export default test => {
  test.case("constructor", assert => {
    assert(() => new Every("not-array")).throws();
    assert(() => new Every([])).not_throws();
  });
  test.case("number", assert => {
    assert(() => new Every(["1"]).number()).throws();
    assert(() => new Every([1]).number()).not_throws();
  });
};
