/**
 * 1、先把虚拟dom转成真实dom，
 * 2、在将真实dom插入到container容器中
 * @param {*} vDom
 * @param {*} container
 */
function render(vDom, container) {
  //   console.log(vDom);
  // 原生组件的渲染
  let dom = createDom(vDom);
  // 容器.appendChild(dom元素);
  container.appendChild(dom);
}

/**
 * 将虚拟dom转换为真实dom
 * @param {*} vDOM 虚拟dom
 */
function createDom(vDom) {
  // 如果vDom是string或者是number，直接返回一个真实的文本节点
  if (typeof vDom === "string" || typeof vDom === "number") {
    return document.createTextNode(vDom);
  }
  // 否则就是一个虚拟DOM
  let {
    type,
    props
  } = vDom;
  let dom;
  // let dom = document.createElement(type);
  // 处理dom
  if (typeof type === 'function') {
    // console.log(type.prototype.isReactComponent);
    if (type.prototype.isReactComponent) {
      // 类组件
      return mountClassComponent(vDom);
    } else {
      return mountFunctionComponent(vDom);
    }
  } else {
    // 原生组件
    dom = document.createElement(type);
  }
  // 更新属性
  updateProps(dom, props);
  //   单独处理children
  // console.log(props);ß
  if (
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    // textContent 属性表示一个节点及其后代的文本内容。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent
    dom.textContent = props.children;
  } else if (typeof props.children === "object" && props.children.type) {
    //   递归调render方法
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    console.log(props.children);
    reconcileChildren(props.children, dom);
  }
  return dom;
}

/**
 * 把一个类型为自定义的函数组件的虚拟dom转换成真实dom 并返回
 * @param {*} vDOM 类型定义为函数组件的虚拟dom
 */
function mountFunctionComponent(vDOM) {
  const {
    type,
    props
  } = vDOM;
  // 接受一个dom
  /**
   * 1、把函数执行一下，得到自定义函数组件的虚拟dom
   * 2、重新将虚拟dom转换成真实dom
   */
  let renderDom = type(props);
  return createDom(renderDom);
}

/**
 * 1、创建类组件的实例
 * 2、调用类组件实例的render方法获得返回的虚拟dom
 * 3、把返回的虚拟dom转换成真实dom进行挂载
 * @param {*} vDOM 类型为类组件的虚拟dom
 */
function mountClassComponent(vDOM) {
  // 解构类组件中的属性
  const {
    type,
    props
  } = vDOM;
  // 创建类的实例
  let classInstance = new type(props);
  // 调用实例的render方法返回要渲染的虚拟dom对象
  let renderDom = classInstance.render();
  // 根据虚拟dom对象创建真实的dom对象
  let dom = createDom(renderDom);
  // classInstance.dom = dom; // 为了后面dom比较用
  // 返回dom
  return dom;
}

function reconcileChildren(childrenVDom, parentDom) {
  for (let index = 0; index < childrenVDom.length; index++) {
    // const element = array[index];
    let childVDom = childrenVDom[index];
    render(childVDom, parentDom);
  }
}

/**
 * 更新元素上的属性
 * @param {*} dom
 * @param {*} newProps
 */
function updateProps(dom, newProps) {
  // console.log(dom);
  // 使用for...in 遍历对象
  for (let key in newProps) {
    if (key === "children") continue;
    // console.log(key);
    // 将style属性挂载到dom上
    if (key === "style") {
      let styleObj = newProps.style;
      /**
       * 循环遍历style
       * {color: 'red'}
       */
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      // 原生js给dom添加事件
      // dom.onclick = function (){};
      let handleEvent = key.toLowerCase();
      dom[handleEvent] = newProps[key];
    } else {
      // 将className属性挂载到dom上
      /**
       * 这里注意：其实className是原始js的属性方法
       * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/className
       * className 获取或设置指定元素的class属性的值。
       * 这个并不是react独创的，但是使用className还有一个好处，就是避免和class关键字重复
       */
      dom[key] = newProps[key];
    }
  }
}

const ReactDom = {
  render,
};

export default ReactDom;