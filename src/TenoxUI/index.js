// tenoxcss.js

import property from "./property.js";
// Define a constructor function
export default function TenoxUI() {
  let Classes = Object.keys(property).map(
    (className) => `[class*="${className}-"]`
  );
  // Merge all `Classes` into one selector. Example : '[class*="p-"]', '[class*="m-"]', '[class*="justify-"]'
  let AllClasses = document.querySelectorAll(Classes.join(", "));
  // Style Declare
  function tenoxcss(element) {
    this.element = element;
    // { {class-name} : ['class-property'] }
    this.styles = property;
  }

  tenoxcss.prototype.applyStyle = function (type, value, unit) {
    const properties = this.styles[type];
    if (properties) {
      properties.forEach((property) => {
        // Filter Custom Property
        if (property === "filter") {
          const existingFilter = this.element.style[property];
          this.element.style[property] = existingFilter
            ? `${existingFilter} ${type}(${value}${unit})`
            : `${type}(${value}${unit})`;
        }
        // Make custom property for flex
        else if (property === "flex") {
          this.element.style[property] = `1 1 ${value}${unit}`;
        }
        // Grid System Property
        else if (
          property === "gridRow" ||
          property === "gridColumn" ||
          property === "gridRowStart" ||
          property === "gridColumnStart" ||
          property === "gridRowEnd" ||
          property === "gridColumnEnd"
        ) {
          this.element.style[property] = `span ${value}${unit}`;
        } else if (type === "grid-row" || type === "grid-col") {
          this.element.style[property] = `repeat(${value}${unit}, 1fr))`;
        } else if (type === "auto-grid-row" || type === "auto-grid-col") {
          this.element.style[
            property
          ] = `repeat(auto-fit, minmax(${value}${unit}, 1fr))`;
        } else if (value.startsWith("[") && value.endsWith("]")) {
          const cssVariable = value.slice(1, -1);
          this.element.style[property] = `var(--${cssVariable})`;
        } else {
          this.element.style[property] = `${value}${unit}`;
        }
      });
    }
  };

  tenoxcss.prototype.applyStyles = function (className) {
    // Matching all class with all possible Value
    const match = className.match(
      /([a-zA-Z]+(?:-[a-zA-Z]+)*)-(-?(?:\d+(\.\d+)?)|(?:[a-zA-Z]+(?:-[a-zA-Z]+)*(?:-[a-zA-Z]+)*)|(?:\[[^\]]+\]))([a-zA-Z%]*)/
    );
    if (match) {
      // type = property class
      const type = match[1];
      // value = possible value. Example: 10, 50, 100, etc
      const value = match[2];
      // unit = possible unit. Example: px, rem, em, s, etc
      const unitOrValue = match[4];
      this.applyStyle(type, value, unitOrValue);
    }
  };

  AllClasses.forEach((element) => {
    const classes = element.classList;
    const styler = new tenoxcss(element);
    classes.forEach((className) => {
      styler.applyStyles(className);
    });
  });
}

function newProp(name, values) {
  if (typeof name !== "string" || !Array.isArray(values)) {
    console.warn(
      "Invalid arguments for newProp. Please provide a string for name and an array for values."
    );
    return;
  }
  this[name] = values;
  // Classes.push(`[class*="${name}-"]`);
  // AllClasses = document.querySelectorAll(Classes.join(", "));
}

newProp.prototype.tryAdd = function () {
  if (!this || Object.keys(this).length === 0) {
    console.warn("Invalid newProp instance:", this);
    return;
  }
  Object.assign(property, this);
};

export function makeProp(Types, Property) {
  // Check if 'Types' is a string
  if (typeof Types !== "string") {
    throw new Error("Types must be a string");
  }
  // Check if 'Property' is an array
  if (!Array.isArray(Property)) {
    throw new Error("Property must be an array");
  }
  new newProp(Types, Property).tryAdd();
}

export function Color() {
  const makeColor = (element, pattern, property, format) => {
    // Match the class name against the provided pattern
    const match = element.className.match(pattern);
    // If there is a match, apply the style to the element using the specified property and format
    if (match) {
      element.style[property] = format(match);
    }
  };
  // Select all elements with classes related to colors (background, text, border)
  const colorClass = document.querySelectorAll(
    '[class*="bg-"], [class*="tc-"], [class*="border-"]'
  );
  // Define mappings for color types and corresponding CSS properties
  const colorTypes = {
    bg: "background",
    tc: "color",
    border: "borderColor",
  };
  // Define different color formats and their corresponding formatting functions
  const colorFormats = {
    rgb: (match) => `rgb(${match.slice(1, 4).join(",")})`,
    rgba: (match) => `rgba(${match.slice(1, 5).join(",")})`,
    hex: (match) => `#${match[1]}`,
  };
  // Iterate through each element with color-related classes
  colorClass.forEach((element) => {
    // Iterate through each color type (bg, tc, border)
    for (const type in colorTypes) {
      // Iterate through each color format (rgb, rgba, hex)
      for (const format in colorFormats) {
        // Create a pattern for the specific color type and format
        const pattern = new RegExp(`${type}-${format}\\(([^)]+)\\)`);
        // Apply color to the element using the makeColor function
        makeColor(element, pattern, colorTypes[type], colorFormats[format]);
      }
      // Create a pattern for hex color format
      const hexPattern = new RegExp(`${type}-([0-9a-fA-F]{3,6})`);
      // Apply color to the element using the makeColor function for hex format
      makeColor(element, hexPattern, colorTypes[type], colorFormats["hex"]);
    }
  });
}
Color();
TenoxUI();
