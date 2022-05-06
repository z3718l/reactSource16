import { createDom } from './react-dom';

export default class Component {
    constructor(props) {
        // super(props);
        this.props = props;
        this.state = {};
    }
    setState(newState) {
        let state = this.state;
        this.state = {...state, ...newState}
        console.log(newState);
        let newVDom = this.render(); // 重新调render方法，得到虚拟dom
        // 更新类组件
        updateClassComponent(this, newVDom);
    }
}

/**
 * 更新类组件的实例
 * @param {*} classInstance 类组件的实例
 * @param {*} newVDom 新的虚拟dom
 */
 function updateClassComponent(classInstance, newVDom) {
    console.log(classInstance.dom);
    // 拿到老的dom
    let oldDOM = classInstance.dom;
    let newDOM = createDom(newVDom);
    /**
     * parentNode: 得到某个元素的父节点
     * replaceChild: 用一个新项目替换列表中的某个项目：
     * replaceChild方法用新节点替换某个子节点,这个新节点可以是文档中某个已存在的节点，或者您也可创建新的节点。
     */
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    classInstance.dom = newDOM;
}

Component.prototype.isReactComponent = {} // 区分是函数组件还是类组件
