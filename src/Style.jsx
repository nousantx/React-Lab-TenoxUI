import { useLayoutEffect } from "react";
import tenoxui, {
  moreColor,
  // makeStyle,
  makeStyles,
  // addType,
  defineProps,
} from "./tui/tui";

const Styler = () => {
  useLayoutEffect(() => {
    // Make your custom property and type
    defineProps({
      dis: ["display"],
      "fx-par": ["alignItems", "justifyContent"],
      td: ["textDecoration"],
      "list-style": ["listStyle"],
    });

    // Give Styles directly through className
    makeStyles({
      ".wrapper": "p-2rem",
      ".w-full, .w-mx": "w-100%",
      ".h-full, .h-mx": "h-100%",
      ".fx-ctr": "display-flex flex-parent-center",
      "h1.logo": "fs-1rem",
      //   Nav Style
      "nav a": "td-none tc-black fw-500",
      "nav ul>*": "list-style-none",
    });

    // Apply TenoxUI and More Color function
    moreColor();
    tenoxui();
  }, []);
};

export default Styler;
