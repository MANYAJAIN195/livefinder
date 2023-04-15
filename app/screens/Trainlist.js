import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet, } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Screen from '../components/Screen'
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'
import tailwind from 'tailwind-react-native-classnames'
import { setDestination, setOrigin } from '../redux/slices/navSlice'
import {RAILWAY_APIKEY, RAILWAY_HOST_APIKEY} from "@env";
import { selectDestination, selectOrigin } from '../redux/slices/navSlice'
import { useDispatch, useSelector } from 'react-redux'

const Trainlist = ({ route }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {data} = route.params;
    const source=data.source;
    const desti=data.destination;
    const [trainData, setTrainData] = useState([]);

    useEffect(() => {
        getStationOrigin()
        getStationDest()
    }, [source, desti, RAILWAY_APIKEY, RAILWAY_HOST_APIKEY])
    useEffect(() => {
        const timer = setTimeout(() => {
          console.log('This will run after 1 second!')
          listTrain()
        }, 3000);
        return () => clearTimeout(timer);
      }, []);
    
    const getStationOrigin = async () => {
        const URL1 = `https://irctc1.p.rapidapi.com/api/v1/searchStation?query=${source}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAILWAY_APIKEY,
            'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
          },
        };
      
        try {
          const response1 = await fetch(URL1, options);
          const datao = await response1.json();
          console.log(datao.data[0].code);
          dispatch(setOrigin(datao.data[0].code))
        } catch (error) {
          console.error(error);
        }
      };
      const getStationDest = async () => {
        const URL = `https://irctc1.p.rapidapi.com/api/v1/searchStation?query=${desti}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAILWAY_APIKEY,
            'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
          },
        };
      
        try {
          const response = await fetch(URL, options);
          const dataa = await response.json();
          console.log(dataa.data[0].code);
          dispatch(setDestination(dataa.data[0].code))
        } catch (error) {
          console.error(error);
        }
      };  
      
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    
    const listTrain = async () => {
        //const URL = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${origin}&toStationCode=${destination}&dateOfJourney=${data.date}`;
        const URL = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=NDLS&toStationCode=NZM&dateOfJourney=${data.date}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAILWAY_APIKEY,
            'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
          },
        };
      
        try {
          const response = await fetch(URL, options);
          const datad = await response.json();
          const trains = datad.data;
          setTrainData(trains);
          // for (let i = 0; i < trains.length; i++) {
          //   const train = trains[i];
          //   const trainName = train.train_name;
          //   const trainNumber = train.train_number;
          //   const fromStation = train.from_sta;
          //   console.log(trainName, trainNumber, fromStation);
          // }
        } catch (error) {
          console.error(error);
        }
      };
      const renderItem = ({ item }) => {
        return (
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.push('TrainSuccess', { data: {trainNo: item.train_number}})}>
            
            <Text style={styles.trainName}>{item.train_name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.fromStation}>{item.from_sta}</Text>
            <Text style={styles.trainNumber}>{item.train_number}</Text>
            </View>
          </TouchableOpacity>
        );
      };


    return (
        <Screen style={tw`bg-white h-full justify-center`}>
            <TouchableOpacity
                style={[tailwind`bg-white p-3 rounded-full shadow-lg`, { top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={() => navigation.push('Home')}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                // style={}
                />
            </TouchableOpacity>
            <View style={tw`p-5 text-center self-center`}>
            <Text style={tailwind`text-center pb-5 text-xl font-bold`}>Select your Train!</Text>
                    {/* <Text style={tw`text-base text-center`}>{source}</Text>
                    <Text style={tw`text-base text-center`}>{desti}</Text>
                    <Text style={tw`text-base text-center`}>{data?.date}</Text> */}
                    {/* <Text style={tw`text-base text-center`}>{origin}</Text>
                    <Text style={tw`text-base text-center`}>{destination}</Text> */}
                    {/* <Text style={tw`text-base text-center`}>{RAILWAY_APIKEY}</Text>
                    <Text style={tw`text-base text-center`}>{RAILWAY_HOST_APIKEY}</Text> */}
                    
            </View>
            <View style={styles.container}>
              <FlatList
                data={trainData}
                renderItem={renderItem}
                keyExtractor={item => item.train_number}
              />
            </View>
        </Screen>
    )
}

export default Trainlist
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  itemContainer: {
    backgroundColor: 'pink',
    borderRadius: 5,
    
    padding: 10,
    marginVertical: 5,
  },
  trainName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  trainNumber: {
    color: 'red',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 18,
  },
  fromStation: {
    color: 'red',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
  },
});