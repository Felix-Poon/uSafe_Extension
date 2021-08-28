import { consolidateStreamedStyles } from "styled-components";
import { createWarning } from "./warning-notification";

var elements = document.querySelectorAll('input[type="password"]');
if (elements.length > 0) {
  createWarning('password');
}