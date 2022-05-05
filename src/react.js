import Component from './Component'
/**
 * 将元素节点转换成虚拟dom
 * 在react项目中，如果我们写了jsx的语法，会自动调用createElement方法，将我们的jsx转换成虚拟dom
 * @param {*} type
 * @param {*} config
 * @param {*} children
 * @returns
 */
function createElement(type, config, children) {
  let props = { ...config };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  return { type, props };
}

const React = {
  createElement,
  Component
};

export default React;
