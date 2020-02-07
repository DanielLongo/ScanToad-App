import React, {Component} from 'react';
import {Text, Image, View, ImageBackground, SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import LogIn from "./log_in";
import Unsure from "./unsure";

class Main extends Component {
    constructor(props) {
        super(props)
        this.handleShowUnsure = this.handleShowUnsure.bind(this)
        this.handleShowLogIn = this.handleShowLogIn.bind(this)

    }
    state = {
        showLogIn : true,
        showUnsure : false
    }

    handleShowUnsure() {
        this.setState({
            showUnsure: true,
            showLogIn : false
        })
    }

    handleShowLogIn() {
        this.setState({
            showUnsure: false,
            showLogIn : true
        })
    }

    render() {
        let {showLogIn} = this.state;
        let {showUnsure} = this.state;
        console.log("RENDER MAIN")
        // console.log("show unsure", showUnsure)
        // console.log("show login", showLogIn)
        return (
            <View style={styles.container}>
                {/*{showLogIn <Text>This works</Text>}*/}

                {showLogIn ?
                    <LogIn
                        handleShowUnsure={this.handleShowUnsure}
                    /> :
                    showUnsure ?
                        <Unsure
                            handleShowLogIn={this.handleShowLogIn}
                        /> :
                        <Text> Nothing to Show </Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default  Main