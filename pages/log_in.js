import React, {Component} from 'react';
import {Image, View, ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
// import {ImageBackground} from "react-native-web";
// import Image from "react-native-web/src/exports/Image";
// let { StyleSheet } = React;
//
// let styles = StyleSheet.create({
//     backgroundImage: {
//         flex: 1,
//         resizeMode: 'cover', // or 'stretch'
//     }
// });
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: undefined,
        // height: undefined,
        // backgroundColor:'transparent',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
class LogIn extends Component {
    render() {
        return (
            <Container>
                {/*<ImageBackground source={require('../assets/bg-white.jpg')} imageStyle={{resizeMode: 'cover' }}>*/}
            <ImageBackground source={require("../assets/bg-white.jpg")} style={{
                width: '110%',
                height: '110%',
                display: 'flex',
                margin: '0%',
                marginRight: '20%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'cover'
            }}>
                <Content
                style={{
                    display: 'flex',
                    marginTop: '25%',
                    marginLeft :'19%'
                }}
                >
                    <Image
                        source={require("../assets/logo-new.png")}
                        style={{marginBottom:"20%"}}
                    />
                {/*<SafeAreaView>*/}
                    {/*<Text>Login Now</Text>*/}
                    <Button style={{marginBottom:"5%"}}><Text>Login</Text></Button>
                    <View
                        style={{
                            marginLeft:"10%"
                        }}
                    >
                        <Text style={{marginLeft:'40%'}}>OR</Text>
                    </View>
                    <Button style={{marginTop:"5%", textAlign:"center"}}><Text style={{alignItems:"center", justifyContent:"center"}}>Submit Code</Text></Button>
                {/*</SafeAreaView>*/}
                </Content>
                </ImageBackground>
            </Container>
        )
    }
}

export default LogIn