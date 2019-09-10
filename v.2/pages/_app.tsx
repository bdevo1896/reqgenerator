import App from 'next/app'
import React from 'react'
// import OfflineSupport from '../src/ui/components/util/OfflineSupport';
import Layout from '../src/react/containers/Layout';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
import '../src/styles/css/styles.css';

class MyApp extends App {

  constructor(props) {
    super(props);
  }

  render () {
    const {props} = this as any;
    const { Component, pageProps } = props;
    return (
        <Provider store={store}>
        {/* <OfflineSupport /> */}
        <Layout>
        <Component 
            {...pageProps}
        />
        </Layout>
        </Provider>
    )
  }
}

export default MyApp;