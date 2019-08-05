import * as React from "react";
import "./Landing.scss";

import Card from "../ui/Card";

export default () => (
  <div>
    <div className="headers">
      <h1>The Page Title</h1>
      <h3>Subtitle for the Page. Goes Here.</h3>
    </div>

    <div className="features">
      <Card clickable={true}>Here is some content.</Card>
      <Card clickable={true}>And here is some different content.</Card>
      <Card clickable={true}>Even more content in this one. Wow.</Card>
    </div>
  </div>
);
