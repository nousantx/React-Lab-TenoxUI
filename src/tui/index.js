/*!
 *
 * TenoxUI CSS Framework v0.2.0
 *
 * copyright (c) 2023 NOuSantx
 *
 * license: https://github.com/nousantx/tenoxui/blob/main/LICENSE
 *
 */
import property from "./property.js";
let Classes = Object.keys(property).map((e) => `[class*="${e}-"]`);
let AllClasses = document.querySelectorAll(Classes.join(", "));
function newProp(e, t) {
  if (typeof e !== "string" || !Array.isArray(t)) {
    console.warn(
      "Invalid arguments for newProp. Please provide a string for name and an array for values."
    );
    return;
  }
  this[e] = t;
  Classes.push(`[class*="${e}-"]`);
  AllClasses = document.querySelectorAll(Classes.join(", "));
}
newProp.prototype.tryAdd = function () {
  if (!this || Object.keys(this).length === 0) {
    console.warn("Invalid newProp instance:", this);
    return;
  }
  Object.assign(property, this);
};
export function MakeProp(e, t) {
  if (typeof e !== "string") {
    throw new Error("Types must be a string");
  }
  if (!Array.isArray(t)) {
    throw new Error("Property must be an array");
  }
  new newProp(e, t).tryAdd();
}
function makeTenoxUI(e) {
  this.element = e;
  this.styles = property;
}
makeTenoxUI.prototype.applyStyle = function (e, t, o) {
  const s = this.styles[e];
  if (s) {
    s.forEach((s) => {
      if (s === "filter") {
        const r = this.element.style[s];
        this.element.style[s] = r ? `${r} ${e}(${t}${o})` : `${e}(${t}${o})`;
      } else if (s === "flex") {
        this.element.style[s] = `1 1 ${t}${o}`;
      } else if (
        s === "gridRow" ||
        s === "gridColumn" ||
        s === "gridRowStart" ||
        s === "gridColumnStart" ||
        s === "gridRowEnd" ||
        s === "gridColumnEnd"
      ) {
        this.element.style[s] = `span ${t}${o}`;
      } else if (e === "grid-row" || e === "grid-col") {
        this.element.style[s] = `repeat(${t}${o}, 1fr))`;
      } else if (e === "auto-grid-row" || e === "auto-grid-col") {
        this.element.style[s] = `repeat(auto-fit, minmax(${t}${o}, 1fr))`;
      } else if (t.startsWith("[") && t.endsWith("]")) {
        const e = t.slice(1, -1);
        this.element.style[s] = `var(--${e})`;
      } else {
        this.element.style[s] = `${t}${o}`;
      }
    });
  }
};
makeTenoxUI.prototype.applyStyles = function (e) {
  const t = e.match(
    /([a-zA-Z]+(?:-[a-zA-Z]+)*)-(-?(?:\d+(\.\d+)?)|(?:[a-zA-Z]+(?:-[a-zA-Z]+)*(?:-[a-zA-Z]+)*)|(?:\[[^\]]+\]))([a-zA-Z%]*)/
  );
  if (t) {
    const e = t[1];
    const o = t[2];
    const s = t[4];
    this.applyStyle(e, o, s);
  }
};
makeTenoxUI.prototype.applyMultiStyles = function (e) {
  const t = e.split(/\s+/);
  t.forEach((e) => {
    this.applyStyles(e);
  });
};
export function MakeStyles(e, t) {
  const o = document.querySelectorAll(e);
  if (o.length === 0) {
    console.warn(`No elements found with class: ${e}`);
    return;
  }
  o.forEach((e) => {
    const o = new makeTenoxUI(e);
    o.applyMultiStyles(t);
  });
}
export default function TenoxUI() {
  AllClasses.forEach((e) => {
    const t = e.classList;
    const o = new makeTenoxUI(e);
    t.forEach((e) => {
      o.applyStyles(e);
    });
  });
}
TenoxUI();
const makeColor = (e, t, o, s) => {
  const r = e.className.match(t);
  if (r) {
    e.style[o] = s(r);
  }
};
const ColorClass = document.querySelectorAll(
  '[class*="bg-"], [class*="tc-"], [class*="border-"]'
);
const colorTypes = { bg: "background", tc: "color", border: "borderColor" };
const colorFormats = {
  rgb: (e) => `rgb(${e.slice(1, 4).join(",")})`,
  rgba: (e) => `rgba(${e.slice(1, 5).join(",")})`,
  hex: (e) => `#${e[1]}`,
};
ColorClass.forEach((e) => {
  for (const t in colorTypes) {
    for (const o in colorFormats) {
      const s = new RegExp(`${t}-${o}\\(([^)]+)\\)`);
      makeColor(e, s, colorTypes[t], colorFormats[o]);
    }
    const o = new RegExp(`${t}-([0-9a-fA-F]{3,6})`);
    makeColor(e, o, colorTypes[t], colorFormats["hex"]);
  }
});
