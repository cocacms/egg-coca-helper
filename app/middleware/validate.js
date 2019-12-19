"use strict";
const datalize = require("datalize-multi-language");
const getLanguage = require("../../index").getLanguage;

/**
 * 验证表单
 * @param {*} rule 规则
 * @param {*} option 配置{method, cb, type = form, language}
 */
function validate(rule = [], option = {}) {
  const { method = false, cb = false, type = "form" } = option;
  let language = getLanguage() || {};
  if (option.language) language = option.language;
  const middlewareFunc = datalize(rule, {
    autoValidate: true,
    type,
    language
  });

  return async function(ctx, next) {
    if (!method || (Array.isArray(method) && method.includes(ctx.method))) {
      await middlewareFunc(ctx, async () => {
        if (cb && typeof cb === "function") {
          await cb(ctx, next);
        } else {
          await next();
        }
      });

      return;
    }

    await next();
  };
}

module.exports = validate;
