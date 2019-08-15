import React from 'react';
import './App.css';
import { createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import DenseTable from './components/DenseTable';

const request = require('request')

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#999999'
    },
  },
});


const rows = [];

var logPath = "/api/logs/"
var refreshPath = "/api/update/"

function httpGet(path) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open("GET", path, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

function refreshLogs() {
  var x = httpGet(refreshPath)
  console.log(x)
}

function getLogsFromServer() {
  var x = httpGet(logPath)

  var parsedArray = JSON.parse(JSON.parse(x))
  for (var i = 1; i < parsedArray.length; i += 1)
  {
    var x = JSON.parse(parsedArray[i])
    craftData(x)
  }
} 


function craftData(obj) {
  //Method, Date, Agent, Params, Query, ContentType, Authorization
  var tmpMethod;
  var tmpDate;
  var tmpAgent;
  var tmpParams;
  var tmpQuery;
  var tmpContentType;
  var tmpAuthorization;
  var _default = "N/A"
  //console.log("CraftDataCalled")

  if(obj.hasOwnProperty('method'))
  {
    tmpMethod = obj.method

  }
  else
  {
    tmpMethod = _default
  }
  if(obj.hasOwnProperty('timestamp'))
  {
    tmpDate = obj.timestamp
  }
  else
  {
    tmpDate = _default
  }
  if(obj.hasOwnProperty('agent'))
  {
    tmpAgent = obj.agent
  }
  else
  {
    tmpAgent = _default
  }
    if(obj.hasOwnProperty('params'))
  {
    tmpParams = JSON.stringify(obj.params)
  }
  else
  {
    tmpParams = _default
  }
    if(obj.hasOwnProperty('query'))
  {
    tmpQuery = JSON.stringify(obj.query)
  }
  else
  {
    tmpQuery = _default
  }
    if(obj.hasOwnProperty('contenttype'))
  {
    tmpContentType = obj.contenttype
  }
  else
  {
    tmpContentType = _default
  }
  if(obj.hasOwnProperty('Authorization'))
  {
    tmpAuthorization = JSON.stringify(obj.Authorization)
  }
  else
  {
    tmpAuthorization = _default
  }

  var tmpObject = createData(tmpMethod, tmpDate, tmpAgent, tmpParams, tmpQuery, tmpContentType, tmpAuthorization)

  rows.push(tmpObject)
  
}


function createData(Method, Date, Agent, Params, Query, ContentType, Authorization) {
  return { Method, Date, Agent, Params, Query, ContentType, Authorization };
}


//Get Fresh logs 
refreshLogs()
//create rows array to pass to table as props 
getLogsFromServer()






function App() {
  return (
    <div className="App">
      <ThemeProvider theme={ theme }>
        <DenseTable rows={rows}/>   
      </ThemeProvider>
    </div>
  );
}
export default App;
