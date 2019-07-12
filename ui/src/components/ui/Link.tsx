import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import "./Link.scss";

function Link(props) {
  return <RouterLink className="link" {...props} />;
}

export default Link;
