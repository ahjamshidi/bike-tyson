import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';
const BASE_URL = CONFIG.BaseURL + '/api';
export const getPoliceReportByDate = async () => {
  const result = await fetchWrapper.get(
    `${BASE_URL}/data/police-reports?start_datetime=2023-04-01T00:00:00Z`
  );
  return result;
};
