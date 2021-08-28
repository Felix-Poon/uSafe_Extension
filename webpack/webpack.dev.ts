import merge from "webpack-merge";
import common from "./webpack.common";

export default merge(common, {
  devtool: "inline-source-map",
  mode: "development",
});
