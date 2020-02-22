'use strict';
const datalize = require('datalize-multi-language');

/**
 * 验证表单
 * @param {*} rule 规则
 * @param {*} option 配置 type [form|params|query] method [POST|GET|DELETE|PUT]
 */

function validate(rule = [], option = {}) {
  const { method = [] } = option;
  return datalize(rule, {
    autoValidate: true,
    autoType: true,
    skip: async ctx => {
      if (ctx.request.query._jump_validate) {
        return true;
      }
      if (
        method.length === 0 ||
        (Array.isArray(method) && method.includes(ctx.method))
      ) {
        return false;
      }
      return true;
    },
    language: (ctx, type, args) => {
      return ctx.__(type, args);
    },
  });
}

module.exports = validate;
