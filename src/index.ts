import { VueMouseflowSymbol } from './useApi';

const VueMouseflow = {
  createMfq: function () {
    window._mfq = window._mfq || [];
  },

  addTrackingScript: function (tracking_key) {
    const mf = document.createElement('script');
    mf.type = 'text/javascript';
    mf.async = true;
    mf.src = '//cdn.mouseflow.com/projects/' + tracking_key + '.js';

    document.getElementsByTagName('head')[0].appendChild(mf);
  },

  install: function (app, options) {
    if (!options || !options.tracking_key) {
      throw new Error('No Mouseflow options specified.');
    }

    this.createMfq();
    this.addTrackingScript(options.tracking_key);

    const mf = {
      push: this.push,
      logRouteChange: this.logRouteChange,
    };

    app.config.globalProperties.$mf = mf;

    app.provide(VueMouseflowSymbol, mf);
  },

  push: function (...args) {
    window._mfq.push([...args]);
  },

  logRouteChange: function (to, options) {
    const path =
      (options || {}).includeRouteParams === false
        ? to.matched[to.matched.length - 1].path
        : to.fullPath;

    this.push('newPageView', path);
  },
};

export default VueMouseflow;
