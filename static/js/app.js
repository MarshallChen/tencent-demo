var _ = require('lodash');
var React = require('react/addons');
var Canvas = require('react-canvas');
var Scroller = require('scroller');
var TouchEmulator = require('hammer-touchemulator');
var Page = require('./components/Page');
var pages = require('./constants/pages');

var Surface = Canvas.Surface;
var ListView = Canvas.ListView;

var App = React.createClass({
  getInitialState: function() {
    return {
      scrollTop: 0
    }
  },
  componentDidMount: function () {
    TouchEmulator();
    window.addEventListener('resize', this.handleResize, true);
  },
  render: function() {
    var size = this.getSize();
    return (
      <Surface width={size.width} height={size.height} left={0} top={0} enableCSSLayout={true}>
        <ListView
          style={this.getListViewStyle()}
          snapping={true}
          scrollingDeceleration={0.92}
          scrollingPenetrationAcceleration={0.13}
          numberOfItemsGetter={this.getNumberOfItems}
          itemHeightGetter={Page.getItemHeight}
          itemGetter={this.renderItem} />
      </Surface>
    );
  },

  renderItem: function(index, scrollTop) {
    var size = this.getSize();
    var page = pages[index % pages.length];
    var pageScrollTop = index * size.height - scrollTop;
    return <Page
             width={size.width}
             height={size.height}
             page={page}
             itemIndex={index}
             scrollTop={pageScrollTop} />
  },

  getSize: function() {
    return document.getElementById('page').getBoundingClientRect();
  },

  getListViewStyle: function() {
    var size = this.getSize();
    return {
      top: 0,
      left: 0,
      width: size.width,
      height: size.height,
      position: 'relative'
    }
  },

  getNumberOfItems: function() {
    return 2;
  },

  handleResize: function() {
    this.forceUpdate();
  }
});

React.render(<App />, document.getElementById('page'));
