import React from 'react';
import _ from "lodash";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={17}
    defaultCenter={{ lat: 46.469391, lng: 30.740883 }}
    onClick={props.onMapClick}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{
        scrollwheel: false,
    }}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class GettingStartedExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bounds: null,
            markers: [{
              position: {
                lat: 46.469391,
                lng: 30.740883,
              },
              key: `Odessa`,
              defaultAnimation: 2,
            }],
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
        
    }
  

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleBoundsChanged() {
        this.setState({
            bounds: this._mapComponent.getBounds(),
            center: this._mapComponent.getCenter()
        });
  }

  

  handleMapClick(event) {
        let geocoder = new google.maps.Geocoder;
        let nextMarkers = [
             ...this.state.markers,
             {
                 position: event.latLng,
                 defaultAnimation: 2,
                 key: Date.now(), 
             },
         ];

          
          for (var i=0; i<nextMarkers.length;i++){
              geocodeMe(nextMarkers[i].position);
          }
        const markersAddressesList=[];
         
         function geocodeMe(markers) {
             let returnval;
             geocoder.geocode({'location': markers}, function(results, status) {
              
                 if (status === 'OK') {
                     if (results[0]) {
                        addAddressToList(results[0].formatted_address);
                     } else {
                         console.log('No results found');
                     }              
                 } else {
                     console.log('Geocoder failed due to: ' + status);
                 }
             });
         }
         this.setState({
             markers: nextMarkers,
         });
         

         function addAddressToList(address) {
            markersAddressesList.push(address);
            console.log(markersAddressesList);
        }
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
        <div id="map">
          <div style={{height: `600px`}}>
            
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }
              onMapLoad={this.handleMapLoad}
              onMapClick={this.handleMapClick}
              onBoundsChanged={this.handleBoundsChanged}
              markers={this.state.markers}
              onMarkerRightClick={this.handleMarkerRightClick}
            />
          </div>
        </div>  
    );
  }
}