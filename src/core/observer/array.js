/*
 * @Date: 2021-02-25 16:22:56
 * @FilePath: /vue/src/core/observer/array.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-03-04 17:56:53
 * @Description: 
 */
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 函数体内，优先调用数组原方法
    const result = original.apply(this, args)
    const ob = this.__ob__  //为了获取数组实例dep
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 将新增的元素变为响应式
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
