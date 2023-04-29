import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Screen from '../components/Screen'
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'
import tailwind from 'tailwind-react-native-classnames'
import { useState,useEffect } from 'react'
import {RAILWAY_APIKEY, RAILWAY_HOST_APIKEY} from "@env";



const TrainSuccess = ({ route }) => {
    const navigation = useNavigation()
    const {data} = route.params;
    const trainno=data.trainNo;
    const [selectedTrainData, setSelectedTrainData] = useState([]);


    useEffect(() => {
        const timer = setTimeout(() => {
          console.log('This will run after 3 second!')
          liveStatus()
        }, 3000);
        return () => clearTimeout(timer);
      }, []);


    const liveStatus = async () => {
    const URL = `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainno}&startDay=1`;
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': RAILWAY_APIKEY,
        'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
        },
    };
    
    try {
        const response = await fetch(URL, options);
        const selectedTrain = await response.json();
        const selTrainData = selectedTrain.data;
        setSelectedTrainData(selTrainData);
        console.log(selTrainData);
        
    } catch (error) {
        console.error(error);
    }
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
            <View style={tailwind`items-center`}>
                <Text>selected train: {trainno}</Text>
            </View>
        </Screen>
    )
}

export default TrainSuccess