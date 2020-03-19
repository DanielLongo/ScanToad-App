import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {cameraWithTensors, decodeJpeg, detectGLCapabilities, fetch} from '@tensorflow/tfjs-react-native';
import './assets/box.png';
import './assets/shapes.jpeg';
// import ImgToBase64 from 'react-native-image-base64';
import {getBase64String} from 'react-native-image-base64'
// import {decode as atob, encode as btoa} from 'base-64'

var baseStringSample;


const TensorCamera = cameraWithTensors(Camera);

class App extends React.Component {
    state = {
        isTfReady: false
    };

    constructor(props) {
        super(props)
        this.resizeWidth = 152;
        this.resizeHeight = 200;
        this.loadShapes()
    }

     async loadShapes() {
         console.log("Start loading shapes")
         // const image = require('./assets/shapes.jpeg');

         const image = require('./assets/shapes.jpeg');
         const imageAssetPath = Image.resolveAssetSource(image);
         const response = await fetch(imageAssetPath.uri, {}, { isBinary: true}); // is binary problematic
         const rawImageData = await response.arrayBuffer();
         const imageTensor = decodeJpeg(rawImageData).mean(2).reshape(this.resizeHeight, this.resizeWidth);
         imageTensor.print()
         this.shapesTensor = imageTensor
         console.log("End loading shapes")

         // const image = require('./assets/shapes.jpg');
         // const imageAssetPath = Image.resolveAssetSource(image);
         // console.log("image asset path " + imageAssetPath)
         // let response = await fetch(imageAssetPath, {isBinary: true})
         // // const response = await fetch(imageAssetPath)
         // // console.log('response ' + response)
         // let response = await fetch(imageAssetPath.uri, {}, {isBinary: true});
         // const rawImageData = await response.arrayBuffer();
         // console.log("raw image data " + rawImageData)
         // this.shapesTensor = decodeJpeg(rawImageData)
         // this.shapesTensor = this.shapesTensor.mean(2).reshape(this.resizeHeight, this.resizeWidth);
         // console.log("SHAPES A SLDKFJSLDKJFLKSJDLFJLSDF")
         // this.shapesTensor.print()
         // console.log("SHAPES B lskjhdfkljsdfjsdklfhsdkjfh")
     }

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
            // await detectGLCapabilities(gl)
            let nextImageTensor = await images.next().value;
            nextImageTensor = nextImageTensor.mean(2) // makes image greyscale
            let shapesProduct = tf.mul(nextImageTensor, this.shapesTensor)
            console.log("shapes multiplied")
            shapesProduct.print()
            // nextImageTensor = tf.cast(nextImageTensor, "complex64")
            // console.log("FFT Start")
            // console.log(nextImageTensor.shape)
            // let fft_out = nextImageTensor.cast("complex64").fft().cast("int32")
            // // fft_out.print()
            // console.log(fft_out.shape)
            // console.log("FFT End")
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
                    resizeHeight={ this.resizeHeight}
                    resizeWidth={this.resizeWidth}
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
