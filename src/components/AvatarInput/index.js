import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../services/api';

import ImagePicker from 'react-native-image-picker';

export default function AvatarInput() {

  const [avatar, setAvatar] = useState('');

  const [file, setFile] = useState('');

  const imagePickerOptions = {
    title: 'Selecione uma Opção',
    takePhotoButtonTitle: 'Tirar Foto',
    chooseFromLibraryButtonTitle: 'Fotos da Galeria',
  };
  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }
    if (data.error) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data); // sempre que o usuario escolher uma foto, mas pode alterar
  }

  // upload de imagem
  async function UploadImage() {
    try {
      const data = new FormData();
      const infoImage = {
        name: avatar.fileName,
        type: avatar.type,
        uri: avatar.uri,
      }
      data.append('file', infoImage);

     const response = await api.post('add-avatar', data);
     console.log(response);
     console.log('DEU BOM',response);

  }catch(err){
    console.log('Deu ruim', err);
    }
  }

  useEffect(() => {
    async function loadFile() {

      const response = await api.get('users');
      setFile(response.data);
    }
    loadFile();

 },[file]);


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          ImagePicker.showImagePicker(imagePickerOptions, imagePickerCallback)
        }>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: file
                ? file.avatar.url :
               'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.pinterest.com%2Fmonicamuhlbauer%2Flogo-fotografia%2F&psig=AOvVaw1HrhjvOteY7jyo_awALPFY&ust=1606448836588000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDNs7qmn-0CFQAAAAAdAAAAABAQ',
              }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity styele={styles.Salvar} onPress={UploadImage}>
        <Text style={styles.text}>Salvar Foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,

  },
  Salvar: {
    padding: 15,
    backgroundColor: '#f04',
  },
  text: {
    color: '#f04',
  }
});
