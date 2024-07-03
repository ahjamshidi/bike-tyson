type PageRouteType = { [key: string]: { path: string; title: string } };
const PageRoute: PageRouteType = {
  welcome: { path: '/welcome', title: '' },
  login: { path: '/login', title: '' },
  register: { path: '/register', title: '' },
  profile: { path: '/profile', title: 'my profile' },
  editUser: { path: '/edit-profile', title: 'edit your profile' },
  HomePage: { path: '/', title: '' },
  AddBikePage: { path: '/add-bike', title: 'add new bike' },
  MyBikesPage: { path: '/my-bikes-list', title: 'my bikes' },
  EditBikePage: { path: '/edit-bike/:id', title: 'edit your bike data' },
  stolenBikeReport: { path: '/stolen-bike-report', title: 'report bike theft' },
  UserReportsPage: { path: '/user-reports-list', title: 'stolen cases' },
  UserReportPage: { path: '/user-report/:id', title: 'report detail' },
};
export const CONFIG: {
  appName: string;
  BaseURL: string;
  BikeImgPlaceholder: string;
  BicycleBucketName: string;
  GoogleLogin: string;
  MainPages: string[];
  PageRoute: PageRouteType;
} = {
  appName: 'BikeTyson',
  BaseURL: process.env.BACKENDURL || 'http://localhost:3000',
  BikeImgPlaceholder: '/placeholder_biketyson.png',
  BicycleBucketName:
    process.env.BICYCLE_BUCKET_NAME || 'byketyson-bicycle-photos',
  GoogleLogin: process.env.BACKENDURL + '/auth/google',
  MainPages: [
    PageRoute.HomePage.path,
    PageRoute.MyBikesPage.path,
    PageRoute.UserReportsPage.path,
    PageRoute.profile.path,
    PageRoute.login.path,
  ],
  PageRoute: PageRoute,
};
