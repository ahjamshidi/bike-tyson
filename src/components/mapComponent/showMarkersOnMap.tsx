import * as React from 'react';
import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { BikeMarker } from './tree-marker';
import { Bike, loadBikeDataset } from './bikes';
export type ClusteredBikeMarkersProps = {
  bikes: Bike[];
};
export function ShowMarkersOnMap() {
  const [markers, setMarkers] = React.useState<{ [key: string]: Marker }>({});
  const [selectedBikeKey, setSelectedBikeKey] = React.useState<string | null>(
    null
  );
  const [bikes, setBikes] = React.useState<Bike[]>([]);
  React.useEffect(() => {
    //TODO get Data from api
    loadBikeDataset().then((data) => setBikes(data));
  }, []);

  const selectedBike = React.useMemo(
    () =>
      bikes && selectedBikeKey
        ? bikes.find((t) => t.key === selectedBikeKey)!
        : null,
    [bikes, selectedBikeKey]
  );
  const map = useMap();

  const clusterer = React.useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);
  React.useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
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

  const handleMarkerClick = React.useCallback((tree: Bike) => {
    setSelectedBikeKey(tree.key);
  }, []);
  return (
    <>
      {bikes.map((tree) => (
        <BikeMarker
          key={tree.key}
          bike={tree}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedBikeKey && (
        <InfoWindow
          anchor={markers[selectedBikeKey]}
          onCloseClick={handleInfoWindowClose}
        >
          {selectedBike?.name}
        </InfoWindow>
      )}
    </>
  );
}
