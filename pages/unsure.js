import React, {Component} from 'react';
import {Image, View, ImageBackground, SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Label, Input, Left, Body, Right, Title, Icon} from 'native-base';
import DisplayUnsureAns from "../views/dipslay_unsure_ans";
class Unsure extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container
                style={{
                    backgroundColor: "#f5f5f5"
                }}
            >
            <Header
                style={{
                    // flexDirection: 'column',
                    // justifyContent: "center",
                    alignItems: "center",
                    width: 390
                }}
            >
                {/*<View>*/}
                {/*<View*/}
                {/*    style={{*/}
                {/*        width:"100%",*/}
                {/*        // display : "flex",*/}
                {/*        flexDirection: 'column',*/}
                {/*        justifyContent: "center",*/}
                {/*        alignItems: "center",*/}
                {/*        marginTop: "10%"*/}
                {/*    }}*/}
                {/*>*/}
                <Left>
                    <Button hasText transparent>
                        <Text>Camera</Text>
                    </Button>
                </Left>
                    <Body>
                        <Title>Human Check</Title>
                    </Body>
                {/*<Text>Answers in Need of Human Grading</Text>*/}
                    <Right>
                        <Right>
                            <Button hasText transparent onPress={this.props.handleShowLogIn}>
                                <Text>Log Out</Text>
                            </Button>
                        </Right>
                    </Right>
                {/*</View>*/}
            {/*</View>*/}
            </Header>
                <Text
                    style={{
                        marginTop:10,
                        // marginBottom:-30,
                        fontSize: 20,
                        backgroundColor: "#f5f5f5",
                        textAlign:"center"
                    }}
                >Answers Requiring Human Check</Text>
                <DisplayUnsureAns/>
            </Container>
        )

    }
}
// Button onPress={this.props.handleShowLogIn}
// style={{marginRight:"-100%",
//     width:120
// }}>
// <Text style={{alignItems:"center", justifyContent:"center", padding:0}}>Log Out</Text>
// </Button>
export default  Unsure