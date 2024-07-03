import { Bike } from './bikes';
import type { Marker } from '@googlemaps/markerclusterer';
import { useCallback } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
export type BikeMarkerProps = {
  bike: Bike;
  onClick: (tree: Bike) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

/**
 * Wrapper Component for an AdvancedMarker for a single Bike.
 */
export const BikeMarker = (props: BikeMarkerProps) => {
  const { bike, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(bike), [onClick, bike]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, bike.key),
    [setMarkerRef, bike.key]
  );

  return (
    <AdvancedMarker position={bike.position} ref={ref} onClick={handleClick}>
      <DirectionsBikeRoundedIcon className="marker-clustering-tree" color='primary' sx={{fontSize:40}}/>
    </AdvancedMarker>
  );
};
