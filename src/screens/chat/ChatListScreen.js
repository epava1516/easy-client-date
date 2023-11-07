import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Función auxiliar para ordenar los chats
const getSortedChats = (chats) => {
    return [...chats].sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return a.name.localeCompare(b.name);
    });
};

const ChatListScreen = ({ navigation }) => {
    const [chats, setChats] = useState([
        { id: '1', name: 'Chat 1', lastMessage: 'Hola, ¿cómo estás?', isFavorite: false },
        { id: '2', name: 'Chat 2', lastMessage: '¿Te llegó el paquete?', isFavorite: false },
        // ... otros chats
    ]);

    // Solo ordenamos los chats cuando el componente se monta por primera vez
    useEffect(() => {
        setChats((currentChats) => getSortedChats(currentChats));
    }, []);

    // Función para ir al chat específico
    const goToChat = (chatId, chatName) => {
        navigation.navigate('ChatScreen', { chatId, chatName });
    };

    // Función para manejar la eliminación de un chat
    const handleDelete = (chatId) => {
        setChats((currentChats) =>
            getSortedChats(currentChats.filter((chat) => chat.id !== chatId))
        );
    };

    // Función para alternar el estado de favorito
    const toggleFavorite = (chatId) => {
        setChats((currentChats) => {
            const updatedChats = currentChats.map((chat) =>
                chat.id === chatId ? { ...chat, isFavorite: !chat.isFavorite } : chat
            );
            return getSortedChats(updatedChats);
        });
    };

    // Separador para la lista
    const renderSeparator = () => {
        return <View style={styles.separator} />;
    };

    // Renderiza un ítem de la lista de chats
    const renderChatItem = ({ item, index }) => {
        // Función para determinar si debemos mostrar la barra separadora especial
        const showSpecialSeparator = () => {
            if (index === 0) return false;
            const prevChat = chats[index - 1];
            return !item.isFavorite && prevChat.isFavorite;
        };

        return (
            <View>
                {showSpecialSeparator() && <View style={styles.specialSeparator} />}
                <View style={styles.chatItem}>
                    <TouchableOpacity onPress={() => goToChat(item.id, item.name)} style={styles.chatTouchable}>
                        <Text style={styles.chatTitle}>{item.name}</Text>
                        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
                        <Text style={styles.buttonText}>{item.isFavorite ? '★' : '☆'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    chatTouchable: {
        flex: 1,
        justifyContent: 'center',
    },
    chatTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: 'grey',
    },
    favoriteButton: {
        marginLeft: 'auto',
        padding: 10,
    },
    deleteButton: {
        padding: 10,
    },
    buttonText: {
        fontSize: 24,
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    specialSeparator: {
        height: 1,
        backgroundColor: '#000',
    },
});

export default ChatListScreen;
