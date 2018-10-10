import React, {Component} from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto'
};

const countryCoordinates = {
  US: [-76.921753, 39.022774],
  UK: [-0.118092, 51.509865],
  JP: [139.839478, 35.652832],
  BE: [4.3517103, 50.8503396],
  BR: [-51.92528, -14.235004],
  CN: [116.363625, 39.913818],
  DE: [13.404954, 52.520008],
  HU: [19.5057541, 47.1611615],
  FI: [24.945831, 60.192059]
};

export default class WorldMap extends Component {
  render() {
    const {countryIso, countryName, companyROI, industryROI} = this.props;
    const coordinates = countryCoordinates[countryIso];

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto'
          }}>
          <ZoomableGroup
            center={[0, 20]}
            disablePanning>
            <Geographies geography='/static/world-50m.json'>
              {(geographies, projection) => {
                return geographies.map((geography, i) => geography.id !== 'ATA' && (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: '#ECEFF1',
                        stroke: '#607D8B'
                      }
                    }}
                  />
                ));
              }}
            </Geographies>
            {coordinates && industryROI &&
            <Markers>
              <Marker
                marker={{markerOffset: -25, coordinates}}
                style={{
                  default: {fill: 'white'},
                  hover: {fill: 'white'}
                }}>
                <rect
                  x={0}
                  y={0}
                  width={150}
                  height={70}
                  fill="#EEE"
                  style={{stroke: '#607D8B', border: '1px solid black'}}/>
                <text
                  x={10}
                  y={20}
                  style={{stroke: 'black', textDecoration: 'underline'}}>
                  {countryName}
                </text>
                <text
                  x={10}
                  y={40}
                  style={{stroke: 'black'}}>
                  ROI: {`${companyROI}%`}
                </text>
                <text
                  x={10}
                  y={60}
                  style={{stroke: 'black'}}>
                  Industry ROI: {`${industryROI}%`}
                </text>
              </Marker>
            </Markers>}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}