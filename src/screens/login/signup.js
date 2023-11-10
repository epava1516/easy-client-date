import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Switch,
    Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/Api';

const SignupScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        username: '',
        age: '',
        gender: '',
        password: '',
        isAdvertiser: false,
    });

    const [errors, setErrors] = useState({});

    const { setAuthenticated } = useAuth();

    const onInputChange = (field, value) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value.trim() }));
        // Restablecer el estado de error para el campo actual
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    const [selectedGender, setSelectedGender] = useState('');

    const checkWithDatabase = async (field, value) => {
        try {
            // Aquí se realiza la petición a la API para verificar la unicidad del campo
            const response = await apiClient.get(`/check-${field}`, {
                params: { value },
            });
            return response.data.isUnique; // Asumiendo que la API devuelve { isUnique: true/false }
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: 'Unable to verify at the moment',
            }));
            return false;
        }
    };

    // Función para manejar el cambio del switch
    const toggleSwitch = () => {
        setForm({ ...form, isAdvertiser: !form.isAdvertiser });
    };

    const validateEmail = async (email) => {
        const trimmedEmail = email.trim();
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(trimmedEmail)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
            return false;
        }
        if (!(await checkWithDatabase('email', trimmedEmail))) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already in use' }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        return true;
    };

    const validateUsername = async (username) => {
        if (/\s/.test(username)) {
            setErrors((prevErrors) => ({ ...prevErrors, username: 'Username cannot contain spaces' }));
            return false;
        }
        if (!(await checkWithDatabase('username', username))) {
            setErrors((prevErrors) => ({ ...prevErrors, username: 'Username already taken' }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
        return true;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must have at least 8 characters, a number, an uppercase and lowercase letter, and a special character' }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        return true;
    };

    const validateName = (name) => {
        if (name.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, name: 'Name cannot be empty' }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
        return true;
    };

    // Función para validar la confirmación del correo electrónico
    const validateConfirmEmail = () => {
        if (form.email !== form.confirmEmail) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmEmail: 'Emails do not match' }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, confirmEmail: '' }));
        return true;
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
            navigation.navigate('Perfil'); // Suponiendo que 'Home' es la pantalla a la que quieres navegar después de registrarse
        } catch (error) {
            // Asumiendo que tu API devuelve errores en un formato estándar
            const message = error.response?.data?.message || error.message;
            Alert.alert('Signup Failed', message);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Inputs para cada campo del formulario */}
                <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Full Name"
                    onChangeText={(value) => onInputChange('name', value)}
                    onBlur={() => validateName(form.name)}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(value) => onInputChange('email', value)}
                    onBlur={() => validateEmail(form.email)}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    style={[styles.input, errors.confirmEmail && styles.inputError]}
                    placeholder="Confirm Email"
                    keyboardType="email-address"
                    onChangeText={(value) => onInputChange('confirmEmail', value)}
                    onBlur={validateConfirmEmail}
                />
                {errors.confirmEmail && <Text style={styles.errorText}>{errors.confirmEmail}</Text>}

                <TextInput
                    style={[styles.input, errors.username && styles.inputError]}
                    placeholder="Username"
                    onChangeText={(value) => onInputChange('username', value)}
                    onBlur={() => validateUsername(form.username)}
                />
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(value) => onInputChange('password', value)}
                    onBlur={() => validatePassword(form.password)}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {/* Campo para la edad (opcional) */}
                <TextInput
                    style={[styles.input, errors.age && styles.inputError]}
                    placeholder="Age (optional)"
                    keyboardType="number-pad"
                    onChangeText={(value) => onInputChange('age', value)}
                />
                {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

                {/* Selector para el género */}
                <View style={[styles.input, styles.inputPicker]}>
                    <Picker
                        selectedValue={selectedGender}
                        onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem} // Solo tendrá efecto en iOS
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Trans" value="trans" />
                    </Picker>
                </View>

                {/* Switch para anunciante */}
                <View style={styles.switchContainer}>
                    <Text>Register as advertiser?</Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={form.isAdvertiser}
                    />
                </View>

                {/* Botón de registro */}
                <TouchableOpacity
                    style={[styles.editButton, !isFormValid() && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={!isFormValid()}
                >
                    <Text style={styles.editButtonText}>Sign Up</Text>
                </TouchableOpacity>

                {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff', // Suponiendo que quieres un fondo blanco para el scrollview
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: Platform.OS === 'android' ? 0 : 10,
        marginTop: 10,
        width: '90%',
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: 'red',
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
    errorText: {
        color: 'red',
        width: '90%',
        textAlign: 'center',
        fontSize: 14,
    },
    buttonDisabled: {
        backgroundColor: '#aaa', // Un gris para indicar que el botón está deshabilitado
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
    },
    label: {
        // Estilo para la etiqueta del input y el picker
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        // Estilo para el contenedor alrededor de tu input y el picker
        marginBottom: 20,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    picker: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    inputPicker: {
        justifyContent: 'center', // Asegúrate de que el texto en Android esté centrado verticalmente
        // La altura debe ser suficiente para el Picker en Android
        paddingHorizontal: Platform.OS === 'android' ? 0 : undefined,
        // Ajustar la altura para Android para que coincida con tus TextInput
        height: Platform.OS === 'android' ? 40 : undefined,
    },
    picker: {
        width: '100%', // El Picker debe ocupar todo el ancho de la View
        backgroundColor: 'transparent',
        // Eliminar cualquier padding interno en Android
        paddingHorizontal: Platform.OS === 'android' ? 0 : undefined,
    },
    pickerItem: {
        ...(Platform.OS === 'ios' && {
            fontSize: 16,
        }),
        // Estilo para los items del Picker en iOS
        fontSize: 16, // Ajusta el tamaño de la fuente aquí
        height: Platform.OS === 'android' ? 50 : undefined, // Establece una altura para Android si es necesario
    },

    // ...otros estilos que necesites...
});

export default SignupScreen;
