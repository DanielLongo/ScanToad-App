import React, {Component} from 'react';
import {Image, View, ImageBackground, StyleSheet, ScrollView, StatusBar, SafeAreaViewComponent, SafeAreaView, Button as RButton} from 'react-native';
import {Text, Input, Button} from 'native-base';
import PinView from 'react-native-pin-view';
import {Divider} from "react-native-elements";

const styles = StyleSheet.create({

});


class LogIn extends Component {
    constructor(props) {
        super(props)
        this.showPinView = this.showPinView.bind(this)
    }
    state = {
        showPinView : false
    }

    showPinView() {
        this.setState({
                showPinView: true
            }
        )
    }

    render() {
        if (this.state.showPinView) {
            console.log("showing pin view")
            return (
                <View
                    style={{
                        marginTop: "30%",
                        display : "flex",
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <PinView
                        // onComplete={(val, clear) => {
                        //     alert(val)
                        // }}
                        onComplete={this.props.handleShowUnsure}
                        pinLength={5}
                        showInputs={true}
                        // inputBgColor={"#097eeb"}
                        buttonTextColor={"#097eeb"}
                        inputActiveBgColor={"#097eeb"}
                    />
                    <Button
                        style={{width: "42%", height: "9%"}}
                        onPress={() => this.setState({showPinView: false})}
                    >
                        <Text style={{alignItems: "center", justifyContent: "center"}}>Cancel</Text>
                    </Button>
                </View>
            )
        } else {
            return (
                <React.Fragment>
                    <StatusBar barStyle={'dark-content'}/>
                    <ImageBackground source={require("../assets/bg-white.png")} style={{
                        display: 'flex',
                        width: '110%',
                        height: '110%',
                        marginRight: '20%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        resizeMode: 'cover',
                    }}>
                        <SafeAreaView
                            style={{marginLeft: "20%"}}
                        >
                            <ScrollView contentContainerStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 100
                            }}>
                                <Image source={require("../assets/logo-new.png")}/>
                                <Input
                                    placeholder="Enter Email"
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: 6,
                                        marginBottom: 15,
                                        width: '90%',
                                        paddingLeft: 15
                                    }}/>
                                <Input
                                    placeholder="Enter Password"
                                    secureTextEntry={true}
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: 6,
                                        marginBottom: 15,
                                        width: '90%',
                                        paddingLeft: 15
                                    }}/>
                                <Button style={{marginBottom: 20}} onPress={this.props.handleShowUnsure}><Text>Sign
                                    in</Text></Button>
                                <Text style={{marginBottom: 18, fontSize: 20}}>OR</Text>
                                <Button style={{marginBottom: 20}} onPress={this.showPinView}>
                                    <Text>Use 5-Digit PIN</Text>
                                </Button>
                                <RButton title={'Don\'t Have an Account or Code?'} onPress={null}/>
                                <RButton title={'Forgot Password?'} onPress={null}/>
                            </ScrollView>
                        </SafeAreaView>
                    </ImageBackground>
                </React.Fragment>
            )
        }
    }
}


// render() {
        // // console.log("TESTING", this.state.showPinView)
        // console.log("RENDER LOGIN")
        // if (this.state.showPinView) {
        //     console.log("showing pin view")
        //     return (
        //         <View
        //             style={{
        //                 marginTop:"30%"
        //             }}
        //         >
        //             <PinView
        //                 onComplete={(val, clear)=>{alert(val)}}
        //                 pinLength={5}
        //                 showInputs={true}
        //                 // inputBgColor={"#097eeb"}
        //                 buttonTextColor={"#097eeb"}
        //                 inputActiveBgColor={"#097eeb"}
        //             />
        //             <Button
        //                 style={{marginLeft: "30%", textAlign:"center",  width:"42%", height:"9%"}}
        //                 onPress={() => this.setState({showPinView : false})}
        //             >
        //                 <Text style={{alignItems:"center", justifyContent:"center"}}>Cancel</Text>
        //             </Button>
        //         </View>
        //     )
        // }
        // else {
        // return (
        //     <Container>
        //         <StatusBar barStyle={'dark-content'}/>
        // <ImageBackground source={require("../assets/bg-white.jpg")} style={{
        //     width: '110%',
        //     height: '110%',
        //     display: 'flex',
        //     marginBottom: '20%',
        //     marginRight: '20%',
        //     flexDirection: 'column',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     resizeMode: 'cover',
        // }}>
        //     <ScrollView
        //     style={{
        //         // display: 'flex',
        //
        //         paddingTop: '30%',
        //         marginLeft :'20%',
        //         width: '100%',
        //         height: '100%',
        //         // backgroundColor: 'green',
        //         // flex : 1
        //     }}
        //     >
        //         <View style={{width: '100%', height: '100%'}}>
        //             <Image
        //                 source={require("../assets/logo-new.png")}
        //                 style={{marginBottom:"15%"}}
        //             />
        //             <Input
        //                 placeholder="Enter Email"
        //                 style={{backgroundColor:"#f5f5f5", width:"100%", height:"70%", marginBottom:"3%"}}/>
        //             <Input
        //                 placeholder="Enter Password"
        //                 style={{backgroundColor:"#f5f5f5", width:"100%", height:"70%", marginBottom:"3%"}}
        //                 secureTextEntry={true}/>
        //             <Button
        //                 style={{marginLeft:"37%", marginBottom:"5%", width:"25%", height:"9%"}}
        //                 onPress={this.props.handleShowUnsure}
        //             >
        //                 <Text>Login</Text>
        //             </Button>
        //             <View
        //                 style={{
        //                     marginLeft:"10%"
        //                 }}
        //             >
        //                 <Text style={{marginLeft:'40%'}}>OR</Text>
        //             </View>
        //             <Button
        //                 style={{marginLeft: "30%", marginTop:"5%", textAlign:"center",  width:"42%", height:"9%", marginBottom:"0%"}}
        //                 onPress={() => this.setState({showPinView : true})}
        //             >
        //                 <Text style={{alignItems:"center", justifyContent:"center"}}>Submit Code</Text>
        //             </Button>
        //             <View style={{marginTop:"12%", display: 'flex', flexDirection: 'column'}}>
        //                 <Text>
        //                     Don't Have an Account or Code? <Text
        //                     style={{color: 'blue'}}
        //                     onPress={() => Linking.openURL('http://google.com')}>
        //                     Sign Up
        //                 </Text>
        //                 </Text>
        //                 <Text>
        //                     Forgot Password? <Text
        //                     style={{color: 'blue'}}
        //                     onPress={() => Linking.openURL('http://google.com')}>
        //                     Reset Password
        //                 </Text>
        //                 </Text>
        //             </View>
        //         </View>
        //     </ScrollView>
        //     </ImageBackground>
        // </Container>
        // )
    // }}

export default LogIn
