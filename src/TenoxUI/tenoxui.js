/*!
 *
 * TenoxUI CSS Framework v0.4.0
 *
 * copyright (c) 2023 NOuSantx
 *
 * license: https://github.com/nousantx/tenoxui/blob/main/LICENSE
 *
 */

let property = {
  // Mapping type and its Property
  p: ["padding"],
  pt: ["paddingTop"],
  pb: ["paddingBottom"],
  pr: ["paddingRight"],
  pl: ["paddingLeft"],
  ph: ["paddingLeft", "paddingRight"],
  pv: ["paddingTop", "paddingBottom"],
  // Margin
  m: ["margin"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  mr: ["marginRight"],
  ml: ["marginLeft"],
  mv: ["marginTop", "marginBottom"],
  mh: ["marginLeft", "marginRight"],
  // Text and font
  fs: ["fontSize"],
  fw: ["fontWeight"],
  lh: ["lineHeight"],
  ls: ["letterSpacing"],
  ta: ["text-align"],
  tc: ["color"],
  ts: ["textStyle"],
  td: ["textDecoration"],
  ti: ["textIndent"],
  tn: ["textReansform"],
  ws: ["wordSpacing"],
  "text-style": ["fontStyle"],
  "white-space": ["whiteSpace"],
  // Positioning
  position: ["position"],
  post: ["position"],
  z: ["zIndex"],
  t: ["top"],
  b: ["bottom"],
  r: ["right"],
  l: ["left"],
  // Display
  display: ["display"],
  // Width and Height
  w: ["width"],
  "w-mx": ["maxWidth"],
  "w-mn": ["minWidth"],
  h: ["height"],
  "h-mx": ["maxHeight"],
  "h-mn": ["minHeight"],
  // Background
  bg: ["background"],
  "bg-size": ["backgroundSize"],
  "bg-clip": ["backgroundClip"],
  "bg-repeat": ["backgroundRepeat"],
  "bg-loc": ["backgroundPosition"],
  "bg-loc-x": ["backgroundPositionX"],
  "bg-loc-y": ["backgroundPositionY"],
  "bg-blend": ["backgroundBlendMode"],
  // Flex
  fx: ["flex"],
  "flex-parent": ["justifyContent", "alignItems"],
  fd: ["flexDirection"],
  "fx-wrap": ["flexWrap"],
  "item-order": ["order"],
  "fx-basis": ["flexBasis"],
  "fx-grow": ["flexGrow"],
  "fx-shrink": ["flexShrink"],
  // Grid
  "grid-row": ["gridTemplateRows"],
  "grid-col": ["gridTemplateColumns"],
  "auto-grid-row": ["gridTemplateRows"],
  "auto-grid-col": ["gridTemplateColumns"],
  "grid-item-row": ["gridRow"],
  "grid-item-col": ["gridColumn"],
  "grid-row-end": ["gridRowEnd"],
  "grid-row-start": ["gridRowStart"],
  "grid-col-end": ["gridColumnEnd"],
  "grid-col-start": ["gridColumnStart"],
  "grid-area": ["gridArea"],
  "item-place": ["placeArea"],
  "content-place": ["placeContent"],
  // Gap
  gap: ["gap"],
  "grid-gap": ["gridGap"],
  "grid-row-gap": ["gridRowGap"],
  "grid-col-gap": ["gridColumnGap"],
  // Align
  ac: ["alignContent"],
  ai: ["align-items"],
  as: ["alignSelf"],
  // Justify
  jc: ["justify-content"],
  ji: ["justifyItems"],
  js: ["justifySelf"],
  // backdrop [ under developement ]
  "backdrop-blur": ["backdropFilter"],
  // Filter
  filter: ["filter"],
  blur: ["filter"],
  brightness: ["filter"],
  contrast: ["filter"],
  grayscale: ["filter"],
  "hue-rotate": ["filter"],
  saturate: ["filter"],
  sepia: ["filter"],
  opa: ["opacity"],
  // Border
  br: ["borderRadius"],
  bw: ["borderWidth"],
  "bw-left": ["borderLeftWidth"],
  "bw-right": ["borderRightWidth"],
  "bw-top": ["borderTopWidth"],
  "bw-bottom": ["borderBottomWidth"],
  bs: ["borderStyle"],
  "radius-tl": ["borderTopLeftRadius"],
  "radius-tr": ["borderTopRightRadius"],
  "radius-bl": ["borderBottomLeftRadius"],
  "radius-br": ["borderBottomRightRadius"],
  "radius-top": ["borderTopLeftRadius", "borderTopRightRadius"],
  "radius-bottom": ["borderBottomLeftRadius", "borderBottomRightRadius"],
  "radius-left": ["borderTopLeftRadius", "borderBottomLeftRadius"],
  "radius-right": ["borderTopRightRadius", "borderBottomRightRadius"],
  // Additional
  curs: ["cursor"],
  scale: ["scale"],
  rt: ["rotate"],
  // Overflow
  over: ["overflow"],
  overY: ["overflowY"],
  overX: ["overflowX"],
  // Float
  float: ["float"],
  // Aspect Ratio
  ratio: ["aspectRatio"],
  // TenoxUI Custom property.
  box: ["width", "height"],
};

let Classes = Object.keys(property).map(
  (className) => `[class*="${className}-"]`
);
// Merge all `Classes` into one selector. Example : '[class*="p-"]', '[class*="m-"]', '[class*="justify-"]'
let AllClasses = document.querySelectorAll(Classes.join(", "));

function newProp(name, values) {
  if (typeof name !== "string" || !Array.isArray(values)) {
    console.warn(
      "Invalid arguments for newProp. Please provide a string for name and an array for values."
    );
    return;
  }
  this[name] = values;
  Classes.push(`[class*="${name}-"]`);
  AllClasses = document.querySelectorAll(Classes.join(", "));
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

function makeTenoxUI(element) {
  this.element = element;
  this.styles = property;
}

makeTenoxUI.prototype.applyStyle = function (type, value, unit) {
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

makeTenoxUI.prototype.applyStyles = function (className) {
  const match = className.match(
    /([a-zA-Z]+(?:-[a-zA-Z]+)*)-(-?(?:\d+(\.\d+)?)|(?:[a-zA-Z]+(?:-[a-zA-Z]+)*(?:-[a-zA-Z]+)*)|(?:\[[^\]]+\]))([a-zA-Z%]*)/
  );
  if (match) {
    const type = match[1];
    const value = match[2];
    const unitOrValue = match[4];
    this.applyStyle(type, value, unitOrValue);
  }
};

makeTenoxUI.prototype.applyMultiStyles = function (styles) {
  const styleArray = styles.split(/\s+/);
  styleArray.forEach((style) => {
    this.applyStyles(style);
  });
};

export function makeStyle(selector, styles) {
  const applyStylesToElement = (element, styles) => {
    const styler = new makeTenoxUI(element);
    styler.applyMultiStyles(styles);
  };

  if (typeof styles === "string") {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.warn(`No elements found with selector: ${selector}`);
      return;
    }
    elements.forEach((element) => applyStylesToElement(element, styles));
  } else if (typeof styles === "object") {
    Object.entries(styles).forEach(([classSelector, classStyles]) => {
      const elements = document.querySelectorAll(classSelector);
      if (elements.length === 0) {
        console.warn(`No elements found with selector: ${classSelector}`);
        return;
      }
      elements.forEach((element) => applyStylesToElement(element, classStyles));
    });
  } else {
    console.warn(
      `Invalid styles format for "${selector}". Make sure you provide style correctly`
    );
  }
}

export function multiProps(propsObject) {
  Object.entries(propsObject).forEach(([propName, propValues]) => {
    if (Array.isArray(propValues)) {
      const propInstance = new newProp(propName, propValues);
      propInstance.tryAdd();
    } else {
      console.warn(
        `Invalid property values for "${propName}". Make sure you provide values as an array.`
      );
    }
  });
}

export function multiStyle(stylesObject) {
  Object.entries(stylesObject).forEach(([selector, styles]) => {
    makeStyle(selector, styles);
  });
}

export default function TenoxUI() {
  AllClasses.forEach((element) => {
    const classes = element.classList;
    const makeTx = new makeTenoxUI(element);
    classes.forEach((className) => {
      makeTx.applyStyles(className);
    });
  });
}

TenoxUI();
