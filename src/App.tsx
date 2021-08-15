import React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import TopContainer from './components/TopContainer/TopContainer';
import { defaultColors, color4, color3, color2, color1, white, defaultOpacity, dsaRed } from './constants';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXJlYXZlcyIsImEiOiJja3FvaGcxb2MxbXBjMndvMXYwa2t6NnBlIn0.HhkYznr4TH2i6mnV1KIvRw';

export default function App() {

  const mapContainer = React.useRef<any>(null);
  const [lng, setLng] = React.useState<number>(-74.0632); // these are lat and long coordinates
  const [lat, setLat] = React.useState<number>(40.7346);  // for Journal Square in Jersey City
  const [zoom, setZoom] = React.useState<number>(12);

  var propertyDisplay = document.getElementById('propertyAddressRef');
  var ownerDisplay = document.getElementById('ownerNameRef');
  var ownerAddressDisplay = document.getElementById('ownerAddressRef');
  var associatedPropertiesDisplay = document.getElementById('associatedPropertiesRef');
  var hoverStateId = null;

  React.useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    function flyToAddress(currentFeature: GeoJSON.GeoJsonProperties) {
      map.flyTo({
        center: currentFeature?.geometry.coordinates,
        zoom: 15
      });
    }

    function getOwnedProperties(owner: string) {
      let url = 'https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/master/test_data.geojson';
      const data: GeoJSON.GeoJsonProperties = fetch(url).then((r) => r.json())

      return data.features.map(function (f: GeoJSON.Feature) {
        return f?.properties?.owners_name
      })

      // return data.features.properties.map(function(f: GeoJSON.GeoJsonProperties) {
      //     return f?.properties.property_location
      //   })
    }

    // function createPopUp(currentFeature: GeoJSON.GeoJsonProperties) {
    //   var popUps = document.getElementsByClassName('mapboxgl-popup');
    //   if (popUps[0]) popUps[0].remove();

    //   var popup = new mapboxgl.Popup({
    //     closeOnClick: false
    //   })
    //   if (currentFeature) {
    //     popup.setLngLat(currentFeature.geometry.coordinates)
    //     popup.setHTML(
    //       '<h3>Sweetgreen</h3>' +
    //       '<h4>' + currentFeature.properties.address + '</h4>'
    //     )
    //     popup.addTo(map);
    //   }
    // }

    //   function getBbox(sortedAddresses: any, addressIdentifier: any, searchResult: any) {
    //     var lats = [
    //       sortedAddresses.features[addressIdentifier].geometry.coordinates[1],
    //       searchResult.coordinates[1]
    //     ];
    //     var lons = [
    //       sortedAddresses.features[addressIdentifier].geometry.coordinates[0],
    //       searchResult.coordinates[0]
    //     ];
    //     var sortedLons = lons.sort(function (a, b) {
    //       if (a > b) {
    //         return 1;
    //       }
    //       if (a.distance < b.distance) {
    //         return -1;
    //       }
    //       return 0;
    //     });
    //     var sortedLats = lats.sort(function (a, b) {
    //       if (a > b) {
    //         return 1;
    //       }
    //       if (a.distance < b.distance) {
    //         return -1;
    //       }
    //       return 0;
    //     });
    //     return [
    //       [sortedLons[0], sortedLats[0]],
    //       [sortedLons[1], sortedLats[1]]
    //     ];
    //   }

    //   function getBuildingAtPoint(features: GeoJSON.GeoJsonProperties, source: any) {
    //     if (features) {
    //     var filtered = features.filter(function (feature: any) {
    //       var pointSource = feature.layer.source;
    //       return pointSource.indexOf(source) > -1;
    //     });
    //     return filtered[0];
    //   }
    // }
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
          'circle-radius': [
            "interpolate",
            ["exponential", .75],
            ["zoom"],
            8, ["case",
              ["boolean", ["feature-state", "hover"], false],
              // to-number transforms the string "units" into an integer
              ["interpolate", ["linear"], ["to-number", ["get", 'units']], 0, 10, 100, 20],
              ["interpolate", ["linear"], ["to-number", ["get", 'units']], 0, 2, 100, 10]
            ],
            16, ["case",
              ["boolean", ["feature-state", "hover"], false],
              ["interpolate", ["linear"], ["to-number", ["get", 'units']], 0, 12, 100, 24],
              ["interpolate", ["linear"], ["to-number", ["get", 'units']], 0, 4, 100, 20]
            ],
            22, ["case",
              ["boolean", ["feature-state", "hover"], false],
              ["interpolate", ["linear"], ["to-number", ["get", 'units']], 0, 200, 100, 400],
              ["interpolate", ["linear"], ["to-number", ["get", 'units']], 0, 180, 100, 900]
            ]
          ],


          'circle-opacity': defaultOpacity,

          'circle-color': [
            "case",
            // to-number returns the string as a number
            [">=", ["to-number", ["get", 'num_asc_properties']], 100],
            color4,
            [">=", ["to-number", ["get", 'num_asc_properties']], 10],
            color3,
            [">=", ["to-number", ["get", 'num_asc_properties']], 3],
            color2,
            [">", ["to-number", ["get", 'num_asc_properties']], 0],
            color1,
            white
          ]

        }
      });

      map.on('click', (e) => {

        var features = map.queryRenderedFeatures(e.point, {
          layers: ['property-layer']
        });

        if (!features.length) {
          return;
        };

        var feature = features[0];

        var popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(e.lngLat)
          .setHTML(
            '<h3>' + feature.properties?.property_location + '</h3>' +
            '<p>' + feature.properties?.owners_name + '</p>' +
            '<p>' + feature.properties?.owners_mailing_address + '</p>' +
            '<p>' + feature.properties?.city_state_zip + '</p>' +
            '<p>' + feature.properties?.num_asc_properties + '</p>'
          )
          .addTo(map);
        flyToAddress(feature);

        let propertyLocation = feature?.properties?.property_location;
        let owner = feature?.properties?.owners_name;
        let associatedProperties = feature?.properties?.asc_properties

        console.log(`${propertyLocation} is owned by ${owner}`);
        console.log(`...who owns ${associatedProperties} property/ies`)
        if (associatedProperties.length > 1) {
          console.log(`${owner} also owns: ${associatedProperties}`);
        }
      });


      // propertyID isn't going to be any, but number | null;
      var propertyID: any = null;

      map.on('mousemove', 'property-layer', (e: GeoJSON.GeoJsonProperties) => {
        map.getCanvas().style.cursor = 'pointer';

        var feature = e?.features[0]

        var propertyAddress = e?.feature?.properties?.property_location;
        var propertyOwner = e?.feature?.properties?.owners_name;
        var ownerAddress = e?.feature?.properties?.owners_mailing_address;
        var associatedProperties = e?.feature?.properties?.num_asc_properties;

        var relatedFeatures = map.querySourceFeatures('property-layer', {
          sourceLayer: 'property-layer',
          filter: ['in', 'property-layer', feature.properties.asc_properties]
        });

        if (e?.features.length > 0 && propertyDisplay && ownerDisplay && ownerAddressDisplay && associatedPropertiesDisplay) {
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
        
        propertyID = e?.features[0].id;

        map.setFeatureState(
          {
            source: 'propertyData',
            id: propertyID
          },
          {
            hover: true
          }
        );
        // console.log(feature.properties.asc_properties)
      });
      // Add highlight layier

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
      <div className='top-container'>
        <TopContainer />
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>

  );
}