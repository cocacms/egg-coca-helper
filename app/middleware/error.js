'use strict';
const createError = require('http-errors');
const datalize = require('datalize-multi-language');

module.exports = () => {
  return async function weapp(ctx, next) {
    try {
      await next();
    } catch (error) {
      if (error instanceof createError.HttpError) {
        ctx.status = error.status;
        ctx.body = { message: error.message };
      } else if (error instanceof datalize.Error) {
        ctx.status = 500;
        ctx.body = { message: error.errors[Object.keys(error.errors)[0]][0] };
      } else {
        throw error;
      }
    }
  };
};
