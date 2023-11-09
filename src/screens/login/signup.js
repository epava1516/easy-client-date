import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Asegúrate de que la ruta sea correcta
import apiClient from '../../api/Api'; // Asegúrate de que la ruta sea correcta

const SignupScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        age: '',
        gender: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const onInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validateField = async (field, value) => {
        let isValid = true;
    
        switch (field) {
            case 'name':
                if (value.trim() === '') {
                    setErrors((prevErrors) => ({ ...prevErrors, name: 'Name cannot be empty' }));
                    isValid = false;
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                }
                break;
            case 'email':
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
                    isValid = false;
                } else if (!(await checkWithDatabase('email', value))) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already in use' }));
                    isValid = false;
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                }
                break;
            case 'username':
                if (/\s/.test(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, username: 'Username cannot contain spaces' }));
                    isValid = false;
                } else if (!(await checkWithDatabase('username', value))) {
                    setErrors((prevErrors) => ({ ...prevErrors, username: 'Username already taken' }));
                    isValid = false;
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
                }
                break;
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must have at least 8 characters, a number, an uppercase and lowercase letter, and a special character' }));
                    isValid = false;
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
                }
                break;
            // Agrega aquí más validaciones para otros campos si es necesario
            default:
                break;
        }
        return isValid;
    };
    
    const isFormValid = () => {
        // Verificar que todos los campos han sido validados y están llenos
        return (
            Object.values(errors).every((e) => e === '') &&
            Object.values(form).every((v) => v.trim() !== '')
        );
    };
    

    const handleSignUp = async () => {
        if (!isFormValid()) {
            setErrors({ ...errors, form: 'Please fill in all fields correctly' });
            return;
        }

        try {
            const response = await apiClient.post('/register', form);
            const { token } = response.data;
            await login(token);
            navigation.navigate('Home'); // Suponiendo que 'Home' es la pantalla a la que quieres navegar después de registrarse
        } catch (error) {
            // Asumiendo que tu API devuelve errores en un formato estándar
            const message = error.response?.data?.message || error.message;
            Alert.alert('Signup Failed', message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Inputs para cada campo del formulario */}
            <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Full Name"
                onChangeText={(value) => onInputChange('name', value)}
                onBlur={() => validateField('name')}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value) => onInputChange('email', value)}
                onBlur={() => validateField('email')}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                placeholder="Username"
                onChangeText={(value) => onInputChange('username', value)}
                onBlur={() => validateField('username')}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(value) => onInputChange('password', value)}
                onBlur={() => validateField('password')}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Botón de registro */}
            <TouchableOpacity
                style={[styles.button, !isFormValid() && styles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={!isFormValid()}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        width: '80%',
        marginVertical: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
    },
    buttonDisabled: {
        backgroundColor: 'grey',
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
});

export default SignupScreen;
