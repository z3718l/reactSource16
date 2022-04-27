import React from "./react";
import ReactDom from "./react-dom";

// class App extends Component {
//   render() {
//     return <div>hello word12</div>;
//   }
// }
const jsx = (
  <div className="title" style={{ color: "red" }}>
    hello <span>word</span>
  </div>
);
console.log(jsx, '==>>>jsx');

ReactDom.render(jsx, document.getElementById("root"));
