import SocialNetworkApp from "./App";
import ReactDOM from "react-dom";
import React from "react";


test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<SocialNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
