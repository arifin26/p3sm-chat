import React from 'react';

import Router from './router';
import {Provider} from 'react-redux';
import storeState from './redux/store';
import Notif from './service';
export default function App() {
  return (
    <Provider store={storeState}>
      <Router />
    </Provider>
  );
}

// getLoginAPI = () => {

//   let details = {
//       'username': 'username',
//       'password': 'demo'
//   };

//   let formBody = [];
//   for (let property in details) {
//       let encodedKey = encodeURIComponent(property);
//       let encodedValue = encodeURIComponent(details[property]);
//       formBody.push(encodedKey + "=" + encodedValue);
//   }
//   formBody = formBody.join("&");

//   fetch('url', {
//       method: 'POST',
//       headers: {
//           'Authorization': 'Bearer token',
//           'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: formBody
//   }).then((response) => response.json())
//       .then((responseData) => {
//           console.log(responseData);

//           AlertIOS.alert(
//               "POST Response",
//               "Response Body " + JSON.stringify(responseData.role)
//           );
//       })
//       .done();
// };
