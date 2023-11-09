import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Listado from './list';
import Mapa from './map';

const SearchScreen = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' o 'map'

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'list' ? 'map' : 'list');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title={viewMode === 'list' ? 'Ver Mapa' : 'Ver Listado'} onPress={toggleViewMode} />
                {/* Espacio entre botones */}
                <View style={{ flex: 1 }} />
                <Button title="Filtros" onPress={() => {/* Aquí lógica para mostrar filtros */}} />
            </View>

            {viewMode === 'list' ? (
                <Listado />
            ) : (
                <Mapa />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    listView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchScreen;
