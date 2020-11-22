import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import api from '../../services/api';

import ImagePicker from 'react-native-image-picker';

export default function AvatarInput() {

  // const profile = useSelector(state => state.user.profile);

  const [avatar, setAvatar] = useState();

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

  async function UploadImage() {
    try {

    const data = new FormData();

     data.append('files', avatar);

    const response = await api.post('files', data);

    const {uri} = response.data;

    setAvatar(uri);

      }catch(err){
          console.log(err);
        }
  }

  console.log(avatar);


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
              uri: avatar
              ? avatar.uri
              : 'https://i.pinimg.com/originals/bb/35/61/bb3561121f9fa38ddfaff7d5958a2edb.jpg',
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
