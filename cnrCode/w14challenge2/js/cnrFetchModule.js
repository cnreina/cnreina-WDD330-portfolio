/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrFetchBaseURL = "http://127.0.0.1:8080/"


window.onload = function () {
  console.log('cnrFetchModule\n');
}; // window.onload


/* ************************************************************************* */
// FUNCTIONS

/** cnrPOSTcnrCommand */
export function cnrPOSTcnrCommand(cnrCommandParam, cnrArgsParam, cnrResponseCallbackParam, cnrErrorCallbackParam){
  fetch(cnrFetchBaseURL + "cnrCommand", {
    "method": "POST",
    "headers": {
      "user-agent": "vscode-restclient",
      "host": "localhost:8080",
      "content-type": "application/json",
      "accept": "application/json",
      "connection": "close"
    },
    "body": JSON.stringify({
      "type": "server",
      "encoding": "string",
      "command": cnrCommandParam,
      "args": cnrArgsParam
    })
  })
  .then(response => {
    // console.log(response);
    cnrResponseCallbackParam(response);
  })
  .catch(err => {
    // console.error(err);
    cnrErrorCallbackParam(err);
  });
}; // cnrPOSTcnrCommand
