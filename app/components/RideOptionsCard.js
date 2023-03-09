import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import tailwind from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import Screen from './Screen'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'

const data = [
    {
        id: "Uber-X-123",
        title: "CAR",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
]

const SEARCH_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    useEffect(() =>{
        if(!origin || !destination) navigation.push('NavigateCard')
    }, [origin, destination])

    

    const onChoose = () =>{
        if(!selected) return Alert.alert('Please select a ride option')
        navigation.push('SuccessScreen', { data: {...selected, distance: travelTimeInformation?.distance?.text, time: travelTimeInformation?.duration.text} })
    }

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
                <Text style={tailwind`text-center text-xl font-bold`}>DISTANCE - {travelTimeInformation?.distance?.text}</Text>
            </View>
            <View style={tailwind`flex-1 mt-2`}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={tailwind`flex-row items-center justify-between px-5 ${selected?.id === item.id && 'bg-gray-100'}`}
                            onPress={() => setSelected(item)}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
                            <View style={tailwind`flex-row items-center justify-between flex-1`}>
                                <View>
                                    <Text style={tailwind`text-xl font-bold text-black`}>{item.title}</Text>
                                    <Text style={tailwind`text-gray-600`}>{travelTimeInformation?.duration?.text} Travel time</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={tailwind`bg-black py-3 m-3 rounded-lg ${!selected && 'bg-gray-300'}`}
                    disabled={!selected}
                    onPress={onChoose}
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
