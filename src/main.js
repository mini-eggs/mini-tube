import wigly from "wigly";
import classer from "wigly-class";
import context from "wigly-ctx";
import customizer from "wigly-customizer";
import App from "./app";
import nextTick from "./packages/nextTick";
import anim from "./packages/anim";
import "./main.css";

var ctx = context({ nextTick, anim });
var custom = customizer(sig => ctx(classer(sig)), { applyToChildren: true });
wigly.render(custom(App), document.body);
