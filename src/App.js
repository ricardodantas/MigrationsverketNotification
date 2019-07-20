import { createStackNavigator, createAppContainer } from 'react-navigation';
import ApplicationForm from './containers/ApplicationForm';
import ApplicationInfo from './containers/ApplicationInfo';
import AppSettings from "./settings";

const MainNavigator = createStackNavigator({
  ApplicationForm: {screen: ApplicationForm},
  ApplicationInfo: {screen: ApplicationInfo},
},{
  initialRouteName: 'ApplicationForm',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: AppSettings.MAIN_COLOR,
      borderBottomWidth: 0
    },
    headerTintColor: AppSettings.MAIN_FONT_COLOR,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const App = createAppContainer(MainNavigator);

export default App;
