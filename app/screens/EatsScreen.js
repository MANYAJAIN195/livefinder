import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet,Text, TouchableOpacity, View,TextInput } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Screen from '../components/Screen'
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'
import tailwind from 'tailwind-react-native-classnames'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_APIKEY} from "@env";
import { setDestination, setOrigin } from '../redux/slices/navSlice'

const EatsScreen = () => {
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date());
    const [mode,setMode]=useState('date');
    const [show,setShow]=useState(false);
    const [text,setText]=useState('');
    const [text1, onChangeText] = React.useState('Train No.');

    const onChange=(event,selectedDate)=>{
        const currentDate=selectedDate||date;
        setShow(false);
        setDate(currentDate);

        let tempDate=new Date(currentDate);
        let fDate=tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
        let fTime='Hours: '+tempDate.getHours()+' | Minutes: '+tempDate.getMinutes();
        var hh = new Date();
        setHour((tempDate-hh)/1000);
        setText(fDate+'\n'+fTime)
    }
    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }

    return (
        <Screen style={tw`bg-white h-full justify-center`}>
            <TouchableOpacity
                style={[tailwind`bg-white p-3 rounded-full shadow-lg`, { top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                // style={}
                />
            </TouchableOpacity>
            <Text style={tailwind`text-center pb-5 text-xl font-bold`}>Welcome</Text>
            <View style={tailwind`border-t border-gray-100 flex-shrink relative z-20 bg-white`}>
                <View style={tailwind`bg-white pb-2`}>
                    <GooglePlacesAutocomplete
                        placeholder='Where to?'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                loaction: details.geometry.location,
                                description: data.description
                            }))
                        }}
                        minLength={2}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                    />
                    
                </View>
                <TextInput
                    style={styles1.input}
                    onChangeText={onChangeText}
                    value={text1}
                />
            </View>
                
            <View style={styles.container}>
                <View style={{margin:10}}>
                    <Text>{text}</Text>
                    <Button title="Select Date"  onPress={()=>showMode('date')}/>
                </View>
                <View style={{margin:10}}>
                    <Button title="Select Time"  onPress={()=>showMode('time')}/>
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
        </Screen>
    )
}

export default EatsScreen
const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }
})
const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    textInput: {
        fontSize: 15,
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        borderEndWidth: 1,
        borderColor: '#ddd'
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})
const styles1 = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

