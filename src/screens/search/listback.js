import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
    { id: '1', title: 'Anuncio 1' },
    { id: '2', title: 'Anuncio 2' },
    // ... agregar más datos aquí
];

const Listado = () => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={data}
                renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default Listado;
