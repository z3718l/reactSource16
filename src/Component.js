export default function Component (props) {
    this.props = props; // 将props赋值给实例上的props
}

Component.prototype.isReactComponent = {} // 区分是函数组件还是类组件
