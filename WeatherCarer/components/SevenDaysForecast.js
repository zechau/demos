'use strict';

var React = require('react-native'),

{
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
} = React,

ForecastListView = require('./ForecastListView'),
Loading = require('./Loading'),

SevenDaysForecast = React.createClass({
	render: function () {
		var content,
		{loaded, data} = this.props.data;

		if(loaded){
			content = (<ForecastListView data={data} />);
		} else {
			content = (<Loading />);
		}

		return(
			<View style={styles.container}>
	      		{content}
			</View>
		);
	},
}),

styles = StyleSheet.create({
	container: {
	    flex: 1,
  	},
});

module.exports = SevenDaysForecast;