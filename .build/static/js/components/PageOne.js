var _ = require('lodash');
var React = require('react/addons');
var Canvas = require('react-canvas');
var tweenState = require('react-tween-state');

var Group = Canvas.Group;
var Image = Canvas.Image;
var Text = Canvas.Text;
var Layer = Canvas.Layer;

var TEXT_SCROLL_SPEED_MULTIPLIER = 1;
var TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.24;
var TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;

var PageOne = React.createClass({

  mixins: [tweenState.Mixin],

  propTypes: {
    stars: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      hugeStarAlpha: 1,
      crossStarAlpha: 1,
      smallStarAlpha: 1
    }
  },

  componentDidMount: function () {
    this.animateHugeStar();
    this.animateSmallStar();
    this.animateCrossStar();
  },

  animateHugeStar: function() {
    var self = this;
    if (this.isHugeStarBlinking) return;
    this.isHugeStarBlinking = true;
    this.tweenState('hugeStarAlpha', {
      easing: tweenState.easingTypes.linear,
      duration: 500,
      onEnd: function() { self.isHugeStarBlinking = false; self.animateHugeStar(); },
      endValue: this.state.hugeStarAlpha === 0 ? 1 : 0
    });
  },

  animateSmallStar: function() {
    var self = this;
    if (this.isSmallStarBlinking) return;
    this.isSmallStarBlinking = true;
    this.tweenState('smallStarAlpha', {
      easing: tweenState.easingTypes.linear,
      duration: 300,
      onEnd: function() { self.isSmallStarBlinking = false; self.animateSmallStar(); },
      endValue: this.state.smallStarAlpha === 0 ? 1 : 0
    });
  },

  animateCrossStar: function() {
    var self = this;
    if (this.isCrossStarBlinking) return;
    this.tweenState('crossStarAlpha', {
      easing: tweenState.easingTypes.linear,
      duration: 600,
      onEnd: function() { self.isCrossStarBlinking = false; self.animateCrossStar(); },
      endValue: this.state.crossStarAlpha === 0 ? 1 : 0
    });
  },

  render: function() {
    var self = this;
    var stars = this.props.stars.map(function(star, key) {
      var style = star.type === 'cross'
          ? self.getCrossStarStyle()
          : star.type === 'huge'
          ? self.getHugeStarStyle()
          : star.type === 'small'
          ? self.getSmallStarStyle()
          : {}
      style = _.extend({}, style, star.style);

      return (
        <Image src={star.url} style={style} key={key} />
      );
    });
    return (
      <Group style={this.getStyle()}>
        {stars}
        <Group style={this.getHeroGroupStyle()}>
          <Image src={this.props.hero} style={this.getHeroStyle()} />
        </Group>
        <Text style={this.getTitleStyle()}>{this.props.title}</Text>
      </Group>
    )
  },

  getStyle: function() {
    return {
      position: 'relative',
      display: 'flex',
      width: this.props.width,
      height: this.props.height,
      alignItems: 'center'
    }
  },

  getHeroGroupStyle: function() {
    return {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      left: 0, top: 0,
      flexDirection: 'row',
      alignContent: 'center',
      translateY: this.computeAnimate().translateY,
      alpha: this.computeAnimate().alpha
    }
  },

  getHeroStyle: function() {
    return {
      top: -50,
      width: 300,
      height: 201,
      alignSelf: 'center',
      flex: 1
    }
  },

  getTitleStyle: function() {
    return {
      top: 400,
      width: this.props.width - 90,
      height: 40,
      fontSize: 20,
      lineHeight: 30,
      textAlign: 'center',
      color: '#fff',
      flex: 1,
      alignSelf: 'center',
      translateY: this.computeAnimate().translateY,
      alpha: this.computeAnimate().alpha
    }
  },

  getStarsStyle: function() {
    return {
      left: 0,
      top: 0,
      width: this.props.width,
      height: this.props.height
    }
  },

  getCrossStarStyle: function() {
    return _.extend({}, this.getStarsStyle(), {
      alpha: this.getTweeningValue('crossStarAlpha')
    });
  },

  getHugeStarStyle: function() {
    return _.extend({}, this.getStarsStyle(), {
      alpha: this.getTweeningValue('hugeStarAlpha')
    });
  },

  getSmallStarStyle: function() {
    return _.extend({}, this.getStarsStyle(), {
      alpha: this.getTweeningValue('smallStarAlpha')
    });
  },

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
});

module.exports = PageOne;
