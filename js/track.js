/* global window, PaidPost */

// const postDetails = `${window.guacData.clientName}: ${window.guacData.projectName}`;

const track = (
  options = {
    category: undefined,
    action: undefined,
    label: undefined,
    value: undefined
  }
) => {
  const postDetails = `${window.guacData.clientName}: ${window.guacData.projectName}`;
  const { category, action, label, value } = options;

  if (typeof window.ga !== "undefined") {
    let categoryStr = postDetails;

    if (typeof category === "string") {
      categoryStr += ` - ${category}`;
    }

    if (
      typeof action !== "undefined" &&
      action !== null &&
      typeof action !== "string"
    ) {
      throw new Error("track(): parameter `action` is not a string");
    }

    if (
      typeof label !== "undefined" &&
      label !== null &&
      typeof label !== "string"
    ) {
      throw new Error("track(): parameter `label` is not a string");
    }

    if (
      typeof value !== "undefined" &&
      value !== null &&
      typeof value !== "number"
    ) {
      throw new Error("track(): parameter `value` is not a number");
    }
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
    if (
      typeof value === "number" &&
      (value < 0 || Math.floor(value) !== value)
    ) {
      throw new Error(
        "track(): parameter `value` is not a non-negative integer"
      );
    }

    window.ga("send", "event", categoryStr, action, label, value);
  }
};

export default track;