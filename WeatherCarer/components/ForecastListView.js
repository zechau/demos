'use strict';

var React = require('react-native'),

{
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
} = React,

ForcastListView = React.createClass({
	renderRow: function(forcast){
		return(<View style={styles.row}>
			<Text style={styles.info}>{forcast.date}</Text>
	        <Image
	          source={{uri: 'http://icons.iconarchive.com/icons/pixelkit/swanky-outlines/96/13-Partly-Cloudy-icon.png'}}
	          style={styles.thumbnail}
	        />
	        <Text style={styles.info}>{forcast.temp}</Text>
	      	<Text style={styles.info}>{forcast.extra1}</Text>
			<Text style={styles.info}>{forcast.extra2}</Text>
			<Text style={styles.info}>{forcast.extra3}</Text>
	  	</View>);
	},

	render: function(){
		var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,});
		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.info}></Text>
					<View style={styles.thumbnail}></View>
			        <Text style={styles.info}>温度</Text>
		          	<Text style={styles.info}>PM2.5</Text>
					<Text style={styles.info}>湿度</Text>
					<Text style={styles.info}>紫外线</Text>
		      	</View>
				<ListView
	            	dataSource={dataSource.cloneWithRows(this.props.data)}
	            	renderRow={this.renderRow}/>
        	</View>
		);
	}
}),

styles = StyleSheet.create({
	container: {
	    flex: 1,
  	},

	row: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#F5FCFF',
	    marginTop: 10,
	    marginBottom: 10,
	},
	thumbnail: {
		width: 30,
		height: 30,
	},

	info:{
		flex: 1,
		fontSize: 13,
		textAlign: 'center',
	}
});

module.exports = ForcastListView;