import { APIProvider, Map } from '@vis.gl/react-google-maps';
// import { LoadDataOnMap } from './loadDataOnMap';
// import { ShowMarkersOnMap } from './showMarkersOnMap';

export function CustomMap({
  children,
}: {
  children: React.ReactElement[];
}): React.ReactElement {
  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
      <Map
        mapId={'myMap'}
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 52.52, lng: 13.405 }}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        reuseMaps={true}
      />
      {children}
      {/* <ShowMarkersOnMap /> */}
    </APIProvider>
  );
}
