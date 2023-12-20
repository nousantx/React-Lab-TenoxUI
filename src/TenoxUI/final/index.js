// tenoxcss.js

let AllProperty = {
  p: ["padding"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  pr: ["paddingRight"],
  pt: ["paddingTop"],
  m: ["margin"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  mr: ["marginRight"],
  ml: ["marginLeft"],
  fs: ["fontSize"],
  fw: ["fontWeight"],
  z: ["zIndex"],
  t: ["top"],
  b: ["bottom"],
  r: ["right"],
  l: ["left"],
  br: ["borderRadius"],
  bw: ["borderWidth"],
  "bw-left": ["borderLeftWidth"],
  "bw-right": ["borderRightWidth"],
  "bw-top": ["borderTopWidth"],
  "bw-bottom": ["borderBottomWidth"],
  w: ["width"],
  "w-mx": ["maxWidth"],
  "w-mn": ["minWidth"],
  h: ["height"],
  "h-mx": ["maxHeight"],
  "h-mn": ["minHeight"],
  fx: ["flex"],
  gap: ["gap"],
  ti: ["textIndent"],
  "backdrop-blur": ["backdropFilter"],
  ph: ["paddingLeft", "paddingRight"],
  pv: ["paddingTop", "paddingBottom"],
  mv: ["marginTop", "marginBottom"],
  mh: ["marginLeft", "marginRight"],
  "text-space": ["letterSpacing"],
  "word-space": ["wordSpacing"],
  "line-height": ["lineHeight"],
  "radius-tl": ["borderTopLeftRadius"],
  "radius-tr": ["borderTopRightRadius"],
  "radius-bl": ["borderBottomLeftRadius"],
  "radius-br": ["borderBottomRightRadius"],
  "radius-top": ["borderTopLeftRadius", "borderTopRightRadius"],
  "radius-bottom": ["borderBottomLeftRadius", "borderBottomRightRadius"],
  "radius-left": ["borderTopLeftRadius", "borderBottomLeftRadius"],
  "radius-right": ["borderTopRightRadius", "borderBottomRightRadius"],
  opa: ["opacity"],
  filter: ["filter"],
  blur: ["filter"],
  brightness: ["filter"],
  contrast: ["filter"],
  grayscale: ["filter"],
  "hue-rotate": ["filter"],
  saturate: ["filter"],
  sepia: ["filter"],
};

// Define a constructor function
function TenoxUI() {
  let Classes = [
    '[class*="p-"], [class*="pt-"], [class*="pb-"], [class*="pr-"], [class*="pl-"], [class*="m-"], [class*="mt-"], [class*="mb-"], [class*="mr-"], [class*="ml-"], [class*="fs-"], [class*="fw-"], [class*="z-"], [class*="t-"], [class*="b-"], [class*="r-"], [class*="l-"], [class*="br-"], [class*="bw-"], [class*="w-"], [class*="w-mx-"], [class*="w-mn-"], [class*="h-"], [class*="h-mx-"], [class*="h-mn-"], [class*="fx-"], [class*="gap-"], [class*="ti-"], [class*="rt-"], [class*="backdrop-blur-"], [class*="ph-"], [class*="pv-"], [class*="mv-"], [class*="mh-"], [class*="text-space-"], [class*="word-space-"], [class*="line-height-"], [class*="radius-tl-"], [class*="radius-tr-"], [class*="radius-bl-"], [class*="radius-br-"], [class*="radius-top-"], [class*="radius-bottom-"], [class*="radius-left-"], [class*="radius-right-"], [class*="radius-top-"], [class*="radius-bottom-"], [class*="radius-left-"], [class*="radius-right-"], [class*="gs-"], [class*="blur-"], [class*="opa-"], [class*="x-"], [class*="bw-left-"], [class*="bw-right-"], [class*="bw-top-"], [class*="bw-bottom-"], [class*="scale-"], [class*="filter-"], [class*="brightness-"], [class*="sepia-"], [class*="grayscale-"], [class*="contrast-"], [class*="saturate-"], [class*="hue-rotate-"]',
  ];

  let AllClasses = document.querySelectorAll(Classes.join(", "));

  // Style Declare
  function tenoxcss(element) {
    this.element = element;
    // { {class-name} : ['class-property'] }
    this.styles = AllProperty;
  }

  tenoxcss.prototype.applyStyle = function (type, value, unit) {
    const properties = this.styles[type];

    if (properties) {
      properties.forEach((property) => {
        if (property === "filter") {
          // Check if the filter property is already set
          const existingFilter = this.element.style[property];
          // Concatenate the new filter value with the existing value
          this.element.style[property] = existingFilter
            ? `${existingFilter} ${type}(${value}${unit})`
            : `${type}(${value}${unit})`;
        } else if (property === "flex") {
          this.element.style[property] = `1 1 ${value}${unit}`;
        } else {
          this.element.style[property] = `${value}${unit}`;
        }
      });
    }
  };

  tenoxcss.prototype.applyStyles = function (className) {
    // Matching all class with all possible Value
    const match = className.match(/([a-zA-Z]+)-(-?\d+(\.\d+)?)([a-zA-Z]*)/);
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
function CustomTenox(name, values) {
  this[name] = values;
  //   Classes.push(`[class*="${name}-"]`);
  //   AllClasses = document.querySelectorAll(Classes.join(", "));
}

// Add a method to the prototype of CustomTenox to merge it with AllProperty
CustomTenox.prototype.NewTenox = function () {
  Object.assign(AllProperty, this);
};

function Color() {
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
export { TenoxUI, CustomTenox, AllProperty, Color };
