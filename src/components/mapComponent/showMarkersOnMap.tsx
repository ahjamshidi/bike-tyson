import * as React from 'react';
import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { BikeMarker } from './tree-marker';
import { UserReport } from '@/interfaces/userReport';
import { Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
type BikeMatkerType = {
  key: string;
  name: string;
  bicycle?: {
    colour?: string;
    category?: string;
    gender?: string;
    photo?: string;
    type?: string;
    value?: number;
  };
  position: google.maps.LatLngLiteral;
};
export type ClusteredBikeMarkersProps = {
  bikes: BikeMatkerType[];
};
export function ShowMarkersOnMap({
  reportData,
}: {
  reportData: UserReport[] | undefined;
}) {
  const [markers, setMarkers] = React.useState<{ [key: string]: Marker }>({});
  const [selectedBikeKey, setSelectedBikeKey] = React.useState<string | null>(
    null
  );
  const [bikes, setBikes] = React.useState<BikeMatkerType[]>([]);
  const clearOverlays = () => {
    const markersArray = Object.values(markers);
    for (var i = 0; i < markersArray.length; i++) {
      // markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  };

  React.useEffect(() => {
    if (!reportData) {
      console.log(reportData);
      clearOverlays();
      clusterer?.clearMarkers();
      
    }
    const bikesData = reportData?.map((curr) => {
      return {
        ...curr,
        key: curr.id + '' || '',
        name: curr?.bicycle?.brand || '',
        position: { lat: curr.lat || 0, lng: curr.lng || 0 },
      };
    });
    setBikes(bikesData || []);
  }, [reportData]);

  const selectedBike = React.useMemo(
    () =>
      bikes && selectedBikeKey
        ? bikes.find((t) => t.key === selectedBikeKey)!
        : null,
    [bikes, selectedBikeKey]
  );
  const map = useMap();

  //   map?.data.forEach(function(feature) {
  //     // filter...
  //     map.data.remove(feature);
  // });
  // map?.unbindAll();

  
  const clusterer = React.useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  React.useEffect(() => {
    if (!clusterer) return;
    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = React.useCallback(
    (marker: Marker | null, key: string) => {
      setMarkers((markers) => {
        if ((marker && markers[key]) || (!marker && !markers[key]))
          return markers;

        if (marker) {
          return { ...markers, [key]: marker };
        } else {
          const { [key]: _, ...newMarkers } = markers;

          return newMarkers;
        }
      });
    },
    []
  );

  const handleInfoWindowClose = React.useCallback(() => {
    setSelectedBikeKey(null);
  }, []);

  const handleMarkerClick = React.useCallback((bike: BikeMatkerType) => {
    setSelectedBikeKey(bike.key);
  }, []);
  return (
    <>
      {bikes &&
        bikes.map((bike) => (
          <BikeMarker
            key={bike.key}
            bike={bike}
            onClick={handleMarkerClick}
            setMarkerRef={setMarkerRef}
          />
        ))}

      {selectedBikeKey && (
        <InfoWindow
          anchor={markers[selectedBikeKey]}
          onCloseClick={handleInfoWindowClose}
        >
          <Typography variant="subtitle2" component="p">
            Model:{' '}
            <Typography variant="body2" component="span">
              {selectedBike?.name}
            </Typography>
          </Typography>
          <Typography variant="subtitle2" component="p">
            Value:{' '}
            <Typography variant="body2" component="span">
              <NumericFormat
                value={selectedBike?.bicycle?.value}
                prefix="€"
                displayType="text"
                thousandSeparator
              />
            </Typography>
          </Typography>
          <Typography variant="subtitle2" component="p">
            Colour :{' '}
            <Typography variant="body2" component="span">
              {selectedBike?.bicycle?.colour}
            </Typography>
          </Typography>
        </InfoWindow>
      )}
    </>
  );
}
