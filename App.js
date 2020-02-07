import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from "./pages/log_in";
import Unsure from "./pages/unsure";
import Main from "./pages/main";

export default function App() {
    return (
        <View style={styles.container}>
          {/*<Text>Open up App.js to start working on your app!</Text>*/}
          {/*<LogIn/>*/}
          {/*<Unsure/>*/}
          <Main/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
