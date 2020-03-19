import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {cameraWithTensors, detectGLCapabilities} from '@tensorflow/tfjs-react-native';
import './assets/box.png';

const TensorCamera = cameraWithTensors(Camera);

class App extends React.Component {
    state = {
        isTfReady: false
    };

    async componentDidMount() {
        await tf.ready();

        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            isTfReady: true
        });

        //Output in Expo console
        console.log(this.state.isTfReady);
    }
    wait(ms){
        let start = new Date().getTime();
        let end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    }
    handleCameraStream(images, updatePreview, gl) {
        const loop = async () => {
            await detectGLCapabilities(gl)
            let nextImageTensor = await images.next().value;
            nextImageTensor = nextImageTensor.mean(2) // makes image greyscale
            // nextImageTensor = tf.cast(nextImageTensor, "complex64")
            console.log("FFT Start")
            console.log(nextImageTensor.shape)
            let fft_out = nextImageTensor.cast("complex64").fft().cast("int32")
            // fft_out.print()
            console.log(fft_out.shape)
            console.log("FFT End")
            // console.log(nextImageTensor.sum(1).print())
            // console.log("KHFKHFKJHJKHLKJH")
            //
            // do something with tensor here
            //
            // this.wait(7000)
            // await setTimeout(() => {
            // }, 500000)
            // if autorender is false you need the following two lines.
            updatePreview();
            gl.endFrameEXP();
            requestAnimationFrame(loop);
        };
        loop();
    }

    render() {
        let textureDims;
        if (Platform.OS === 'ios') {
            textureDims = {
                height: 1920,
                width: 1080,
            };
        } else {
            textureDims = {
                height: 1200,
                width: 1600,
            };
        }

        return (
            <View style={styles.cameraContainer}>
                <TensorCamera
                    // Standard Camera props
                    style={styles.camera}
                    type={Camera.Constants.Type.rear}
                    // Tensor related props
                    cameraTextureHeight={textureDims.height}
                    cameraTextureWidth={textureDims.width}
                    resizeHeight={200}
                    resizeWidth={152}
                    resizeDepth={3}
                    onReady={this.handleCameraStream}
                    autorender={false}
                />
                <View style={{zIndex:1000}}>
                    <Image
                    style={{width: 110, height: 110, position:'absolute', top:-350,left:-175}}
                    source={require('./assets/box-nb.png')}
                    />
                    <Image
                        style={{width: 110, height: 110, position:'absolute', top:-350,left:40}}
                        source={require('./assets/box-nb.png')}
                    />
                    <Image
                        style={{width: 110, height: 110, position:'absolute', top:200,left:40}}
                        source={require('./assets/box-nb.png')}
                    />
                    <Image
                        style={{width: 110, height: 110, position:'absolute', top:200,left:-175}}
                        source={require('./assets/box-nb.png')}
                    />
                </View>
            </View>
        )
    }
}

export default App

const styles = StyleSheet.create({
    cameraContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    camera: {
        position: 'absolute',
        left: 0, //50,
        top: 0, //100,
        width: '100%', //600 / 2,
        height: '100%', //800 / 2,
        zIndex: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 0,
    }
});
