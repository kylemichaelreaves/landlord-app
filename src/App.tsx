import React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// import TopContainer from './components/TopContainer/TopContainer';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXJlYXZlcyIsImEiOiJja3FvaGcxb2MxbXBjMndvMXYwa2t6NnBlIn0.HhkYznr4TH2i6mnV1KIvRw';

export default function App() {

  const mapContainer = React.useRef<any>(null);
  const [lng, setLng] = React.useState<number>(-74.0632); // these are lat and long coordinates
  const [lat, setLat] = React.useState<number>(40.7346);  // for Journal Square in Jersey City
  const [zoom, setZoom] = React.useState<number>(12);

  var defaultOpacity = .5;

  var propertyDisplay = document.getElementById('propertyAddress');
  var ownerDisplay = document.getElementById('ownerName');
  var ownerAddressDisplay = document.getElementById('ownerAddress');
  var associatedPropertiesDisplay = document.getElementById('associatedProperties');
  
  // can't instantiate this yet, doesn't exist yet in the data
  // var associatedPropertiesDisplay = document.getElementById('associatedProperties');

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.on('load', function () {
      map.addSource('propertyData', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/master/test_data.geojson',
        'generateId': true
      });
      map.addLayer({
        id: 'property-layer',
        source: 'propertyData',
        type: 'circle',
        paint: {
          'circle-opacity': defaultOpacity,
          // colors can change according to case
          'circle-color': 'red',
          // radius can change according to case
          'circle-radius': 8
        }
      });

      // map.on('click', (e) => {
      //   var features = map.queryRenderedFeatures(e.point, {
      //     layers: ['property-layer']
      //   });
      //   if (!features.length) {
      //     return;
      //   };
      //   var feature = features[0]

      //   var popup = new mapboxgl.Popup({ offset: [0, -15] })
      //     .setLngLat(e.lngLat)
      //     .setHTML(
      //       '<h3>' + feature.properties?.property_location + '</h3>' +
      //       '<p>' + feature.properties?.owners_name + '</p>' +
      //       '<p>' + feature.properties?.owners_mailing_address + '</p>' +
      //       '<p>' + feature.properties?.city_state_zip + '</p>' +
      //       '<p>' + feature.properties?.asc_properties_owned + '</p>'
      //     )
      //     .addTo(map);
      // });

      var propertyID: any = null;
      map.on('mousemove', 'property-layer', (e: any) => {
        map.getCanvas().style.cursor = 'pointer';
        
        var propertyAddress = e.features[0]?.properties?.property_location;
        var propertyOwner = e.features[0]?.properties?.owners_name;
        var ownerAddress = e.features[0]?.properties?.owners_mailing_address;
        var associatedProperties = e.features[0]?.properties?.num_asc_properties;
        
        if (e.features.length > 0 && propertyDisplay && ownerDisplay && ownerAddressDisplay && associatedPropertiesDisplay) {
          propertyDisplay.textContent = propertyAddress;
          ownerDisplay.textContent = propertyOwner;
          ownerAddressDisplay.textContent = ownerAddress;
          associatedPropertiesDisplay.textContent = associatedProperties;
        }
        if (propertyID) {
          map.removeFeatureState({
            source: 'propertyData',
            id: propertyID
          });
        }
        propertyID = e.features[0].id;

        map.setFeatureState(
          {
            source: 'propertyData',
            id: propertyID
          },
          {
            hover: true
          }
        );
      });

      map.on('mouseleave', 'property-layer', (e: any) => {
        if (propertyID) {
          map.setFeatureState(
            {
              source: 'propertyData',
              id: propertyID
            },
            {
              hover: false
            }
          );
        }
        propertyID = null;
        if (propertyDisplay && ownerDisplay && ownerAddressDisplay && associatedPropertiesDisplay) {
          // reseting state
          propertyDisplay.textContent = '';
          ownerDisplay.textContent = '';
          ownerAddressDisplay.textContent = '';
          associatedPropertiesDisplay.textContent = '';
        }
        map.getCanvas().style.cursor = '';
      })
    });
  });

  return (
    <div className="App">
        
      <div className="top-container">
        <h3>FindYourLandlord by North Jersey DSA</h3>
        {/* spans id must match their instatiation as vars */}
        <div><strong>Address:</strong> <span id='propertyAddress'></span></div>
        <div><strong>Owner:</strong> <span id='ownerName'></span></div>
        <div><strong>Owner's Address:</strong> <span id='ownerAddress'></span></div>
        <div><strong>Number of Associated Properties with Owner: </strong><span id='associatedProperties'></span></div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}