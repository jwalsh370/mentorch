/**
 * Simple redux middleware that executes
 * the `effect` field if provided in an action
 * since this is preceded by the `plugins`
 * middleware. It allows authors to interrupt,
 * defer or add to existing side effects at will
 * as the result of an action being triggered.
 */

export default function effectsMiddleware() {
  return function(next) {
    return function(action) {
      const ret = next(action);
      if (action.effect) {
        action.effect();
        delete action.effect;
      }
      return ret;
    }
  }
};
