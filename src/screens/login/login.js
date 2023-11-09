import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Asegúrate de que la ruta de importación sea correcta

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Usar el hook useAuth para obtener la función de inicio de sesión

    const handleLogin = async () => {
        // Aquí iría la lógica para verificar las credenciales del usuario
        try {
            // Por ejemplo, podrías hacer una petición a tu API
            // const token = await signIn({ email, password }); // Asegúrate de tener una función signIn que haga esto
            // Simulamos una respuesta del API
            const token = 'token_simulado';
            if (token) {
                await login(token); // Utilizar la función login del contexto
                navigation.replace('Perfil'); // Navegar a la pantalla de perfil
            } else {
                // Manejar la situación si las credenciales no son correctas
                Alert.alert('Login Failed', 'Please check your credentials.');
            }
        } catch (error) {
            // Manejar errores aquí, como problemas de red o de servidor
            Alert.alert('Login Error', 'An error occurred during login.');
        }
    };

    const handleSignUp = () => {
        // Aquí iría la lógica para la creación de una nueva cuenta
        // Simulamos una navegación hacia la pantalla de registro
        navigation.navigate('Registro');
    };

    const showAlert = (viewId) => {
        Alert.alert('Alert', 'Button pressed ' + viewId);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => setEmail(value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => setPassword(value)}
                />
            </View>

            <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => showAlert('forgot password')}>
                <Text>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSignUp}>
                <Text>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#00b5ec',
    },
    loginText: {
        color: 'white',
    },
});

export default LoginScreen;
