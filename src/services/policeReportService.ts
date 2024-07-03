import { CONFIG } from '@/constances/config';
import { PoliceReportList } from '@/interfaces/policeReport';
import { UserReport } from '@/interfaces/userReport';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { extractTimeStringFilter } from '@/utils/utils';
import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
const BASE_URL = CONFIG.BaseURL + '/api';
dayjs.extend(utc);
export const getUserReportByDate = async (filters: any | undefined) => {
  let apiUrl = '/user-reports/last-reports/last_stolen/';
  let fromDate = '2023-04-01T00:00:00Z';
  if (filters && filters['start_datetime']) {
    fromDate = filters['start_datetime'];
  }
  return await fetchWrapper.get(`${BASE_URL}${apiUrl}${fromDate}`);
};
export const getPoliceReportByDate = async (filters: any | undefined) => {
  let fromDate = '2022-04-01T00:00:00Z';
  if (filters && filters['start_datetime']) {
    fromDate = filters['start_datetime'];
  }
  return await fetchWrapper.get(
    `${BASE_URL}/data/police-reports?start_datetime=${fromDate}`
  );
};
export const getAllReportByDate = async (filters: any | undefined) => {
  console.log(filters);
  let result: {
    policeReport: PoliceReportList | undefined;
    userReport: UserReport[] | undefined;
  } = { policeReport: undefined, userReport: undefined };
  let dateFilter;
  if (filters) {
    if (filters['start_datetime']) {
      const { unit, amount } = extractTimeStringFilter(
        filters['start_datetime']
      );
      dateFilter = dayjs()
        .utc()
        .subtract(amount, unit as ManipulateType)
        .startOf('day')
        .format('YYYY-MM-DDTHH:mm:ss')
        .toString();
      filters['start_datetime'] = dateFilter;
    }
    if (filters['report_type'] === 'police') {
      result['policeReport'] = await getPoliceReportByDate(filters);
      return result;
    } else if (filters['report_type'] === 'user') {
      result['userReport'] = await getUserReportByDate(filters);
      return result;
    }
  }
  result['policeReport'] = await getPoliceReportByDate(filters);
  result['userReport'] = await getUserReportByDate(filters);
  return result;
};
