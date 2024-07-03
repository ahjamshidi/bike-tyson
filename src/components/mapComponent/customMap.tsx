import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';

export function CustomMap({
  children,
  defaultCenter = { lat: 52.52, lng: 13.405 },
  handleCenterChanged,
}: {
  children: React.ReactElement[];
  defaultCenter?: { lat: number; lng: number };
  handleCenterChanged?: (ev: MapCameraChangedEvent) => void;
}): React.ReactElement {
  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
      <Map
        mapId={'myMap'}
        style={{ width: '100%', height: '100%' }}
        defaultCenter={defaultCenter}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        reuseMaps={false}
        onCenterChanged={handleCenterChanged}
      />
      {children}
    </APIProvider>
  );
}
