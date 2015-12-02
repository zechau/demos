'use strict';

var MOCK_DATA = {
  location: '厦门',
  cityList:[
    '厦门',
    '深圳',
  ],

  foreCastData: {
    '厦门': {
      todayForecast: {
        todayData: {temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
        foreCastData: [
          {date: '13:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '16:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '19:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '22:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '1:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
        ],
      },

      sevenDaysForecast: [
          {date: '12/01', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/02', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/03', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/04', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/05', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/06', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
      ],
    },

    '深圳': {
      todayForecast: {
        todayData: {temp: '15°C', extra1: 15, extra2: 14, extra3: 13},
        foreCastData: [
          {date: '00:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '03:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '06:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '09:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12:00', temp: '10°C', extra1: 10, extra2: 9, extra3: 8},
        ],
      },

      sevenDaysForecast: [
          {date: '12/01', temp: '11°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/02', temp: '12°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/03', temp: '11°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/04', temp: '13°C', extra1: 10, extra2: 9, extra3: 8},
          {date: '12/05', temp: '15°C', extra1: 10, extra2: 9, extra3: 8},
      ],
    },

  }
};

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableWithoutFeedback,
  ViewPagerAndroid,
} = React;
var DrawerLayoutAndroid = require('DrawerLayoutAndroid');
var ToolbarAndroid = require('ToolbarAndroid');
var Search = require('./Search');
var TodayForecast = require('./TodayForecast');
var SevenDaysForecast = require('./SevenDaysForecast');

var TabButton = React.createClass({

  onPress: function(){
    !this.props.active && this.props.onPress && this.props.onPress();
  },

  render: function(){
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}>
        <View style={[styles.tabButton, this.props.active ? styles.activeTab : {}]}>
          <Text style={styles.tabText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

var Tabs = React.createClass({
  render: function() {
    var {left, right, onPressLeft, onPressRight} = this.props;
    return (
      <View style={styles.tabContainer}>
        <Text>{this.props.city}   </Text>
        <TabButton onPress={onPressLeft} active={left} text="今日" />
        <TabButton onPress={onPressRight} active={right} text="七日" />
      </View>
    );
  },

});

var Layout = React.createClass({
  getInitialState: function() {
    return {
      city: MOCK_DATA.location,
      cityList: MOCK_DATA.cityList,
      activeTab: {
        left: true,
        right: false,
      },

      todayForecast: {
        loaded: false,
        todayData: {},
        foreCastData: [],
      },

      sevenDaysForecast: {
        data: [],
        loaded: false,
      }
    }
  },

  componentDidMount: function() {
    this.fetchTodayData(this.state.city);
    this.fetchForecastData(this.state.city);
  },

  fetchTodayData: function(text) {
    this.setState({
      todayForecast: {...MOCK_DATA.foreCastData[text].todayForecast, loaded: true},
    });
  },

  fetchForecastData: function(text){
    this.setState({
      sevenDaysForecast: {
        data: MOCK_DATA.foreCastData[text].sevenDaysForecast,
        loaded: true,
      }
    });
  },

  onSearchChange: function(text){
    this.setState({
      cityList: text !== "" ? 
      MOCK_DATA.cityList.filter(function(city){
        return city.indexOf(text) !== -1;
      }) :
      MOCK_DATA.cityList
    })
  },

  onSelectCity: function(text){
    this.setState({
      todayForecast: {
        loaded: false,
      },

      sevenDaysForecast: {
        loaded: false,
      },

      city: text,
    });

    this.fetchTodayData(text);
    this.fetchForecastData(text);
  },

  onPressLeft: function(){
    var position = 0;
    this.viewPager.setPage(position);
    this.updateTabState(position);
  },

  onPressRight: function(){
    var position = 1;
    this.viewPager.setPage(position);
    this.updateTabState(position);
  },

  onPageSelected: function(e) {
    var position = e.nativeEvent.position;
    this.updateTabState(position);
  },

  updateTabState: function(position){
    this.setState({
      activeTab: {
        left: position === 0 ? true : false,
        right: position === 0 ? false : true,
      }
    });
  },

  render: function() {
    var navigationView = (
      <Search onSearchChange={this.onSearchChange} onSelectCity={this.onSelectCity} data={this.state.cityList} />
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>

        <View style={styles.wraper}>
          <ToolbarAndroid style={styles.toolbar}>
            <Tabs
              city={this.state.city}
              onPressLeft={this.onPressLeft}
              onPressRight={this.onPressRight}
              left={this.state.activeTab.left}
              right={this.state.activeTab.right}
              setPage={(index) => {this.viewPager.setPage(index)}} />

          </ToolbarAndroid>

          <ViewPagerAndroid
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={this.onPageSelected}
            ref={viewPager => { this.viewPager = viewPager; }}>

            <View>
              <TodayForecast data={this.state.todayForecast} />
            </View>

            <View>
              <SevenDaysForecast data={this.state.sevenDaysForecast} />
            </View>

          </ViewPagerAndroid>
        </View>
      </DrawerLayoutAndroid>
    );

  },
});

var styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  toolbar: {
    height: 50,
  },

  tabContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  tabButton: {
    padding: 8,
    height: 30,
    width: 60,
    justifyContent: 'center',
  },

  activeTab: {
    backgroundColor: '#CCCCCC',
  },

  tabText: {
    textAlign: "center",
  },

  viewPager: {
    flex: 1,
  },

});

module.exports =  Layout;