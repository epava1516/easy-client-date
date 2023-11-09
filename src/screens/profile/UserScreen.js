import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
    const navigation = useNavigation();

    const userInfo = {
        fullName: 'Jane Doe',
        nickname: 'Jane',
        email: 'jane.doe@example.com',
        phone: '+1234567890',
        isEscort: false, // Este campo puede ser controvertido dependiendo del contexto de uso
        title: 'Software Engineer',
        description: 'Passionate about technology and cats.',
        location: 'San Francisco, CA',
        rates: 'Contact for details',
        services: 'Full-stack development, Project management',
        avatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: userInfo.avatar }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <Text style={styles.info}>{userInfo.fullName}</Text>
                    <Text style={styles.label}>Nickname</Text>
                    <Text style={styles.info}>{userInfo.nickname}</Text>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.info}>{userInfo.email}</Text>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.info}>{userInfo.phone}</Text>
                    <Text style={styles.label}>Location</Text>
                    <Text style={styles.info}>{userInfo.location}</Text>
                    {userInfo.isEscort && (
                        <>
                            <Text style={styles.label}>Title</Text>
                            <Text style={styles.info}>{userInfo.title}</Text>
                            <Text style={styles.label}>Description</Text>
                            <Text style={styles.info}>{userInfo.description}</Text>
                            <Text style={styles.label}>Rates</Text>
                            <Text style={styles.info}>{userInfo.rates}</Text>
                            <Text style={styles.label}>Services</Text>
                            <Text style={styles.info}>{userInfo.services}</Text>
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('Editar perfil')} // Asegúrate de que 'UserEditScreen' está registrado en tu stack de navegación
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
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
    infoContainer: {
        width: '90%',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    info: {
        marginBottom: 5,
    },
    editButton: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    editButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default UserProfile;
