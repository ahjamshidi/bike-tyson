import * as React from 'react';
import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { mapNumberToColor } from '@/utils/mapNumberToColor';
import { Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { InfoWindowContent } from '@/interfaces/policeReport';
const WHITE_COLOR_RGB: [number, number, number] = [255, 255, 255];
const ORANG_COLOR_RGB: [number, number, number] = [255, 87, 34];

export function LoadDataOnMap({ reportData }: { reportData: any }) {
  const map = useMap();
  const latLong: any = { lat: 52.52, lng: 13.405 };
  const initinfoContent = {
    title: '',
    lor_code: '',
    num_thefts: 0,
    theft_percentage: 0,
    population: 0,
    total_value: 0,
    color_level: 0,
  };
  const [infoWindowPosition, setinfoWindowPosition] = React.useState(latLong);
  // const [reportData, setReportData] = React.useState<PoliceReportList>();
  const [infoContent, setinfoContent] =
    React.useState<InfoWindowContent>(initinfoContent);
  const [isInfoWindowVisible, setIsInfoWindowVisible] = React.useState(false);
  const isGeoJsonLoaded = React.useRef(false);

  
  React.useEffect(() => {
    if (map && !isGeoJsonLoaded.current && reportData) {
      map?.data.loadGeoJson(
        './berlin-lor.geojson',
        { idPropertyName: 'PLR_ID' },
        () => {
          isGeoJsonLoaded.current = true;
        }
      );

      map?.data.setStyle((feature: google.maps.Data.Feature) => {
        const PLRID = feature.getProperty('PLR_ID') as string;
        let fillColor = mapNumberToColor(
          7,
          0,
          10,
          WHITE_COLOR_RGB,
          ORANG_COLOR_RGB
        );
        if (reportData) {
          const colorLevel = reportData[PLRID].color_level;
          fillColor = mapNumberToColor(
            colorLevel,
            0,
            10,
            WHITE_COLOR_RGB,
            ORANG_COLOR_RGB
          );
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
          const PLRID = feature.getProperty('PLR_ID') as string;
          const name = feature.getProperty('PLR_NAME') as string;
          const areaData = {
            title: name,
            lor_code: PLRID,
            num_thefts: reportData[PLRID].num_thefts,
            theft_percentage: reportData[PLRID].theft_percentage,
            population: reportData[PLRID].population,
            total_value: reportData[PLRID].total_value,
            color_level: reportData[PLRID].color_level,
          };
          setinfoContent(areaData);
          if (event.latLng) {
            setinfoWindowPosition(event.latLng);
            setIsInfoWindowVisible(true);
          }
        }
      );
    }
  }, [map, reportData]);

  return (
    <>
      {isInfoWindowVisible && (
        <InfoWindow
          position={infoWindowPosition}
          headerContent={<h3 style={{ margin: 0 }}>{infoContent.title}</h3>}
          onCloseClick={() => setIsInfoWindowVisible(false)}
        >
          <Typography variant="subtitle2" component="p">
            thefts cases:{' '}
            <Typography variant="body2" component="span">
              {infoContent.num_thefts}
            </Typography>
          </Typography>
          <Typography variant="subtitle2" component="p">
            thefts total value:{' '}
            <Typography variant="body2" component="span">
              <NumericFormat
                value={infoContent.total_value}
                prefix="€"
                displayType="text"
                thousandSeparator
              />
            </Typography>
          </Typography>
          <Typography variant="subtitle2" component="p">
            population :{' '}
            <Typography variant="body2" component="span">
              <NumericFormat
                value={infoContent.population}
                displayType="text"
                thousandSeparator
              />
            </Typography>
          </Typography>
        </InfoWindow>
      )}
    </>
  );
}
