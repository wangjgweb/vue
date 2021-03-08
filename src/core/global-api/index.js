/*
 * @Date: 2021-02-25 16:22:56
 * @FilePath: /vue/src/core/global-api/index.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-03-03 16:00:20
 * @Description: 
 */
/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  // 如果是在开发版本，且修改了config的指向，会有警告提示
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  // 在vue上挂载静态方法，与Vue原型上的set是同一个方法
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
  // 初始化vue options
  Vue.options = Object.create(null)

  // vue.options.componets, options.directive, options.filters
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 将keep-alive组件添加到Vue.options.components内
  extend(Vue.options.components, builtInComponents)
  //初始化use方法
  initUse(Vue)
  // 初始化混入
  initMixin(Vue)
  // 初始化extend
  initExtend(Vue)
  // 将组件、指令、过滤器等静态方法挂载到Vue上，调用该方法，可将其添加到Vue.options.components对应的数组内
  initAssetRegisters(Vue)
}
