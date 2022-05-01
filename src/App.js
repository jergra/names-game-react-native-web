import { StyleSheet, Text, SafeAreaView } from 'react-native';
import {colors} from './constants'
import Game from './components/Game/Game'


export default function App() {
  
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>NAMES GAME</Text>
      <Game />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.black,
        width: 'full',
        height: 'full',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        display: 'flex',
        justifyContent: 'center',
        //alignItems: 'center',
        color: colors.lightgrey,
        //color: 'teal',
        backgroundColor: colors.black,
        width: 2700,
        height: 1000,
        fontSize: 45,
        fontWeight: 'bold',
        letterSpacing: 7,
        paddingTop: 40,
        marginBottom: 80
      },
  
});
