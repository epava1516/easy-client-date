import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const UserProfile = () => {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState({
        fullName: 'Jane Doe',
        nickname: 'Jane',
        email: 'jane.doe@example.com',
        phone: '+1234567890',
        isEscort: false, // Considera el contexto de tu aplicación antes de utilizar este campo
        title: 'Software Engineer',
        description: 'Passionate about technology and cats.',
        location: 'San Francisco, CA',
        rates: 'Contact for details',
        services: 'Full-stack development, Project management',
        avatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    });

    const toggleSwitch = () => setUserInfo({ ...userInfo, isEscort: !userInfo.isEscort });

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (name, value) => {
        setUserInfo({ ...userInfo, [name]: value });
    };

    // Función para manejar la acción de guardar los cambios
    const handleSave = () => {
        // Aquí deberías agregar la lógica para actualizar la información del usuario
        console.log('Información guardada:', userInfo);
        Alert.alert('Changes saved!');
        navigation.goBack();
    };

    const selectAvatar = () => {
        // Aquí iría la lógica para cambiar el avatar
        // Por ejemplo, podrías usar una librería como 'react-native-image-picker' para seleccionar una imagen
        console.log('Abrir selector de imagen');
        // ImagePicker.showImagePicker(response => {
        //   if (response.didCancel) {
        //     console.log('User cancelled image picker');
        //   } else if (response.error) {
        //     console.log('ImagePicker Error: ', response.error);
        //   } else {
        //     const source = { uri: response.uri };
        //     // Actualizar el estado con la nueva imagen
        //     setUserInfo({...userInfo, avatar: source.uri});
        //   }
        // });
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: userInfo.avatar }}
                    />
                    {/* Asegúrate de que este botón esté correctamente posicionado y estilizado */}
                    <TouchableOpacity onPress={selectAvatar}>
                        <Text style={styles.changeAvatarText}>Change Avatar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('fullName', text)}
                        value={userInfo.fullName}
                    />
                    <Text style={styles.label}>Nickname</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('nickname', text)}
                        value={userInfo.nickname}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('email', text)}
                        value={userInfo.email}
                    />
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('phone', text)}
                        value={userInfo.phone}
                    />
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('location', text)}
                        value={userInfo.location}
                    />
                    <Text style={styles.label}>Escort</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#B0C4DE" }} // Por ejemplo, "lightblue" para un azul claro visible.
                        thumbColor={userInfo.isEscort ? "#1E90FF" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={userInfo.isEscort}
                    />
                    {userInfo.isEscort && (
                        <>
                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handleChange('title', text)}
                                value={userInfo.title}
                            />
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handleChange('description', text)}
                                value={userInfo.description}
                            />
                            <Text style={styles.label}>Rates</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handleChange('rates', text)}
                                value={userInfo.rates}
                            />
                            <Text style={styles.label}>Services</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handleChange('services', text)}
                                value={userInfo.services}
                            />
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    formContainer: {
        width: '90%',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    saveButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    changeAvatarText: {
        color: '#1E90FF', // Asegúrate de que este color se vea sobre el fondo de tu aplicación
        marginTop: 10,
        // Puede que necesites ajustar estos para hacer el texto más visible
        fontSize: 16, // Añade un tamaño de fuente si no es lo suficientemente grande
      },
});

export default UserProfile;
