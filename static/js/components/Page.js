var React = require('react/addons');
var Canvas = require('react-canvas');
var tweenState = require('react-tween-state');

var PageOne = require('./PageOne');
var PageTwo = require('./PageTwo');
var PageThree = require('./PageThree');
var PageFour = require('./PageFour');

var Group = Canvas.Group;
var Image = Canvas.Image;
var Text = Canvas.Text;

var Page = React.createClass({

  mixins: [tweenState.Mixin],

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    page: React.PropTypes.object.isRequired,
    itemIndex: React.PropTypes.number.isRequired,
    scrollTop: React.PropTypes.number.isRequired
  },

  statics: {
    getItemHeight: function() {
      return window.innerHeight;
    }
  },

  getInitialState: function() {
    return {
      triangleTranslate: 10
    }
  },

  componentDidMount: function () {
    this.animation();
  },

  animation: function() {
    var self = this;
    if (this.isRunning) return;
    this.isRunning = true;
    this.tweenState('triangleTranslate', {
      easing: tweenState.easingTypes.linear,
      duration: 500,
      onEnd: function() { self.isRunning = false; self.animation(); },
      endValue: this.state.triangleTranslate === 10 ? 0 : 10
    });
  },

  render: function() {
    var self = this;
    var page = (function() {
      switch (self.props.itemIndex) {
        case 0:
          return <PageOne
                  scrollTop={self.props.scrollTop}
                  width={self.props.width}
                  height={self.props.height}
                  title={self.props.page.title}
                  stars={self.props.page.stars}
                  hero={self.props.page.hero} />;
          break;
        case 1:
          return <PageTwo
                  scrollTop={self.props.scrollTop}
                  width={self.props.width}
                  height={self.props.height}
                  stars={self.props.page.stars}
                  graph={self.props.page.graph}
                  graphBg={self.props.page.graphBg}
                  heading={self.props.page.heading}
                  hero={self.props.page.hero}
                  title={self.props.page.title} />;
          break;
        default: // do nothing
      }
    }());
    return (
      <Group style={this.getStyle()}>
        {page}
        <Group style={this.getTriangleGroupStyle()}>
          <Image src={this.props.page.triangle} style={this.getTriangleStyle()} />
        </Group>
      </Group>
    );
  },

  getStyle: function() {
    return {
      width: this.props.width,
      height: this.props.height,
      overflow: 'hidden'
    }
  },

  getTriangleGroupStyle: function() {
    return {
      position: 'absolute',
      display: 'flex',
      width: this.props.width,
      height: this.props.height,
      left: 0,
      top: 0,
      flexDirection: 'row',
    }
  },

  getTriangleStyle: function() {
    return {
      top: 130,
      width: 35,
      height: 21,
      translateY: this.getTweeningValue('triangleTranslate'),
      alignSelf: 'center',
      flex: 1
    }
  },

  getTitleStyle: function() {
    return {
      top: 32,
      left: 80,
      width: this.props.width - 90,
      height: 40,
      fontSize: 20,
      lineHeight: 30,
      color: '#333'
    }
  }
});

module.exports = Page;
