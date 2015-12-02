'use strict';

var
React = require('react-native'),

{
  Image,
  StyleSheet,
  Text,
  View,
} = React,

ForecastListView = require('./ForecastListView'),
Loading = require('./Loading'),

CurrentConditon = React.createClass({
	render: function () {
		var data = this.props.data;
		return(
			<View style={styles.currentConditon}>
				<Image style={styles.conditionIcon} source={{uri: 'http://icons.iconarchive.com/icons/pixelkit/swanky-outlines/256/13-Partly-Cloudy-icon.png'}} />
				<View>
					<Text style={styles.temp}>{data.temp}</Text>
					<View style={styles.more}>
						<Text style={styles.more_item}>PM2.5:{data.extra1}  </Text>
						<Text style={styles.more_item}>湿度:{data.extra2}  </Text>
						<Text style={styles.more_item}>紫外线:{data.extra3}  </Text>
					</View>
				</View>
			</View>
		);
	}
}),

TodayForecast = React.createClass({
	render: function () {
		var content,
		{loaded, todayData, foreCastData} = this.props.data;

		if(loaded){
			content = [<CurrentConditon data={todayData} />, <ForecastListView data={foreCastData} />];
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
  	currentConditon: {
  		flexDirection: 'row',
  		justifyContent: 'center',
    	alignItems: 'center',
		marginBottom: 30,
		marginTop: 30,
		padding: 0,
  	},

	conditionIcon: {
		width: 120,
		height: 120,
	},

	temp: {
		fontSize: 60,
	},

	more: {
		flexDirection: 'row',
	},

	more_item: {
		fontSize: 10,
	},
});

module.exports = TodayForecast;