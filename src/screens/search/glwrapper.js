import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const GoogleMapsWrapper = ({ children }) => {
  // Idealmente queremos que la apiKey sea obtenida de una variable de entorno
    const apiKey = "AIzaSyDj696h-pTK4OCvO5nocxdthWoUdb8Tpr4";

    if (!apiKey) {
        return <div>Cannot display the map: google maps api key missing</div>;
    }

    return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

export default GoogleMapsWrapper;
