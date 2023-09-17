import Every from "./Every.js";

export default test => {
  test.case("constructor", assert => {
    assert(() => new Every()).not_throws();
  });
  test.case("number", assert => {
    assert(() => new Every("1").number()).throws();
    assert(() => new Every(1).number()).not_throws();
  });
  test.case("function", assert => {
    assert(() => new Every("1").function()).throws();
    assert(() => new Every(() => null).function()).not_throws();
    assert(() => new Every(() => null, undefined).function()).throws();
  });
};
