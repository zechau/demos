'use strict';

var
React = require('react-native'),

{
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} = React,

SearchBar = require('./SearchBar'),


Search = React.createClass({

	renderRow: function(city){
		return(
			<TouchableHighlight  
				onPress={() => {this.props.onSelectCity(city)}}
				underlayColor="#DDD">
				<View style={styles.button}>
					<Text style={styles.buttonText}>{city}</Text>
				</View>
			</TouchableHighlight>
		);
	},

	render: function(){
		var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,});
		return (
			<View style={styles.searchContainer}>
	        <SearchBar onSearchChange={this.props.onSearchChange} />
				<ListView
	            	dataSource={dataSource.cloneWithRows(this.props.data)}
	            	renderRow={this.renderRow}/>
        	</View>
		);
	}
}),

styles = StyleSheet.create({
	searchContainer: {
	    flex: 1, 
	    backgroundColor: '#fff',
  },

  button: {
  	justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },

  buttonText: {
  	fontSize: 20,
  }
});

module.exports = Search;