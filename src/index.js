import React from "./react";
import ReactDom from "./react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 1, name: 'zl'}
  }

  handleClick = () => {
    this.setState({num: this.state.num + 1});
  }
  render() {
    return (
      <div>
        <p>hello word class组件</p>
        <p>{this.state.num}</p>
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
