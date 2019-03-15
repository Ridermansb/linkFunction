import linkFunction from "./index";

describe("linkFunction", function() {
  it("should be a function", () => {
    expect(linkFunction).toBeInstanceOf(Function);
  });

  it("should produce a function", () => {
    expect(linkFunction(jest.fn())).toBeInstanceOf(Function);
  });

  describe("linkFunction without eventPath argument", () => {
    let fn = jest.fn();
    let linkFunction;
    beforeEach(() => {
      linkFunction = linkFunction(fn);
    });

    it("should use value attribute on text input when no eventPath is supplied", () => {
      let element = document.createElement("input");
      element.type = "text";
      element.value = "newValue";

      linkFunction({
        currentTarget: element,
        target: element
      });

      expect(fn).toHaveBeenCalledWith(element.value);
    });

    it("should use checked attribute on checkbox input when no eventPath is supplied", () => {
      let checkboxElement = document.createElement("input");
      checkboxElement.type = "checkbox";
      checkboxElement.checked = true;

      linkFunction({
        currentTarget: checkboxElement,
        target: checkboxElement
      });

      expect(fn).toHaveBeenCalledWith(checkboxElement.checked);
    });

    it("should use checked attribute on radio input when no eventPath is supplied", () => {
      let radioElement = document.createElement("input");
      radioElement.type = "radio";
      radioElement.checked = true;

      linkFunction({
        currentTarget: radioElement,
        target: radioElement
      });

      expect(fn).toHaveBeenCalledWith(radioElement.checked);
    });
  });

  describe("linkFunction with eventPath argument", () => {
    let fn = jest.fn();
    let linkFunction;
    beforeEach(() => {
      linkFunction = linkFunction(fn, "nested.path");
    });

    it("should give precedence to nested.path on event", () => {
      let event = { nested: { path: "nestedPathValueFromEvent" } };

      linkFunction(event);

      expect(fn).toHaveBeenCalledWith(event.nested.path);
    });
  });
});
