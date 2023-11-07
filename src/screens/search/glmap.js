import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
// import { PermissionsAndroid, Platform } from 'react-native';

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DEFAULT_ZOOM = 12;

/**
 * Renders a Google Maps component with the user's current location as the center.
 * @returns {JSX.Element} The Google Maps component.
 */
const GoogleMaps = () => {
    const ref = useRef(null);
    const [center, setCenter] = useState(DEFAULT_CENTER);

    useEffect(() => {
        /**
         * Requests the user's location permission and sets the center of the map to the user's current location.
         */
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'App Location Permission',
                            message: 'App needs access to your location.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                setCenter({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                });
                            },
                            (error) => console.log(error),
                            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                        );
                    } else {
                        console.log('Location permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCenter({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    (error) => console.log(error),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (ref.current) {
            new window.google.maps.Map(ref.current, {
                center: center,
                zoom: DEFAULT_ZOOM,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });
        }
    }, [ref, center]);

    return <div ref={ref} style={{ width: '100%', height: '100vh' }} />;
};

export default GoogleMaps;
