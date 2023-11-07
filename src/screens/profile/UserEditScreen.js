import React, { useState } from 'react';
import { Image, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
    // Estado inicial con todos los campos del formulario
    const [formData, setFormData] = useState({
        fullName: '',
        nickname: '',
        email: 'jane.doe@example.com', // Utilizamos el email del perfil original como valor inicial
        phone: '',
        isEscort: false,
        title: '',
        description: '',
        location: '',
        rates: '',
        services: '',
    });

    const navigation = useNavigation();

    // Actualiza el estado del formulario para un campo específico
    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = () => {
        // Aquí iría la lógica de envío, como un POST a una API
        console.log(formData);
        navigation.goBack(); // Vuelve a la pantalla anterior
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar3.png' }}
                />
                <TouchableOpacity style={styles.changeAvatarButton} onPress={() => {/* open image picker */ }}>
                    <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre completo"
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
            />
            <Text style={styles.label}>Nick</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nick"
                value={formData.nickname}
                onChangeText={(text) => handleInputChange('nickname', text)}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el teléfono"
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Escort</Text>
                <Switch
                    value={formData.isEscort}
                    onValueChange={(value) => handleInputChange('isEscort', value)}
                />
            </View>
            {formData.isEscort && (
                <>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese el título"
                        value={formData.title}
                        onChangeText={(text) => handleInputChange('title', text)}
                    />
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese la descripción"
                        value={formData.description}
                        onChangeText={(text) => handleInputChange('description', text)}
                    />
                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese la ubicación"
                        value={formData.location}
                        onChangeText={(text) => handleInputChange('location', text)}
                    />
                    <Text style={styles.label}>Tarifas</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese las tarifas"
                        value={formData.rates}
                        onChangeText={(text) => handleInputChange('rates', text)}
                    />
                    <Text style={styles.label}>Servicios</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese los servicios"
                        value={formData.services}
                        onChangeText={(text) => handleInputChange('services', text)}
                    />
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 50,
    },
    form: {
        width: '100%',
    },
    label: {
        marginTop: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginTop: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    // Puedes añadir más estilos según sea necesario
});

export default UserProfile;
