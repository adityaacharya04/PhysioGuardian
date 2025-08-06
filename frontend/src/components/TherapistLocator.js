import React, { useEffect, useRef } from 'react';

const therapists = [
  { name: 'Dr. Smith', lat: 34.0522, lng: -118.2437, specialty: 'Sports Injuries' },
  { name: 'Dr. Jones', lat: 34.055, lng: -118.25, specialty: 'Back Pain' },
  { name: 'Dr. Williams', lat: 34.05, lng: -118.24, specialty: 'Geriatrics' },
];

const TherapistLocator = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const google = window.google;
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 34.0522, lng: -118.2437 },
      zoom: 13,
    });

    therapists.forEach((therapist) => {
      const marker = new google.maps.Marker({
        position: { lat: therapist.lat, lng: therapist.lng },
        map,
        title: therapist.name,
      });

      const infowindow = new google.maps.InfoWindow({
        content: `<h3>${therapist.name}</h3><p>Specialty: ${therapist.specialty}</p>`,
      });

      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default TherapistLocator;
