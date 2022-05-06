import React from "./react";
import ReactDom from "./react-dom";

class App extends React.Component {

  handleClick = () => {
    console.log('点击打印');
  }
  render() {
    return (
      <div>hello word class组件
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

// function FunctionComponent () {
//   return <div>hello word12</div>;
// }

// const jsx = (
//   <div className="title" style={{ color: "red" }}>
//     hello <span>word</span>
//   </div>
// );
// console.log(jsx, '==>>>jsx');
// ReactDom.render(jsx, document.getElementById("root"));
ReactDom.render(<App />, document.getElementById("root"));
