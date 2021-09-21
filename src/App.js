import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './router/index'
import store from './redux/store'

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
