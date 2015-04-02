var React = require('react/addons');
var Canvas = require('react-canvas');

var Group = Canvas.Group;
var Text = Canvas.Text;

var PageThree = React.createClass({
  render: function() {
    return (
      <Group style={this.getStyle()}>
        <Text style={this.getTextStyle()}>Hello</Text>
      </Group>
    );
  },
  getStyle: function() {
    return {
      width: this.props.width,
      height: this.props.height
    }
  },
  getTextStyle: function() {
    return {
      height: 40,
      lineHeight: 40,
      fontSize: 20,
      color: '#333'
    }
  }
});

module.exports = PageThree;
