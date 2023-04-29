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
        //getStationOrigin()
        //getStationDest()
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
      
   /// const origin = useSelector(selectOrigin)
    //const destination = useSelector(selectDestination)
    
    const listTrain = async () => {
        //const URL = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${origin}&toStationCode=${destination}&dateOfJourney=${data.date}`;
        //const URL = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=NDLS&toStationCode=NZM&dateOfJourney=${data.date}`;
        //const options = {
          //method: 'GET',
          //headers: {
            //'X-RapidAPI-Key': RAILWAY_APIKEY,
            //'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
          //},
        //};
      
        try {
          //const response = await fetch(URL, options);
          //const datad = await response.json();
          const datad={"data": [{"class_type": [Array], "d_day": 0, "duration": "0:14", "from": "NDLS", "from_day": 0, "from_sta": "00:15", "from_station_name": "NEW DELHI", "from_std": "00:15", "local_train_from_sta": 15, "run_days": [Array], "special_train": true, "special_valid_to": "2099-06-30", "to": "NZM", "to_day": 0, "to_sta": "00:29", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "00:30", "train_date": "16-04-2023", "train_dstn": "PWL", "train_name": "NEW DELHI - PALWAL Express Special (UnReserved)", "train_number": "04440", "train_src": "NDLS", "train_type": "PASS"}, {"class_type": [Array], "d_day": 0, "duration": "0:11", "from": "NDLS", "from_day": 0, "from_sta": "06:55", "from_station_name": "NEW DELHI", "from_std": "06:55", "local_train_from_sta": 415, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "07:06", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "07:08", "train_date": "16-04-2023", "train_dstn": "VGLJ", "train_name": "NEW DELHI - VIRANGANA LAKSHMIBAI JHANSI Taj SF Express", "train_number": "12280", "train_src": "NDLS", "train_type": "SUF"}, {"class_type": [Array], "d_day": 1, "duration": "0:11", "from": "NDLS", "from_day": 1, "from_sta": "07:50", "from_station_name": "NEW DELHI", "from_std": "08:15", "local_train_from_sta": 1910, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 1, "to_sta": "08:26", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "08:28", "train_date": "16-04-2023", "train_dstn": "VSKP", "train_name": "AMRITSAR - VISAKHAPATNAM Hirakud SF Express", "train_number": "20808", "train_src": "ASR", "train_type": "SUF"}, {"class_type": [Array], "d_day": 0, "duration": "0:14", "from": "NDLS", "from_day": 0, "from_sta": "08:45", "from_station_name": "NEW DELHI", "from_std": "08:45", "local_train_from_sta": 525, "run_days": [Array], "special_train": true, "special_valid_to": "2099-06-30", "to": "NZM", "to_day": 0, "to_sta": "08:59", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "09:00", "train_date": "16-04-2023", "train_dstn": "PWL", "train_name": "NEW DELHI - PALWAL Express Special (UnReserved)", "train_number": "04438", "train_src": "NDLS", "train_type": "PASS"}, {"class_type": [Array], "d_day": 0, "duration": "0:38", "from": "NDLS", "from_day": 0, "from_sta": "09:12", "from_station_name": "NEW DELHI", "from_std": "09:14", "local_train_from_sta": 552, "run_days": [Array], "special_train": true, "special_valid_to": "2099-01-31", "to": "NZM", "to_day": 0, "to_sta": "09:52", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "09:52", "train_date": "16-04-2023", "train_dstn": "NZM", "train_name": "KURUKSHETRA - HAZRAT NIZAMUDDIN Express Special", "train_number": "04406", "train_src": "KKDE", "train_type": "MEX"}, {"class_type": [Array], "d_day": 0, "duration": "0:11", "from": "NDLS", "from_day": 0, "from_sta": "12:55", "from_station_name": "NEW DELHI", "from_std": "13:10", "local_train_from_sta": 775, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "13:21", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "13:23", "train_date": "16-04-2023", "train_dstn": "KCVL", "train_name": "AMRITSAR - KOCHUVELI SF Express", "train_number": "12484", "train_src": "ASR", "train_type": "SUF"}, {"class_type": [Array], "d_day": 1, "duration": "0:11", "from": "NDLS", "from_day": 1, "from_sta": "13:35", "from_station_name": "NEW DELHI", "from_std": "14:00", "local_train_from_sta": 2255, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 1, "to_sta": "14:11", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "14:13", "train_date": "16-04-2023", "train_dstn": "MAS", "train_name": "SMVD KATRA - MGR CHENNAI CENTRAL Andaman Exp", "train_number": "16032", "train_src": "SVDK", "train_type": "MEX"}, {"class_type": [Array], "d_day": 0, "duration": "0:14", "from": "NDLS", "from_day": 0, "from_sta": "15:08", "from_station_name": "NEW DELHI", "from_std": "15:10", "local_train_from_sta": 908, "run_days": [Array], "special_train": true, "special_valid_to": "2099-01-31", "to": "NZM", "to_day": 0, "to_sta": "15:24", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "15:25", "train_date": "16-04-2023", "train_dstn": "PWL", "train_name": "SHAKURBASTI - PALWAL Express Special", "train_number": "04410", "train_src": "SSB", "train_type": "MEX"}, {"class_type": [Array], "d_day": 0, "duration": "0:13", "from": "NDLS", "from_day": 0, "from_sta": "17:08", "from_station_name": "NEW DELHI", "from_std": "17:10", "local_train_from_sta": 1028, "run_days": [Array], "special_train": true, "special_valid_to": "2099-04-30", "to": "NZM", "to_day": 0, "to_sta": "17:23", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "17:24", "train_date": "16-04-2023", "train_dstn": "MTJ", "train_name": "GHAZIABAD - MATHURA EMU Express Special", "train_number": "04420", "train_src": "GZB", "train_type": "MEMU"}, {"class_type": [Array], "d_day": 0, "duration": "0:20", "from": "NDLS", "from_day": 0, "from_sta": "17:40", "from_station_name": "NEW DELHI", "from_std": "17:40", "local_train_from_sta": 1060, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "18:00", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "18:01", "train_date": "16-04-2023", "train_dstn": "AGC", "train_name": "NEW DELHI - AGRA CANTT Intercity Express", "train_number": "14212", "train_src": "NDLS", "train_type": "INT"}, {"class_type": [Array], "d_day": 0, "duration": "0:11", "from": "NDLS", "from_day": 0, "from_sta": "18:05", "from_station_name": "NEW DELHI", "from_std": "18:20", "local_train_from_sta": 1085, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "18:31", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "18:33", "train_date": "16-04-2023", "train_dstn": "KURJ", "train_name": "KURUKSHETRA - KHAJURAHO Gita Jayanti Express", "train_number": "11842", "train_src": "KKDE", "train_type": "MEX"}, {"class_type": [Array], "d_day": 0, "duration": "0:14", "from": "NDLS", "from_day": 0, "from_sta": "18:55", "from_station_name": "NEW DELHI", "from_std": "18:57", "local_train_from_sta": 1135, "run_days": [Array], "special_train": true, "special_valid_to": "2099-06-30", "to": "NZM", "to_day": 0, "to_sta": "19:11", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "19:12", "train_date": "16-04-2023", "train_dstn": "MTJ", "train_name": "SHAKURBASTI - MATHURA MEMU Special (UnReserved)", "train_number": "04446", "train_src": "SSB", "train_type": "MEMU"}, {"class_type": [Array], "d_day": 0, "duration": "0:11", "from": "NDLS", "from_day": 0, "from_sta": "20:25", "from_station_name": "NEW DELHI", "from_std": "20:40", "local_train_from_sta": 1225, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "20:51", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "20:53", "train_date": "16-04-2023", "train_dstn": "CSMT", "train_name": "AMRITSAR - MUMBAI CSMT Pathankot Express", "train_number": "11058", "train_src": "ASR", "train_type": "MEX"}, {"class_type": [Array], "d_day": 0, "duration": "0:11", "from": "NDLS", "from_day": 0, "from_sta": "21:50", "from_station_name": "NEW DELHI", "from_std": "21:50", "local_train_from_sta": 1310, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "22:01", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "22:03", "train_date": "16-04-2023", "train_dstn": "INDB", "train_name": "NEW DELHI - INDORE Intercity SF Express", "train_number": "12416", "train_src": "NDLS", "train_type": "INT"}, {"class_type": [Array], "d_day": 0, "duration": "0:11", "from": "NDLS", "from_day": 0, "from_sta": "22:15", "from_station_name": "NEW DELHI", "from_std": "22:25", "local_train_from_sta": 1335, "run_days": [Array], "special_train": false, "to": "NZM", "to_day": 0, "to_sta": "22:36", "to_station_name": "DELHI HAZRAT NIZAMUDDIN", "to_std": "22:38", "train_date": "16-04-2023", "train_dstn": "SNSI", "train_name": "KALKA - SAINAGAR SHIRDI SF Express", "train_number": "22456", "train_src": "KLK", "train_type": "SUF"}], "message": "Success", "status": true, "timestamp": 1681549727580};
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
      const livestatus=({route})=>{
        const navigation = useNavigation()
        const {data} = route.params;
        const trainno=data.trainNo;
        const URL = `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo:${trainno}&startDay:'1'`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAILWAY_APIKEY,
            'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
          },
        };

      }


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