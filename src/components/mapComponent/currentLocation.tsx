import { Fab, useTheme } from '@mui/material';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';
import { useMap } from '@vis.gl/react-google-maps';
export function CurrentLocation() {
  const theme = useTheme();
  const map = useMap();
  const saveUserLocation = (location: { lat: number; lng: number } | null) => {
    if (location) {
      map?.panTo(location);
      const targetZoom = 18;
      const currentZoom = map?.getZoom()|| 12;

      // Determine zoom direction
      const zoomStep = targetZoom > currentZoom ? 1 : -1;

      function performZoom() {
        const currentZoom = map?.getZoom() || 12;
        if (currentZoom !== targetZoom) {
          map?.setZoom(currentZoom + zoomStep);
          setTimeout(performZoom, 150); // Adjust timeout for smoother or quicker zoom
        }
      }
      performZoom();
    }
  };
  function getUserLocation(
    callback: (location: { lat: number; lng: number } | null) => void
  ) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location', error);
          alert(
            'Error getting location. Please make sure location services are enabled.'
          );
          callback(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
      callback(null);
    }
  }
  return (
    <>
      <Fab
        aria-label="add"
        sx={{
          position: 'absolute',
          bottom: 140,
          right: 20,
          backgroundColor: theme.palette.common.white,
        }}
        onClick={() => getUserLocation(saveUserLocation)}
      >
        <MyLocationRoundedIcon sx={{ color: 'black' }} />
      </Fab>
    </>
  );
}
