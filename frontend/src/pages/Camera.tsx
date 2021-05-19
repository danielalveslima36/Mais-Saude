import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CameraComponent = () => { 
    const navigation = useNavigation();
    const camRef = useRef()
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [capturedPhoto, setCapturedPhoto] = useState();
    const [imageBase64, setImageBase64] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync({base64: true});
            setCapturedPhoto(data.base64);
            setImageBase64(`data:image/png;base64,${data.base64}`);            
            setOpen(true);
        }
    }

    function savePhoto() {
        navigation.navigate("Cadastro de Integrante", {capturedPhoto});
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={camRef}/>

            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <FontAwesome name="camera" size={23} color="#FFF"/>
            </TouchableOpacity>

            {capturedPhoto && 
                <Modal animationType ="slide"
                    transparent={false}
                    visible={open}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20, }}>

                        <TouchableOpacity style={{margin: 10}} onPress={() => setOpen(false)}>
                            <FontAwesome name="window-close" size={50} color="#FF0000"/>
                        </TouchableOpacity>

                        <Image style={{width: '100%', height:300, borderRadius: 20}}
                            source={{uri: imageBase64}}></Image>

                        <TouchableOpacity style={styles.button} onPress={savePhoto}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            }
        </View>
    )
}

export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
        maxHeight: 50,
        backgroundColor: '#004269',
        width: '90%'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
