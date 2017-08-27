import React, { Component } from 'react'
import { Map, Marker, Popup } from '2gis-maps-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MapComponent extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 15,
            center: [46.469, 30.741],
            markers: [],
            myPosition: [46.469, 30.741]
        }
        
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.removeAllMarkers = this.removeAllMarkers.bind(this);

    }

    componentWillMount() {
        let markers = this.state.markers;
        markers.push(
            <Marker
                pos={this.state.myPosition}
                staticLabel={'I\'m here!'}
                key={this.state.markers.length}
            />
        );
        this.setState({
            markers: markers
        });
    }

    addMarker(e) {
        let markers = this.state.markers;
        const position = [e.latlng.lat, e.latlng.lng];     
        markers.push(
            <Marker
                pos={position}
                key={this.state.markers.length}
            />
        );
        this.setState({
            markers: markers
        });
    };

    removeMarker() {
        let markers = this.state.markers;
        markers.pop();
        this.setState({
            markers: markers
        });
    };

    removeAllMarkers() {
        let markers = this.state.markers;
        markers.length = 0;
        this.setState({
            markers: markers
        });
    }

    render() {
        console.log(this.state.markers);
        const { isAuthenticated } = this.props.authorization;
        const userBlock = (
            <div className="btnsBlock">
                <button onClick={this.removeMarker} disabled={!this.state.markers.length}>Remove last marker</button>
                <button onClick={this.removeAllMarkers} disabled={!this.state.markers.length}>Remove all markers</button>
                <button>Save markers</button>
            </div>
        ); 
        const guestBlock = (
            <div className="btnsBlock">
                <div>To see more functions, please, login</div>
            </div>
        );
        return (
            <div className="mainContent">
                <Map
                    style={{width: "50%", height: "500px"}}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    onClick={this.addMarker}
                >
                    { this.state.markers }
                </Map>       
                { isAuthenticated ? userBlock : guestBlock }
            </div>
        );
    }
}

MapComponent.propTypes = {
    authorization: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization
    }
}


export default connect(mapStateToProps)(MapComponent);