import React, {Component} from 'react';
import {Image, View, ImageBackground, StyleSheet, ScrollView, StatusBar, SafeAreaViewComponent, SafeAreaView, Button as RButton} from 'react-native';
import {Text, Input, Button} from 'native-base';
import { Container, Header, Content, Card, CardItem, Body} from 'native-base';
// import {Icon} from "react-native-vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';



class UnsureAns extends Component {
    constructor(props) {
        super(props)
        this.wrong = this.wrong.bind(this)
        this.right = this.right.bind(this)
        this.state = {
            backgroundColor : "#ffffff"
        }
    }

    // state = {
        // uri : require(id=this.props.img_path)
        // uri : require("../assets/unsure/aU.png")
    // }

    wrong() {
        // console.log(this.props.id)
        this.setState({
            backgroundColor : "red"
        })
        setTimeout(() => {

            this.props.removeUnsureAns(this.props.id)
            this.setState({
                backgroundColor : "white"
            })

        }, 30)

        console.log("WRONG")
    }

    right() {
        this.setState({
            backgroundColor : "green"
        })
        setTimeout(() => {

            this.props.removeUnsureAns(this.props.id)
            this.setState({
                backgroundColor : "white"
            })

        }, 30)
        console.log("RIGHT")

    }

    render() {
        // let path = (this.props.img_path).toString()
        // let uri =  require("../assets/unsure/aU.png")
        // let all = require("../assets/unsure/")
        // let uri = all["aU.png"]
        // console.log("path " + path)
        // let uri =  require(path)
        return (
                <Card
                    style={{width:"98%", height:90, backgroundColor: this.state.backgroundColor}}
                >
                    <CardItem
                        style={{backgroundColor: this.state.backgroundColor}}
                    >
                        <Image
                            source={this.props.uri}
                            style={{width: 65, height: 65}}
                        />
                        <Text
                            style={{marginLeft:"4%", fontSize:10}}
                        >
                            {this.props.timestamp}
                        </Text>
                        <Text
                            style={{marginLeft:"4%", fontSize:30}}
                        >
                            {this.props.correct_ans}
                        </Text>
                        <Button
                            style={{backgroundColor:"#f5f5f5", marginLeft:"7%", paddingLeft:10, paddingRight:10}}
                            onPress={this.wrong}
                        >
                            {/*<Icon name="trash"/>*/}
                            <Icon name="close" size={35} color="#900" />
                        </Button>
                        <Button
                            style={{backgroundColor:"#f5f5f5", paddingLeft:10, paddingRight:10, marginLeft:"9%"}}
                            onPress={this.right}
                        >
                            {/*<Icon name="trash"/>*/}
                            <Icon name="check" size={35} color="green" />
                        </Button>
                    </CardItem>
                </Card>
        )
    }
}
export default UnsureAns