'use strict';

var
React = require('react-native'),

{
  StyleSheet,
  Text,
} = React,

Loading = React.createClass({
	render: function () {
		return (
			<Text style={styles.loading}>Loading...</Text>
		)
	}
}),

styles = StyleSheet.create({
	loading: {
		textAlign: 'center',
	}
});

module.exports = Loading;