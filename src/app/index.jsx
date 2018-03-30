import React from 'react'
import ReactDOM from 'react-dom'

import ChewyTestRun from 'json-loader!content/chewy.json'

import 'styles/style.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import TestRun from 'components/testrun'

/* not used, but this makes sure webpack puts these images in dist/images */
import Image1 from 'images/file1.png'
import Image2 from 'images/file2.png'
import Image3 from 'images/file3.png'
import Image4 from 'images/file4.png'
import Image5 from 'images/file5.png'
import Image6 from 'images/file6.png'

export default function App() {
  if (module.hot) module.hot.accept();

  return (
    <MuiThemeProvider>
      <AppBar title={ChewyTestRun["app_name"]} showMenuIconButton={false} />
      <TestRun run={ChewyTestRun} />
    </MuiThemeProvider>
  );
};

ReactDOM.render(App(), document.getElementById('page'));
