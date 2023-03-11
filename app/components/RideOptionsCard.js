import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native'
import tailwind from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import Screen from './Screen'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'
import { Button } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';


const RideOptionsCard = () => {

    const [date, setDate] = useState(new Date());
    const [mode,setMode]=useState('date');
    const [show,setShow]=useState(false);
    const [text,setText]=useState('Empty');

    const onChange=(event,selectedDate)=>{
        const currentDate=selectedDate||date;
        setShow(false);
        setDate(currentDate);

        let tempDate=new Date(currentDate);
        let fDate=tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
        let fTime='Hours: '+tempDate.getHours()+' | Minutes: '+tempDate.getMinutes();
        setText(fDate+'\n'+fTime)
    }
    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }
  



    const navigation = useNavigation()
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    useEffect(() =>{
        if(!origin || !destination) navigation.push('NavigateCard')
    }, [origin, destination])

    

    // const onChoose = () =>{
    //     navigation.push('SuccessScreen', { data: {distance: travelTimeInformation?.distance?.text, time: travelTimeInformation?.duration.text,date:currentDate} })
    // }

    return (
        <Screen style={tailwind`bg-white h-full`}>
            <View style={tailwind`items-center flex-row justify-center mb-3`}>
                <TouchableOpacity
                    style={{ left: 10, position: 'absolute', zIndex: 100 }}
                    onPress={() => navigation.push("NavigateCard")}
                >
                    <Icon
                        type="antdesign"
                        name="arrowleft"
                        color="black"
                        size={23}
                        style={tailwind`p-3`}
                    />
                </TouchableOpacity>
            </View>
            <View style={tailwind`flex-1 mt-2`}>
                <Text style={tailwind`text-gray-600`}>DISTANCE - {travelTimeInformation?.distance?.text}</Text>
                <Text style={tailwind`text-gray-600`}>{travelTimeInformation?.duration?.text} Travel time</Text>  
            </View>
            <View style={styles.container}>
                <Text>{text}</Text>
                <View style={{margin:20}}>
                    <Button title="Show date picker!"  onPress={()=>showMode('date')}/>
                </View>
                <View style={{margin:20}}>
                    <Button title="Show Time picker!"  onPress={()=>showMode('time')}/>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                    
                )}
               
            </View>
            <View>
                <TouchableOpacity
                    style={tailwind`bg-black py-3 m-3 rounded-lg`}
                    onPress={()=>{
                        navigation.push('SuccessScreen', { data: {distance: travelTimeInformation?.distance?.text, time: travelTimeInformation?.duration.text,date:date.getMinutes()} })
                    }}
                >
                    <Text style={tailwind`text-center text-white text-xl`}>START </Text>
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})
