import React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXJlYXZlcyIsImEiOiJja3FvaGcxb2MxbXBjMndvMXYwa2t6NnBlIn0.HhkYznr4TH2i6mnV1KIvRw';

export default function App() {
  const mapContainer = React.useRef<any>(null);
  const [lng, setLng] = React.useState<number>(-74.0632);
  const [lat, setLat] = React.useState<number>(40.7346);
  const [zoom, setZoom] = React.useState<number>(12);

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.on('style.load', function () {
      map.addSource('propertyData', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/master/jersey_city_HA.geojson'
      });
      map.addLayer({
        id: 'property-layer',
        source: 'propertyData',
        type: 'circle',
        paint: {
          'circle-radius': 8,
          'circle-opacity': .6,
          'circle-color': 'red'
        }
      });

      map.on('click', (e) => {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['property-layer']
        });
        if (!features.length) {
          return;
        };
        var feature = features[0]
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(e.lngLat)
          .setHTML(
            '<h3>' + feature.properties?.property_location + '</h3>' +
            '<p>' + feature.properties?.owners_name + '</p>' +
            '<p>' + feature.properties?.owners_mailing_address + '</p>' +
            '<p>' + feature.properties?.city_state_zip + '</p>'
          )
          .addTo(map);
      });
    });
  });

  return (
    <div className="App">   
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}      