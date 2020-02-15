'use strict';
const datalize = require('datalize-multi-language');
const uuid = require('uuid/v1');

const field = datalize.field;

module.exports = {
  /**
   * 表单验证
   */
  field,

  /**
   * 唯一id
   */
  uuid() {
    return uuid();
  },

  /**
   * 并集 [1, 2, 3] [4, 3, 2] => [1, 2, 3, 4]
   * @param {*} arr1 集合
   * @param {*} arr2 集合
   */
  union(arr1, arr2) {
    const a = new Set([ ...arr1 ]);
    const b = new Set([ ...arr2 ]);
    return Array.from(new Set([ ...a, ...b ]));
  },

  /**
   * 交集 [1, 2, 3] [4, 3, 2] => [2, 3]
   * @param {*} arr1 集合
   * @param {*} arr2 集合
   */
  intersect(arr1, arr2) {
    const a = new Set([ ...arr1 ]);
    const b = new Set([ ...arr2 ]);
    return Array.from(new Set([ ...a ].filter(x => b.has(x))));
  },

  /**
   * 差集 [1, 2, 3] [4, 3, 2] => [1]
   * @param {*} arr1 集合
   * @param {*} arr2 集合
   */
  difference(arr1, arr2) {
    const a = new Set([ ...arr1 ]);
    const b = new Set([ ...arr2 ]);
    return Array.from(new Set([ ...a ].filter(x => !b.has(x))));
  },
};
