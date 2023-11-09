import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
            <View style={styles.box}>
                <Image style={styles.image} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
                <View style={styles.boxContent}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.lastMessage}</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, styles.view]}
                            onPress={() => toggleFavorite(item.id)}>
                            <Text style={styles.icon}>{item.isFavorite ? '★' : '☆'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.profile]}
                            onPress={() => goToChat(item.id, item.name)}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.message]}
                            onPress={() => handleDelete(item.id)}>
                            <Text style={styles.icon}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50, // added to make the image circular
    },
    box: {
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center', // added to align items vertically
    },
    boxContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        color: '#151515',
    },
    description: {
        fontSize: 15,
        color: '#646464',
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10, // added to give space between text and buttons
    },
    button: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 50,
        marginRight: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
    view: {
        backgroundColor: '#eee',
    },
    profile: {
        backgroundColor: '#1E90FF',
    },
    message: {
        backgroundColor: '#228B22',
    },
    // ... other styles as needed
});

export default ChatListScreen;
