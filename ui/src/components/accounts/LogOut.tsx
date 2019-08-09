import * as React from "react";
import { withRouter } from "react-router-dom";

import Button from "../ui/Button";
import withAuthActions, { IWithAuthActions } from "../util/withAuthActions";

interface IProps extends IWithAuthActions {
  history: any;
}

function LogOut({ logOut, history }: IProps) {
  const onLogOut = () => {
    logOut();
    history.push("/hello");
  };

  return (
    <div>
      <h1> Do you want to logout? </h1>
      <div>
        <Button onClick={onLogOut}> Leave this place </Button>
      </div>
    </div>
  );
}

export default withRouter(withAuthActions(LogOut));
