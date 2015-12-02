'use strict';

var React = require('react-native');
var {
  Image,
  Platform,
  ProgressBarAndroid,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} = React;

var IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

var SearchBar = React.createClass({
  render: function() {
    var background = IS_RIPPLE_EFFECT_SUPPORTED ?
      TouchableNativeFeedback.SelectableBackgroundBorderless() :
      TouchableNativeFeedback.SelectableBackground();
    return (
      <View style={styles.searchBar}>
        <TouchableNativeFeedback
              background={background}
              onPress={() => this.refs.input && this.refs.input.focus()}>
            <View>
              <Image
                source={{uri: 'https://raw.githubusercontent.com/facebook/react-native/master/Examples/Movies/android/app/src/main/res/drawable-xhdpi/android_search_white.png'}}
                style={styles.icon}
              />
            </View>
        </TouchableNativeFeedback>
        <TextInput
          ref="input"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          onChangeText={this.props.onSearchChange}
          placeholder="Search a city..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.searchBarInput}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    height: 50,
    padding: 0,
    paddingLeft: 10
  },
  spinner: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});

module.exports = SearchBar;