'use strict';
const datalize = require('datalize-multi-language');
const getLanguage = require('../../index').getLanguage;

/**
 * 验证表单
 * @param {*} rule 规则
 * @param {*} option 配置 type [form|params|query] method [POST|GET|DELETE|PUT]
 */

function validate(rule = [], option = {}) {
  let { method = [], type = 'form' } = option;
  const language = getLanguage() || {};

  return async function(ctx, next) {
    if (ctx.request.query._jump_validate) {
      await next();
      return;
    }

    if (ctx.method === 'GET') {
      type = 'query';
    }

    const middlewareFunc = datalize(rule, {
      autoValidate: true,
      type,
      language,
    });

    if (
      method.length === 0 ||
      (Array.isArray(method) && method.includes(ctx.method))
    ) {
      await middlewareFunc(ctx, next);
      return;
    }

    await next();
  };
}

module.exports = validate;
