import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/Api'; // Asegúrate que la ruta sea correcta
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthenticated } = useAuth();

    const handleLogin = async () => {
        // try {
        //     const response = await apiClient.post('/login', { email, password });
        //     const { token } = response.data;
        //     await AsyncStorage.setItem('userToken', token);
        //     setAuthenticated(true);
        //     navigation.replace('Perfil'); // Reemplaza con el nombre de tu pantalla de perfil
        // } catch (error) {
        //     Alert.alert('Login Error', error.response?.data?.message || 'An unexpected error occurred');
        // }
        navigation.replace('Perfil'); // Reemplaza con el nombre de tu pantalla de perfil
    };

    const handleSignUp = () => {
        navigation.navigate('Registro'); // Reemplaza con el nombre de tu pantalla de registro
    };

    // Aquí puedes implementar la funcionalidad de 'Olvidé mi contraseña'
    const handleForgotPassword = () => {
        Alert.alert('Reset Password', 'Password reset functionality not implemented.');
    };

    const showAlert = (viewId) => {
        Alert.alert('Alert', 'Button pressed ' + viewId);
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.editButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleForgotPassword}
                >
                    <Text style={styles.info}>Forgot your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                >
                    <Text style={styles.info}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '90%',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    editButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    info: {
        color: '#1E90FF',
        marginTop: 10,
    },
    // Si tienes más estilos, por favor añádelos aquí
});

export default LoginScreen;
