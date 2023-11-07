import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const UserProfile = ({ navigation }) => {
    const profile = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        bio: 'Software engineer and cat lover',
        avatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: profile.avatar }}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.info}>{profile.name}</Text>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.info}>{profile.email}</Text>
                <Text style={styles.label}>Bio</Text>
                <Text style={styles.info}>{profile.bio}</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('UserEditScreen')} // Suponiendo que 'EditProfile' es el nombre de la ruta de la pantalla de edición
                >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Añadido para darle un color de fondo
    },
    infoContainer: {
        width: '80%',
    },
    label: {
        marginTop: 20,
        color: '#333', // Cambiado para mejorar la legibilidad
        fontWeight: 'bold', // Añadido para estilo
    },
    info: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        color: '#555', // Cambiado para mejorar la legibilidad
        marginBottom: 10, // Añadido para dar espacio entre campos
        backgroundColor: '#fff', // Añadido para diferenciar el campo
    },
    avatarContainer: {
        marginBottom: 40, // Aumentado para dar más espacio entre la imagen y la información
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editButton: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center', // Centrar el botón en la pantalla
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center', // Asegura que el texto esté centrado dentro del botón
    },
    // Se eliminaron los estilos no utilizados: changeAvatarButton, changeAvatarButtonText, button, buttonText
});

export default UserProfile;
