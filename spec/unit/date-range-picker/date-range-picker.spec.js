const fs = require("fs");
const path = require("path");
const assert = require("assert");
const DatePicker = require("../../../src/js/components/date-picker");
const DateRangePicker = require("../../../src/js/components/date-range-picker");
const EVENTS = require("./events");

const TEMPLATE = fs.readFileSync(
  path.join(__dirname, "/date-range-picker.template.html")
);

describe("date range picker component", () => {
  const { body } = document;

  let root;
  let rangeStart;
  let rangeStartInputEl;
  let rangeEnd;
  let rangeEndInputEl;

  beforeEach(() => {
    body.innerHTML = TEMPLATE;
    DatePicker.on();
    DateRangePicker.on();
    root = body.querySelector(".usa-date-range-picker");
    rangeStart = root.querySelector(".usa-date-range-picker__range-start");
    rangeEnd = root.querySelector(".usa-date-range-picker__range-end");
    rangeStartInputEl = rangeStart.querySelector(".usa-date-picker__input");
    rangeEndInputEl = rangeEnd.querySelector(".usa-date-picker__input");
  });

  afterEach(() => {
    body.textContent = "";
    DatePicker.off(body);
    DateRangePicker.off(body);
  });

  it("should enhance the date picker and identify the start and end date pickers", () => {
    assert.ok(rangeStart, "has a range start date picker element");
    assert.ok(rangeEnd, "has a range end date picker element");
  });

  // event interactions

  it("should reset the range end date picker properties when the range start date picker has an empty value", () => {
    rangeStartInputEl.value = "";

    EVENTS.input(rangeStartInputEl);

    assert.equal(
      rangeEnd.dataset.minDate,
      "01/01/0000",
      "has the default min date"
    );
    assert.equal(rangeEnd.dataset.rangeDate, "", "has no range date");
    assert.equal(rangeEnd.dataset.defaultDate, "", "has no default date");
  });

  it("should update the range end date picker properties to have a min date and range date when the range start date picker has an updated valid value", () => {
    rangeStartInputEl.value = "12/12/2020";

    EVENTS.input(rangeStartInputEl);

    assert.equal(
      rangeEnd.dataset.minDate,
      "12/12/2020",
      "has updated min date"
    );
    assert.equal(
      rangeEnd.dataset.rangeDate,
      "12/12/2020",
      "has updated range date"
    );
    assert.equal(
      rangeEnd.dataset.defaultDate,
      "12/12/2020",
      "has updated default date"
    );
  });

  it("should reset the range end date picker properties when the range start date picker has an updated invalid value", () => {
    rangeStartInputEl.value = "ab/dc/efg";

    EVENTS.input(rangeStartInputEl);

    assert.equal(
      rangeEnd.dataset.minDate,
      "01/01/0000",
      "has the default min date"
    );
    assert.equal(rangeEnd.dataset.rangeDate, "", "has no range date");
    assert.equal(rangeEnd.dataset.defaultDate, "", "has no default date");
  });

  it("should reset the range start date picker properties when the range end date picker has an empty value", () => {
    rangeEndInputEl.value = "";

    EVENTS.input(rangeEndInputEl);

    assert.equal(rangeStart.dataset.maxDate, "", "has no max date");
    assert.equal(rangeStart.dataset.rangeDate, "", "has no range date");
    assert.equal(rangeStart.dataset.defaultDate, "", "has no default date");
  });

  it("should update the range start date picker properties to have a max date and range date when the range end date picker has an updated valid value", () => {
    rangeEndInputEl.value = "12/11/2020";

    EVENTS.input(rangeEndInputEl);

    assert.equal(
      rangeStart.dataset.maxDate,
      "12/11/2020",
      "has updated min date"
    );
    assert.equal(
      rangeStart.dataset.rangeDate,
      "12/11/2020",
      "has updated range date"
    );
    assert.equal(
      rangeStart.dataset.defaultDate,
      "12/11/2020",
      "has updated default date"
    );
  });

  it("should reset the range end date picker properties when the range start date picker has an updated invalid value", () => {
    rangeEndInputEl.value = "35/35/3535";

    EVENTS.input(rangeEndInputEl);

    assert.equal(rangeStart.dataset.maxDate, "", "has no max date");
    assert.equal(rangeStart.dataset.rangeDate, "", "has no range date");
    assert.equal(rangeStart.dataset.defaultDate, "", "has no default date");
  });
});
