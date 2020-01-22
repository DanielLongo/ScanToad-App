import React, {Component} from 'react';
import {Image, View, ImageBackground, SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Label, Input } from 'native-base';
import PinView from 'react-native-pin-view' ;
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
    constructor(props) {
        super(props)
        this.state = {
            showPinView : false
        }
    }

    render() {
        console.log("TESTING", this.state.showPinView)
        if (this.state.showPinView) {
            console.log("showing pin view")
            return (
                <View
                    style={{
                        marginTop:"30%"
                    }}
                >
                    <PinView
                        onComplete={(val, clear)=>{alert(val)}}
                        pinLength={5}
                        showInputs={true}
                        // inputBgColor={"#097eeb"}
                        buttonTextColor={"#097eeb"}
                        inputActiveBgColor={"#097eeb"}
                    />
                    <Button
                        style={{marginLeft: "30%", textAlign:"center",  width:"42%", height:"9%"}}
                        onPress={() => this.setState({showPinView : false})}
                    >
                        <Text style={{alignItems:"center", justifyContent:"center"}}>Cancel</Text>
                    </Button>
                </View>
            )
        }
        else {
        return (
            <Container>
                <StatusBar barStyle={'dark-content'}/>
        <ImageBackground source={require("../assets/bg-white.jpg")} style={{
            width: '110%',
            height: '110%',
            display: 'flex',
            marginBottom: '20%',
            marginRight: '20%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'cover',
        }}>
            <ScrollView
            style={{
                // display: 'flex',

                paddingTop: '30%',
                marginLeft :'20%',
                width: '100%',
                height: '100%',
                // backgroundColor: 'green',
                // flex : 1
            }}
            >
                <View style={{width: '100%', height: '100%'}}>
                    <Image
                        source={require("../assets/logo-new.png")}
                        style={{marginBottom:"15%"}}
                    />
                    <Input
                        placeholder="Enter Email"
                        style={{backgroundColor:"#f5f5f5", width:"100%", height:"70%", marginBottom:"3%"}}/>
                    <Input
                        placeholder="Enter Password"
                        style={{backgroundColor:"#f5f5f5", width:"100%", height:"70%", marginBottom:"3%"}}
                        secureTextEntry={true}/>
                    <Button style={{marginLeft:"37%", marginBottom:"5%", width:"25%", height:"9%"}}><Text>Login</Text></Button>
                    <View
                        style={{
                            marginLeft:"10%"
                        }}
                    >
                        <Text style={{marginLeft:'40%'}}>OR</Text>
                    </View>
                    <Button
                        style={{marginLeft: "30%", marginTop:"5%", textAlign:"center",  width:"42%", height:"9%", marginBottom:"0%"}}
                        onPress={() => this.setState({showPinView : true})}
                    >
                        <Text style={{alignItems:"center", justifyContent:"center"}}>Submit Code</Text>
                    </Button>
                    <View style={{marginTop:"12%", display: 'flex', flexDirection: 'column'}}>
                        <Text>
                            Don't Have an Account or Code? <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL('http://google.com')}>
                            Sign Up
                        </Text>
                        </Text>
                        <Text>
                            Forgot Password? <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL('http://google.com')}>
                            Reset Password
                        </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        </Container>
        )
    }}
}

export default LogIn
