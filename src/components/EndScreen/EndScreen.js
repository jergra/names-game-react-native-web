import { View, Text, StyleSheet, Pressable, Dimensions, NativeModules } from 'react-native'
import React, {useState, useEffect} from 'react'
import {colors} from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Game from '../Game/Game';
  
const Number = ({number, label}) => (
    <View style={{alignItems: 'center', margin: 10}}>
        <Text style={{color: colors.lightgrey, fontSize: 30, fontWeight: 'bold'}}>{number}</Text>
        <Text style={{color: colors.lightgrey, fontSize: 16}}>{label}</Text>
    </View>
)
const GuessDistributionLine = ({position, amount, percentage}) => (
    <View 
        style={{
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: "100%"
        }}
    >
        <Text 
            style={{
                color: colors.lightgrey,
                marginRight: 8,
                fontSize: 25
            }}
        >
            {position}
        </Text>
        <View 
            style={{
                alignSelf: 'stretch',
                backgroundColor: colors.grey, 
                margin: 6, 
                padding: 6,
                width: `${percentage}%`
            }}
        >
            <Text 
                style={{
                    color: colors.lightgrey,
                    marginLeft: 'auto',
                    marginRight: 3,
                    fontSize: 20
                }}
            >
                {amount}
            </Text>
        </View>
        
    </View>
)

const GuessDistribution = ({guessesInfo}) => {

    //console.log('guessesInfo in GuessDistribution:', guessesInfo)
    
    const getWidth = (guessLine) => {
        if (7 + guessLine * 5 > 100) {
            return 100
        }
        return 7 + guessLine * 2
    }

    return (
        <>
            <Text style={styles.subtitle}>
                GUESS DISTRIBUTION
            </Text>
            <View style={{width: '100%', padding: 20}}>
                {
                    guessesInfo.map((guessLine, index) => (
                        <>
                            <View
                                key={index}
                            >
                                <GuessDistributionLine 
                                    position={index + 1} 
                                    amount={guessLine} 
                                    percentage={getWidth(guessLine)} 
                                />
                            </View>
                        </>
                    ))
                }
            </View>
        </>
    )
}


