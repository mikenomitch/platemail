import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import "./Link.scss";

export default props => <RouterLink className="link" {...props} />;
