import * as React from 'react';
import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { mapNumberToColor } from '@/utils/mapNumberToColor';
import { getPoliceReportByDate } from '@/services/policeReportService';
const GREENCOLOR: [number, number, number] = [0, 255, 0];
const REDCOLOR: [number, number, number] = [255, 0, 0];
export function LoadDataOnMap() {
  const map = useMap();
  const latLong = { lat: 52.52, lng: 13.405 };
  const [infoWindowPosition, setinfoWindowPosition] = React.useState(latLong);
  const [reportData, setReportData] = React.useState();
  const [infoContent, setinfoContent] = React.useState('');
  const isGeoJsonLoaded = React.useRef(false);
  React.useEffect(() => {
    const getReport = async () => {
      const reports = await getPoliceReportByDate();
      setReportData(reports.lor_stats);
      // console.log(reports.lor_stats);
    };
    getReport();
  }, []);
  React.useEffect(() => {
    if (map && !isGeoJsonLoaded.current && reportData) {
      map?.data.loadGeoJson('./berlin-lor.geojson', null, () => {
        isGeoJsonLoaded.current = true;
      });

      map?.data.setStyle((feature: google.maps.Data.Feature) => {
        const PLRID = feature.getProperty('PLR_ID') as string;
        let fillColor = mapNumberToColor(7, 0, 10, GREENCOLOR, REDCOLOR);
        if (reportData) {
          // console.log(PLRID);
          // console.log();
          const colorLevel = reportData[PLRID].color_level;
          fillColor = mapNumberToColor(colorLevel, 0, 10, GREENCOLOR, REDCOLOR);
        }

        return {
          fillColor: fillColor,
          strokeWeight: 1,
          fillOpacity: 0.6,
        };
      });
      map.data.addListener(
        'click',
        function (event: google.maps.Data.MouseEvent) {
          const feature = event.feature;
          const name = feature.getProperty('PLR_NAME') as string;
          setinfoContent(name);
          if (event.latLng) setinfoWindowPosition(event.latLng);
        }
      );
    }
  }, [map, reportData]);

  return (
    <>
      {infoContent && (
        <InfoWindow position={infoWindowPosition}>{infoContent}</InfoWindow>
      )}
    </>
  );
}
