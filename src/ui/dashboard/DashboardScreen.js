import React, { useEffect } from 'react'
import {View, ScrollView, StyleSheet, Text} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'

const DashboardScreen= ({route})=> {

    useEffect(()=> {
        // Fetch data from server
        // const data = await fetch

        // Parse json data to chart pie
        // const {label, percentage}
    })

    const pieSections = [
        {
          name: "תקציב",
          label: "סך כל התקציב",
          percentage: 30,
          color: '#44CD40',
          legendFontColor: '#7F7F7F', legendFontSize: 18
        },
        {
          name: "הכנסות",
          label: "סך הכל הכנסות אחרי תקציב",
          percentage: 70,
          color: '#404FCD',
          legendFontColor: '#7F7F7F', legendFontSize: 18
        }
      ]

      const data = [
        { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
      ]

    return (
        <View style={styles.container}>
            <Text style={styles.header}>תקציב לחודש הנוכחי</Text>
            <View style={styles.chartContainer}>
            <PieChart
                data={pieSections}
                width={400}
                height={220}
                chartConfig={{
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                accessor="percentage"
                backgroundColor="transparent"
                paddingLeft="15"
                />
                    {pieSections.map((item) => 
                        <Text style={{color: item.color, fontSize: 25, marginVertical: 5}}>
                         {item.percentage}% {item.label} 
                        </Text>)}
                {/* </View> */}
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.footer}>יתרת התקציב</Text>
                <Text style={{fontSize: 25}}>₪{route.params.budget}</Text>
            </View>
        </View>
    );
  }

  export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 50
  },
  title: {
    fontSize: 24,
    margin: 10
  },
  header: {
      fontSize: 45
  },
  footer: {
    fontSize: 30,
    color: '#6020f0'
  }
  });