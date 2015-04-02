var React = require('react/addons');

var TEXT_SCROLL_SPEED_MULTIPLIER = 1;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.24;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;

module.exports = {
  computeAnimate: function() {
    var translateY = 0;
    var alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER;
    var alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier;
    alpha = Math.min(Math.max(alpha, 0), 1);
    translateY = this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER;

    return {
      alpha: alpha,
      translateY: translateY
    }
  }
};
