import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import { connect, updateUserList, offerMade, answerMade } from '../actions/api';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() =>{
    store.dispatch(connect());
    store.dispatch(updateUserList());
    store.dispatch(offerMade());
    store.dispatch(answerMade());
  }, []);

  return (
    <Provider store={store}>
    
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
