import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '@/constances/config';
import { UserReport } from '@/interfaces/userReport.ts';
import { format, isYesterday } from 'date-fns';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface DateDisplayProps {
  date: Date;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  if (isYesterday(date)) {
    return <span>Yesterday {format(date, 'h:mm a')}</span>;
  } else {
    return <span>{format(date, 'MMMM d, yyyy h:mm a')}</span>;
  }
};

export default function UserReportCard({
  UserReportData,
}: {
  UserReportData: UserReport;
}) {
  // setting button navigations
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ minWidth: 275, display: 'flex', alignItems: 'center' }}>
        <CardContent sx={{ flex: 1 }}>
          <Grid container columnSpacing={2}>
            <Grid item xs={4} sx={{ m: 'auto' }}>
              <img
                width={'100%'}
                srcSet={`${
                  UserReportData?.bicycle?.photos_url[0]
                    ? UserReportData.bicycle.photos_url[0]
                    : CONFIG.BikeImgPlaceholder
                }`}
                src={`${UserReportData?.bicycle?.photos_url[0]}`}
                alt={`${UserReportData?.bicycle?.brand} ${UserReportData?.bicycle?.model}`}
                loading="lazy"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="div">
                {`${UserReportData?.bicycle?.brand} ${UserReportData?.bicycle?.model}`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Frame number: {UserReportData?.bicycle?.frame_num}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Bike colour: {UserReportData?.bicycle?.colour}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {<DateDisplay date={UserReportData.created_at || new Date()} />}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() =>
              navigate(
                `${CONFIG.PageRoute.UserReportPage.path.replace(
                  ':id',
                  UserReportData.id + ''
                )}`,
                {
                  state: { UserReportData },
                }
              )
            }
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
