import { createStore } from "redux";
import { enthusiasm } from "../reducers/enthusiasm";

const storeMaker = () => {
  return createStore(enthusiasm, {
    enthusiasmLevel: 1,
    name: "Mike"
  });
};

export default storeMaker;
