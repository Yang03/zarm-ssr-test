import React from 'react';
import { renderRoutes } from 'react-router-config';


function App({ route }) {
  console.log(route, '------------->')
  return (
    <>
      {renderRoutes(route.routes)}
    </>
  );
}

export default {
  component: App
};
