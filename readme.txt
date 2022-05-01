Notice how in EndScreen at lines 145 and 176 we needed to 
change const to var, yet it works in the mobile version.
does 'let' work instead of 'var'? and try these two in the
mobile version as well to see if they work.


April 23, 2022

C:\dev\names-game-react-native-web

React native wordle-type game from tutorial:
    WORDLE with React Native
    https://www.youtube.com/watch?v=2SpbSIPiDM0&list=PLY3ncAV1dSVCOmzOVNMCgh0fnAh81xueX&index=18

    by notJust.dev

We are guessing names instead of words.

I have adjusted the mobile-app code from:
    
    https://github.com/jergra/names-game-react-native
    C:\dev\names-game-react-native
    
so that it now works as a website. The animations are not being
used because react-native-reanimated is not compatible with react-native-web.

In retrospect, if the aim is to use react-native-web to have a website,
it would be simpler and better to build it from scratch, 
rather than adjust an already built mobile app.


start:
    npm start

deployed:
    
    https://names-game-react-native-web.vercel.app/
    
    the mobile-app version:
        Use the Expo Go app to read the QR code at:
        https://expo.dev/@jergra43/names-game-react-native


Note: clearing browser cache will clear AsyncStorage.

update:
    git add .
    git commit -m "message"
    git push