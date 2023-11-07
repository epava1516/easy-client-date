import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef();

    // Función para formatear la hora
    const formatTime = (timestamp) => {
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: inputText,
                timestamp: new Date(),
                user: 'Me', // Reemplazar con la lógica de usuario actual
            };

            setMessages((prevMessages) => [newMessage, ...prevMessages]);
            setInputText('');
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToIndex({ index: 0, animated: true });
        }
    }, [messages]);

    const renderMessageItem = ({ item }) => {
        return (
            <View style={styles.messageBubble}>
                <Text>{item.text}</Text>
                <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
                inverted // Invierte el orden de la lista
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Escribe tu mensaje aquí..."
                    returnKeyType="send"
                    onSubmitEditing={sendMessage} // Permite enviar el mensaje con el botón de enviar del teclado
                />
                <Button title="Enviar" onPress={sendMessage} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesList: {
        flex: 1,
    },
    messageBubble: {
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#e5e5ea',
        borderRadius: 20,
        maxWidth: '80%', // Asegúrate de que las burbujas de mensajes no sean demasiado anchas
    },
    timestamp: {
        alignSelf: 'flex-end',
        fontSize: 10,
        color: '#999', // Un color más suave para el timestamp
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd', // Un color de borde más claro
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#fff', // Un fondo blanco para el input
        elevation: 1, // Agrega sombra en Android
        shadowOpacity: 0.1, // Agrega sombra en iOS
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 3 },
    },
});

export default ChatScreen;
