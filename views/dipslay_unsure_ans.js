import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Body} from 'native-base';
import {ScrollView, Text, View, StyleSheet, SafeAreaView} from 'react-native'
import UnsureAns from "../components/unsure_ans";
import Constants from 'expo-constants';

class DisplayUnsureAns extends Component {
    constructor(props) {
        super(props)
        this.unsureAns = [
            { uir : require("../assets/unsure/eU.png"),
                correct_ans : "C",
                timestamp : "03/14/2020",
                id : 0
            },

            {uir : require("../assets/unsure/aU.png"),
                correct_ans : "D",
                timestamp : "03/15/2020",
                id : 1
            },
            {uir : require("../assets/unsure/jU.png"),
                correct_ans : "J",
                timestamp : "03/15/2020",
                id : 2
            },
            {uir : require("../assets/unsure/fU.png"),
                correct_ans : "E",
                timestamp : "03/15/2020",
                id : 3
            },
            {uir : require("../assets/unsure/bU.png"),
                correct_ans : "B",
                timestamp : "03/15/2020",
                id : 4
            },
            {uir : require("../assets/unsure/dU.png"),
                correct_ans : "D",
                timestamp : "03/15/2020",
                id : 5
            },
            { uir : require("../assets/unsure/eU.png"),
                correct_ans : "C",
                timestamp : "03/14/2020",
                id : 6
            },

            {uir : require("../assets/unsure/aU.png"),
                correct_ans : "D",
                timestamp : "03/15/2020",
                id : 7
            },
            {uir : require("../assets/unsure/jU.png"),
                correct_ans : "J",
                timestamp : "03/15/2020",
                id : 8
            },
            {uir : require("../assets/unsure/fU.png"),
                correct_ans : "E",
                timestamp : "03/15/2020",
                id : 9
            },
            {uir : require("../assets/unsure/bU.png"),
                correct_ans : "B",
                timestamp : "03/15/2020",
                id : 10
            },
            {uir : require("../assets/unsure/dU.png"),
                correct_ans : "D",
                timestamp : "03/15/2020",
                id : 11
            }
        ]
        this.removeUnsureAns = this.removeUnsureAns.bind(this)
        this.renderUnsureAnsCards = this.renderUnsureAnsCards.bind(this)
    }

    removeUnsureAns(targetId) {
        let targetIndex = -1;
        console.log(typeof targetId)

        this.unsureAns.map(function(ans_card, index) {
            console.log(typeof ans_card.id)
            if (ans_card.id === targetId) {
                targetIndex = index;
                // break;
            }
        })
        if (targetIndex !== -1) {
            console.log(this.unsureAns)
            this.unsureAns.splice(targetIndex, 1)
            console.log(this.unsureAns)
        }
        else {
            console.log("Delete card id not found")
        }
        this.forceUpdate()
    }

    renderUnsureAnsCards() {
        let removeUnsureAns = this.removeUnsureAns
        if (this.unsureAns.length === 0) {
            return (
                <View>
                    <Text
                        style={{
                            color:"grey",
                            fontSize: 22,
                            display : "flex",
                            textAlign: "center",
                            marginTop: "15%"

                        }}
                    >
                        No Answers Requiring Human Grading 😊
                    </Text>
                </View>
            )
        }
        const renderedCards = (
            <View
                style={{
                    marginTop: "0%",
                    width:"100%",
                    height: "100%",
                    display : "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5"
                }}

            >
                {
                    this.unsureAns.map(function(ans_card, index) {
                        return (
                            <UnsureAns
                                uri={ans_card.uir}
                                correct_ans={ans_card.correct_ans}
                                timestamp={ans_card.timestamp}
                                id={ans_card.id}
                                removeUnsureAns={removeUnsureAns}
                            />
                        )
                    })
                }
            </View>
        )
        return renderedCards
    }

    render() {
        let renderedCards = this.renderUnsureAnsCards();
        return (
            <SafeAreaView>
            <ScrollView style={styles.scrollView}>
            {renderedCards}
        {/*<Text> Hello</Text>*/}
            </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});

export default DisplayUnsureAns