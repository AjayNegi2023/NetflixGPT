import './App.css';
import Body from './Components/Body';
import { Provider } from "react-redux";
import appStore from './Utils/appStore';
function App() {
  return (
    <Provider store={appStore}>yyyyyy
      <Body />
    </Provider>
  );
}

export default App;
