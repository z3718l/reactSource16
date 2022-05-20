import React from "react";
import ReactDom from "react-dom";

/**
 * 合成事件和批量更新
 * 1. 在react里面，事件的更新可能是异步的，是批量的，不是同步的
 *  调用setState之后状态并没有立刻更新，而是先缓存起来，
 *  等事件函数处理完成之后，再进行批量更新，一次更新并重新渲染。
 *  原因：如果我们一个函数触发多个setState，第一次set1 第二次set2 第三次又set1，这样就会造成没必要的render
 *  因为只要调用setState就会进行render
 *
 *
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 0, name: 'zl'}
  }

  handleClick = () => {
    this.setState({num: this.state.num + 1});
    console.log(this.state.num);
    this.setState({num: this.state.num + 1});
    console.log(this.state.num);
    setTimeout(() => {
      this.setState({num: this.state.num + 1});
      console.log(this.state.num);
      this.setState({num: this.state.num + 1});
      console.log(this.state.num);
    },100)
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
