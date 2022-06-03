import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Entypo from '@expo/vector-icons/Entypo'

import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium 
} from '@expo-google-fonts/inter'

import Widget from './src/components/Widget'
import { theme } from './src/theme'
import { useCallback, useEffect, useState } from 'react'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
      
    }} onLayout={onLayoutRootView}>
      <StatusBar 
        style="auto"
        backgroundColor='transparent'
        translucent
      />
      <Widget />
    </View>
  );
}