const EndScreen = ({won = false, name, currentRow}) => {

    console.log('won in EndScreen:', won)
    console.log('name in EndScreen:', name)
    console.log('currentRow in EndScreen:', currentRow)
    
    const [totalPlayed, setTotalPlayed] = useState(0)
    const [totalWins, setTotalWins] = useState(0)
    const [winRate, setWinRate] = useState(0)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)
    const [gameState, setGameState] = useState('won')
    const [guessesInfo, setGuessesInfo] = useState([0,0,0,0,0,0])

    useEffect(() => {
        readState()
    }, [])

    function share() {

    }

    const readState = async () => {
        const dataString = await AsyncStorage.getItem('UID76')
        console.log('dataString UID76:', dataString);
        console.log('JSON.parse(dataString):', JSON.parse(dataString))
        const data = JSON.parse(dataString)
        console.log('data:', data)
           
        if (dataString === null && won === true) {
            guessesInfo.splice(currentRow - 1, 1, 1)
            setGuessesInfo(guessesInfo)
            let UID76_object = {games: [[true, currentRow, 1]]}
            AsyncStorage.setItem('UID76', JSON.stringify(UID76_object))
            setTotalPlayed(1)
            setTotalWins(1)
            setWinRate(100)
            setCurrentStreak(1)
            setMaxStreak(1)
        }
        if (dataString === null && won === false) {
            let UID76_object = {games: [[false, currentRow, 0]]}
            AsyncStorage.setItem('UID76', JSON.stringify(UID76_object))
            setTotalPlayed(1)
        }
        
        if (dataString !== null) {
            const gamesArray = data.games
            console.log('gamesArray:', gamesArray)
            console.log('gamesArray.length:', gamesArray.length)
         
            if (won === false) {
                const distribution = []
                for (let i = 1; i < 7; i++) {
                    let total = 0
                    for (let j = 0; j < gamesArray.length; j++) {
                        if (gamesArray[j][1] === i) {
                            total++
                        }
                    }
                    distribution.push(total)
                    console.log('distribution:', distribution)
                }
                setGuessesInfo(distribution)

                setTotalPlayed(gamesArray.length + 1)
                let wins = 0
                for (let i = 0; i < gamesArray.length; i++) {
                    if (gamesArray[i][0] === true) {
                        wins++
                    }
                    setTotalWins(wins)
                    setWinRate((((wins)/(gamesArray.length + 1)) * 100).toFixed(0))
                }
                let previousMaxStreak = gamesArray[gamesArray.length - 1][2]
                setMaxStreak(previousMaxStreak)
                gamesArray.push([false, 7, previousMaxStreak])
                let UID76_object = {games: gamesArray}
                AsyncStorage.setItem('UID76', JSON.stringify(UID76_object))
                setCurrentStreak(0)
            }

            if (won === true) {
                const distribution = []
                for (let i = 1; i < 7; i++) {
                    let total = 0
                    for (let j = 0; j < gamesArray.length; j++) {
                        if (gamesArray[j][1] === i) {
                            total++
                        }
                    }
                    distribution.push(total)
                    if (i === currentRow) {
                        var lastValue = distribution.pop()
                        distribution.push(++lastValue)
                    }
                }
                setGuessesInfo(distribution)
                
                setTotalPlayed(gamesArray.length + 1)
                let wins = 0
                for (let i = 0; i < gamesArray.length; i++) {
                    if (gamesArray[i][0] === true) {
                        wins++
                    }
                    setTotalWins(wins + 1)
                    setWinRate((((wins + 1)/(gamesArray.length + 1)) * 100).toFixed(0))
                }
                
                let streak = 0
                for (let i = gamesArray.length - 1; i > -1; i--) {
                    if (gamesArray[i][0] === true) {
                        streak++
                    }
                    if (gamesArray[i][0] === false) {
                        setCurrentStreak(streak + 1)
                        break
                    }
                    if (i === 0) {
                        setCurrentStreak(gamesArray.length + 1)
                    }
                }

                let previousMaxStreak = gamesArray[gamesArray.length - 1][2]
                let currentMaxStreak = 0
                for (let i = gamesArray.length - 1; i > -1; i--) {
                    if (gamesArray[i][0] === true) {
                        currentMaxStreak++
                    }
                    if (gamesArray[i][0] === false) {
                        if (currentMaxStreak === previousMaxStreak) {
                            setMaxStreak(previousMaxStreak + 1)
                            gamesArray.push([true, currentRow, previousMaxStreak + 1])
                            let UID76_object = {games: gamesArray}
                            AsyncStorage.setItem('UID76', JSON.stringify(UID76_object))
                            break
                        } else {
                            setMaxStreak(previousMaxStreak)
                            gamesArray.push([true, currentRow, previousMaxStreak])
                            let UID76_object = {games: gamesArray}
                            AsyncStorage.setItem('UID76', JSON.stringify(UID76_object))
                            break
                        }
                    }
                    if (i === 0) {
                        setMaxStreak(currentMaxStreak + 1)
                        gamesArray.push([true, currentRow, currentMaxStreak + 1])
                        let UID76_object = {games: gamesArray}
                        AsyncStorage.setItem('UID76', JSON.stringify(UID76_object))
                    }
                }
            }
        }
    }

    const restart = () => {
        setGameState('playing')
    }

    if (gameState === 'playing') {
        return (<Game playing={gameState === 'playing'} />)
    }
    

  return (
    <View style={{width: '24%', alignItems: 'center', marginTop: -950}}>
      <Text style={styles.title}>
          {won ? 'Congrats!' : name.toUpperCase() }
      </Text>
      <Text style={styles.subtitle}>STATISTICS</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{marginRight: 30}}><Number number={totalPlayed} label={'Played'} /></View>
        <View style={{marginRight: 30}}><Number number={winRate} label={'Win %'} /></View>
        <View style={{marginRight: 30}}><Number number={currentStreak} label={'Current'} /></View>
        <View style={{marginRight: 30}}><Number number={maxStreak} label={'Max'} /></View>
      </View>
      <View style={{flexDirection: 'row', marginTop: -17, marginBottom: 30}}>
      <View style={{marginRight: 30}}><Number number={''} label={'          '} /></View>
      <View style={{marginRight: 30}}><Number number={''} label={'              '} /></View>
      <View style={{marginRight: 30}}><Number number={''} label={'Streak'} /></View>
      <View style={{marginRight: 30}}><Number number={''} label={'Streak'} /></View>
      </View>
      
      <GuessDistribution guessesInfo={guessesInfo} currentRow={currentRow} />

      <View style={{flexDirection: 'row'}}>
          {/* <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{color: colors.lightgrey}}>Next Names Game</Text>
              <Text style={{color: colors.lightgrey, fontSize: 24, fontWeight: 'bold'}}>10:35:00</Text>
          </View> */}
          <Pressable 
            onPress={restart} 
            style={{
                backgroundColor: colors.primary, 
                borderRadius: 25, 
                alignItems: 'center',
                justifyContent: 'center', 
                paddingHorizontal: 30,
                paddingVertical: 10
            }}
        >
              <Text style={{color: colors.lightgrey, fontWeight: 'bold', fontSize: 25}}>Play Again</Text>
          </Pressable>
          {/* <Pressable 
            onPress={share} 
            style={{
                backgroundColor: colors.primary, 
                borderRadius: 25, 
                alignItems: 'center',
                justifyContent: 'center', 
                paddingHorizontal: 30,
                padding: 10
            }}
        >
              <Text style={{color: colors.lightgrey, fontWeight: 'bold', fontSize: 25}}>Share</Text>
          </Pressable> */}
      </View>
      
    </View>
  )
}

const screenWidth = Dimensions.get("window").width;

const getFontSize = () => {
 if (screenWidth < 700) {
     return 30
 }
 return 40
}

const styles = StyleSheet.create({
    title: {
        fontSize: getFontSize(),
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 70
    },
    subtitle: {
        fontSize: 25,
        color: colors.lightgrey,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default EndScreen