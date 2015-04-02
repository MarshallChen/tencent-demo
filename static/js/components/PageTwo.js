var React = require('react/addons');
var Canvas = require('react-canvas');

var Group = Canvas.Group;
var Text = Canvas.Text;
var Image = Canvas.Image;

var PageTwo = React.createClass({
  render: function() {
    return (
      <Group style={this.getStyle()}>
        <Group style={this.getImageGroupStyle()}>
          <Image src={this.props.heading} style={this.getHeadingStyle()} />
          <Image src={this.props.hero} style={this.getHeroStyle()} />
          <Image src={this.props.title} style={this.getTitleStyle()} />
        </Group>
        <Text style={this.getTextStyle()}>{this.props.graph}</Text>
      </Group>
    );
  },
  getStyle: function() {
    return {
      left: 0,
      top: 0,
      width: this.props.width,
      height: this.props.height,
    }
  },
  getImageGroupStyle: function() {
    return {
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  getHeadingStyle: function() {
    return {
      top: 10,
      width: 188,
      height: 92,
      flex: 1,
      alignSelf: 'center'
    }
  },
  getHeroStyle: function() {
    return {
      top: 30,
      width: 241,
      height: 260,
      flex: 1,
      alignSelf: 'center'
    }
  },
  getTitleStyle: function() {
    return {
      top: 20,
      width: 167,
      height: 56,
      flex: 1,
      alignSelf: 'center'
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

module.exports = PageTwo;
