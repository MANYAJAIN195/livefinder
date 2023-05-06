import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet,Text, TouchableOpacity, View,TextInput } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Screen from '../components/Screen'
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'
import tailwind from 'tailwind-react-native-classnames'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements'

const EatsScreen = () => {
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date());
    const [dateN, setDateN] = useState('');
    const [mode,setMode]=useState('date');
    const [show,setShow]=useState(false);
    const [text,setText]=useState('');
    const [src, onChangesrc] = React.useState('');
    const [dest, onChangedest] = React.useState('');

    const onChange=(event,selectedDate)=>{
        const currentDate=selectedDate||date;
        setShow(false);
        if (mode === 'time' && currentDate < new Date()) {
            alert('Invalid time chosen')
            return
          }
        setDate(currentDate);
        let tempDate=new Date(currentDate);
        let fDate=tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
        let fTime='Hours: '+tempDate.getHours()+' | Minutes: '+tempDate.getMinutes();
        let fDaten=tempDate.getFullYear()+'-0'+(tempDate.getMonth()+1)+'-'+tempDate.getDate();
        //setText(tempDate)
        setDateN(fDaten)
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
                
                <TextInput
                    style={styles1.input}
                    placeholder='Source Station Name'
                    onChangeText={onChangesrc}
                    value={src}
                />
                <TextInput
                    style={styles1.input}
                    placeholder='Destination Station Name'
                    onChangeText={onChangedest}
                    value={dest}
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
                        minimumDate={new Date()}
                        onChange={onChange}
                    />    
                )}
               
            </View>
            <View style={tailwind`mt-3 flex-row justify-evenly py-3 border-t border-gray-100`}>
                    <TouchableOpacity
                        style={tailwind`flex-row bg-black px-4 py-3 rounded-full border border-black`}
                        onPress={() => navigation.push('Trainlist', { data: {source: src, destination: dest, date: dateN}})}
                    >
                        
                        <Text style={tailwind`text-white text-center`}>Submit</Text>
                    </TouchableOpacity>
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



