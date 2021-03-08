import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 给vue实例增加相应成员
// 在原型上挂载_init方法  该方法在vue实例化时执行 new Vue()
initMixin(Vue)
// 在原型上挂载$data/$props
stateMixin(Vue)
// 添加事件
eventsMixin(Vue)
// _padate/$destroy
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
