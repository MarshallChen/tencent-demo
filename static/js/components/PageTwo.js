var _ = require('lodash');
var React = require('react/addons');
var Canvas = require('react-canvas');
var tweenState = require('react-tween-state');
var AnimateMixin = require('./AnimateMixin');

var Group = Canvas.Group;
var Text = Canvas.Text;
var Image = Canvas.Image;

var CONTENT_PADDING = 14;

var PageTwo = React.createClass({

  mixins: [tweenState.Mixin, AnimateMixin],

  getInitialState: function () {
    return {
      crossStarAlpha: 1,
      middleCrossStarAlpha: 1,
      smallCrossStarAlpha: 1
    };
  },

  componentDidMount: function () {
    this.animateCrossStar();
    this.animateMiddleCrossStar();
    this.animateSmallCrossStar();
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

  animateMiddleCrossStar: function() {
    var self = this;
    if (this.isMiddleStarBlinking) return;
    this.tweenState('middleCrossStarAlpha', {
      easing: tweenState.easingTypes.linear,
      duration: 400,
      onEnd: function() { self.isMiddleStarBlinking = false; self.animateMiddleCrossStar(); },
      endValue: this.state.middleCrossStarAlpha === 0 ? 1 : 0
    });
  },

  animateSmallCrossStar: function() {
    var self = this;
    if (this.isSmallStarBlinking) return;
    this.tweenState('smallCrossStarAlpha', {
      easing: tweenState.easingTypes.linear,
      duration: 200,
      onEnd: function() { self.isSmallStarBlinking = false; self.animateSmallCrossStar(); },
      endValue: this.state.smallCrossStarAlpha === 0 ? 1 : 0
    });
  },

  render: function() {
    var self = this;
    var stars = this.props.stars.map(function(star, key) {
      var style = star.type === 'cross'
          ? self.getCrossStarStyle()
          : star.type === 'cross-middle'
          ? self.getCrossMiddleStarStyle()
          : star.type === 'cross-small'
          ? self.getCrossSmallStarStyle()
          : {}
      style = _.extend({}, style, star.style);
      return <Image src={star.url} style={style} key={key} />;
    })
    return (
      <Group style={this.getStyle()}>
        {stars}
        <Group style={this.getImageGroupStyle()}>
          <Image src={this.props.heading} style={this.getHeadingStyle()} />
          <Image src={this.props.hero} style={this.getHeroStyle()} />
          <Image src={this.props.title} style={this.getTitleStyle()} />
        </Group>
        <Group style={this.getGraphGroupStyle()}>
          <Text style={this.getTextStyle()}>{this.props.graph}</Text>
        </Group>
      </Group>
    );
  },
  getStyle: function() {
    return {
      left: 0,
      top: 0,
      width: this.props.width,
      height: this.props.height,
      backgroundColor: '#ffcc73'
    }
  },
  getCrossStarStyle: function() {
    return {
      alpha: this.getTweeningValue('crossStarAlpha')
    }
  },
  getCrossMiddleStarStyle: function() {
    return {
      alpha: this.getTweeningValue('middleCrossStarAlpha')
    }
  },
  getCrossSmallStarStyle: function() {
    return {
      alpha: this.getTweeningValue('smallCrossStarAlpha')
    }
  },
  getImageGroupStyle: function() {
    return {
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      translateY: this.computeAnimate().translateY,
      alpha: this.computeAnimate().alpha
    }
  },
  getHeadingStyle: function() {
    return {
      paddingTop: 10,
      width: 188,
      height: 102,
      flex: 1,
      alignSelf: 'center'
    }
  },
  getHeroStyle: function() {
    return {
      paddingTop: 30,
      width: 241,
      height: 290,
      flex: 1,
      alignSelf: 'center'
    }
  },
  getTitleStyle: function() {
    return {
      paddingTop: 20,
      width: 167,
      height: 76,
      flex: 1,
      alignSelf: 'center'
    }
  },
  getGraphGroupStyle: function() {
    return {
      position: 'relative',
      height: 80,
      width: this.props.width - 2 * CONTENT_PADDING,
      marginTop: 10,
      marginLeft: CONTENT_PADDING,
      marginRight: CONTENT_PADDING,
      flex: 1,
      alignSelf: 'center'
    }
  },
  getTextStyle: function() {
    return {
      height: 80,
      width: this.props.width - 2 * CONTENT_PADDING,
      lineHeight: 30,
      fontSize: 13,
      color: '#79510a',
      zIndex: 3
    }
  }
});

module.exports = PageTwo;
