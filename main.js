var PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvJRCbVcicfksJ\nqGEgpwKAcpmwav9I/0NYUp+6tlGQI0edda2zPAfjnkPKCAb/5ZMiJN7OEAA1nAnD\ncj3a18yP84UAaXfGN0n8qXTGP07SpdJc42HpjukUyOa/ufhDKnyU9f6Qf5H3mNX9\nHdI1oed5qUzwGknmsuT0aH1j9IYN5PzjlTHlgaX6rp3gtLMlVlM3ZrY/9VdeYtGr\na1fQIQCS8cC9mZafHuqeM+eA7INkSVRcPLV7/XNRVFru2ma7ODzTl59srNY3smWj\nTeA5QDrhY8iiN1r62igqhu1VlecIUY5whij6clZs0UxWREugj/fnEOsD/JLhFm6n\n+2rsCs9XAgMBAAECgf8NV0Vsj5w4T2Zn1euQESifoBsU1RGc/dSjZafFER4lXIqX\n897HSEtRizyepv3hgBs0/pn6GD3r13bm7EzJ3qY2UNZQsbft4UhBdqbucuQOJ5Ne\nf/N1Vu1qJ+Nrtz6x3wqeTh6V4yG7OmkSXrMkYrC/E6ZIo7f9WqMV+t+SPY34gNhu\nPAC8ycopD2hArXGfUhu1DBpkQlitkSsKHJMoQFTte+9IFIjheprHTdrhbDq4w4B0\nKivX8guKlbCib+ETxZrRdoqrjH2AnI/tKv7thMfuYyFJTMVMBeO5yV8pAxO3QOs/\nA9npQsElGaSyiqDMAnhrncHPsyrB+OxuMK/GqbECgYEA4jzi2vz/1/c6feR4NqjV\nvFYUqsHKrXFwmhxtpWKyTJYtxKfxrji2rhzhlsJIYT+tlI1X2OU+fLDJ4B2ilw0J\nGu73Ic8o3eikiZWtuvdWPk4g0oFlKL6PjFsQ4LJSH2PngsionoGnOeEZPYWAy8fI\nGuDqGwK2NpEq6+18pJIlnvECgYEAxi9+syzj6PG7cTYzV7qrgtImliQT2LMBXYtR\nh4NoSJy4qdPRtGY6esQpLX/q5StDe0/9egTNjcY4rHOnOITQ2IFGbr0l96MNAvBY\n9g02A8whVk+woI3E4MAFLigSt4XRTUzVstM4hs9ErwLZe2dh5IG7dQ734Ca0nkLZ\nIrE0YscCgYB87h5fy2IEgnN8XZO8q1ML44UaHlWrnX8OuzAZKf1HqY6wkAU3rf3C\n/BPeyn5ppV5XMA4Yqc7t0DpKVlMYkow6oUc7Fkh88iEaENuU6Uxor4AUfnu8Gi7u\n1MLnMdGDoAmSAPiMPxB3N8RWYsiSv0nS/eyI6eBxFYzcJ5Ky1jmMIQKBgQCX4CfZ\nSWpyxmUdsiqQbXYoL8HwRz+KTkuakzxsfBB7rNZ7Ft9avwjLse3Yd3HcI1Z4dmlK\ni8m2fxRJW+vnDSk68X63OG6TIrnC6ctS6/bb3CAkE7fIojwg/CY8I+uMBpnKAjq1\n6tYjwUziTW26+xPy2FR+tXTRqve5XIMn6eK6WwKBgQDTZFhO3jF/ZRBzZjIIDUnq\nsJxsTubILLde+q5q+dWJvpeJejgJWQEOdCDLdpt6aiKre6lAo9fPbK2o3hrMX4lM\nV2vbciFWQ/dADZpcTKR5bZs96JhaKP6I+ERJDHma+YC+95ar4wF1h66HGUNpggII\npNlTsBKijAMqR96I2F6UfA==\n-----END PRIVATE KEY-----\n';
var CLIENT_EMAIL = 'chatbotproject-340809@appspot.gserviceaccount.com';

/**
 * Authorizes and makes a request to the Hangouts Chat API for :
 * - Getting all spaces the bot is installed
 * - Sending message when space is a Direct Message space
 */

var service = getChatbotService();
//var ss = SpreadsheetApp.getActiveSheet();

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
var range = sheet.getDataRange();
//
var listQuestionAWS = ss.getSheets()[1];
// list question
var rangeListQuestionAWS = listQuestionAWS.getDataRange();
// list answer
var rangeListAnswerAWS = listQuestionAWS.getDataRange();
const rndInt = Math.floor(Math.random() * 38) + 1;
let noSend = 1;
var arrayForNoSend = [];
// google cache
const scripCache = CacheService.getScriptCache();

function main() {

  var data = getDataAll();
  // Array
  for (var i = 1; i < data.length; i++) {
    var rowData = getDataEachRow(data, i);
    
    if (checkTime(rowData) == true) {
      sendPushMessage(rowData, i);
    }
  }
  

  // array for Listquestion
  var dataListQuestion = getDataForListQuestion();
  //scripCache.put('noSend', noSend);
  //noSend = parseInt(scripCache.get('noSend'));
  var rowDataListQuestionRnd = getDataEachRowListQuestion(dataListQuestion, rndInt);
  if(checkTimeForListQuestion(rowDataListQuestionRnd) == true ){
    sendPushMessageForListQuestion(rowDataListQuestionRnd);
    noSend = noSend + 1;
    if(noSend > 3){
      noSend = 1;
    }
    scripCache.put(
      'noSend', noSend
    );
    console.log("nosend test");
    console.log(noSend);
  } 

  //send noSend for cache
  // console.log(scripCache.get('noSend'));
  // var noSend = scripCache.get('noSend')
  
  // array for ListAnswer
  // var dataListAnswer = getDataforListAnswer();
  // for(var i = 1; i < dataListAnswer.length; i++){
  //   var rowDataListAnswer = getDataEachRowListAnswer(dataListAnswer, i);
  //   if(noSend == rowDataListAnswer.noForSend){
  //     if(checkTimeForListExplain(rowDataListAnswer) == true){
  //     sendPushMessageForListExplain(rowDataListAnswer, i);
  //     scripCache.remove('noSend');
  //     }
  //   }
  // }

}

//getdata for sheet 1
function getDataAll() {
  // TODO: Get all data from spreadsheet
  return range.getValues();
}

//for Listquestion
function getDataForListQuestion(){
  // TODO: Get all data from spreadsheet 2
  return rangeListQuestionAWS.getValues();
}

function getDataforListAnswer(){
  return rangeListAnswerAWS.getValues();
}


function getDataEachRow(allData, i) {
  // TODO: Get data corresponding with row i
  // Return to below type 
  // rowData = {
  //   groupName: "xxxx",
  //   message: "YYY",
  //   daysOfWeek: [],
  //   daysOfMonth: [],
  //   times: DateTime
  //   timesType: AM,PM
  //   tagName:   nextversion
  // }
  // [GroupName, "", true, false]
  // allData[i]
  // row = allData[i]
  // row[0]
  // row[1]
  var daysOfWeek = [];
  for (var j = 4; j < 11; j++) {
    if (allData[i][j] == true) {
      daysOfWeek.push(j - 4);
    }
  }

  var daysOfMonth = [];
  if (allData[i][11] != "") {
    daysOfMonth = String(allData[i][11]).split(",");
  }

  var hours = allData[i][12];
  var minute = allData[i][13];
  var timeType = allData[i][14];

  return {
    groupName: allData[i][0],
    message: allData[i][3],
    daysOfWeek: daysOfWeek,
    daysOfMonth: daysOfMonth, // allData[i][11].split(","), // TODO 
    hours: hours, // TODO
    minute: minute,
    timeType: timeType,
  };
}

//for Listquestion
function getDataEachRowListQuestion(allDataList, i){
  // TODO: Get data corresponding with row i
  // Return to below type 
  // rowData = {
  //   groupName: "xxxx",
  //   noForSend: "zzz",
  //   messageListQuestion: "YYY",
  //   timesForQuestion: "AAA"
  //   minuteForSend: "BBB"
  //   dayForSend: "C,C,C",
  // }
  // [GroupName, "", true, false]
  // allData[i]
  // row = allData[i]
  // row[0]
  // row[1]

  var dayForQuestion= [];
  if (allDataList[1][6] != "") {
    dayForQuestion = String(allDataList[1][6]).split(",");
  }
  
  var timesForQuestion = allDataList[1][3];
  var minuteForQuestion = allDataList[1][4];
  var timeTypeForQuestion = allDataList[1][5];

   return {
    groupName: allDataList[1][0],
    noForSend: allDataList[i][1],
    messageListQuestion: allDataList[i][2],
    //messageExplain: allDataList[i][3], // no need 0808
    timesForQuestion: timesForQuestion, 
    minuteForQuestion: minuteForQuestion,
    timeTypeForQuestion: timeTypeForQuestion,
    dayForQuestion: dayForQuestion,
  };
  
}


function checkTime(rowData) {
  var today = new Date();
  //var currentdayOfWeek = today.getDay();
  var options = { weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Tokyo"};
  var strToGetdayofweek = today.toLocaleString('en-US',options);
  var arrGetdayofweek = strToGetdayofweek.split(",");
  var currentdayOfWeek = arrGetdayofweek[0];

  switch(currentdayOfWeek){
    case 'Sun' : currentdayOfWeek = 0;
    break;
    case 'Mon' : currentdayOfWeek = 1;
    break;
    case 'Tue' : currentdayOfWeek = 2;
    break;
    case 'Wed' : currentdayOfWeek = 3;
    break; 
    case 'Thu' : currentdayOfWeek = 4;
    break;
    case 'Fri' : currentdayOfWeek = 5;
    break;
    case 'Sat' : currentdayOfWeek = 6;
    break;
  }
  

  // var dateCurrent = String(today.getDate());
  // var hourCurrent = today.getHours();
  // var minuteCurrent = today.getMinutes();

  //const strDateTime = new Date(",3/30/2022, 9:50:47 AM").toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
  const strCurrentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
  var currentDate = "";
  var currentHour = "";
  var currentMinute = "";

  var arrayCurrentDateTime = strCurrentDateTime.split(" ");
  var strDate = arrayCurrentDateTime[0];
  var strTime = arrayCurrentDateTime[1];
  var strtimesType = arrayCurrentDateTime[2];
  var arrayCurrentDate = strDate.split("/");
  var arrayCurrentTime = strTime.split(":");
  currentDate = arrayCurrentDate[1];
  currentHour = arrayCurrentTime[0];
  currentMinute = arrayCurrentTime[1];

  //currentDate = parseInt(currentDate);
  currentHour = parseInt(currentHour);
  currentMinute = parseInt(currentMinute);

  // if(rowData.daysOfWeek.includes(currentdayOfWeek) && rowData.daysOfMonth.includes(currentDate) && currentHour == rowData.hours && currentMinuter == rowData.minute && strAM == rowData.timeType)
  // {
  //   //case select dayofweek and dayofmonth
  //   return true;
  // }
  return (rowData.daysOfWeek.includes(currentdayOfWeek) || rowData.daysOfMonth.includes(currentDate)) &&
    currentHour == rowData.hours && currentMinute == rowData.minute && strtimesType == rowData.timeType;
}

//for Listquestion
function checkTimeForListQuestion(rowDataListQuestion){
  var today = new Date();
  //var currentdayOfWeek = today.getDay();
  var options = { weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Tokyo"};
  var strToGetdayofweek = today.toLocaleString('en-US',options);
  var arrGetdayofweek = strToGetdayofweek.split(",");
  var currentdayOfWeek = arrGetdayofweek[0];

  
  switch(currentdayOfWeek){
    case 'Sun' : currentdayOfWeek = "0";
    break;
    case 'Mon' : currentdayOfWeek = "1";
    break;
    case 'Tue' : currentdayOfWeek = "2";
    break;
    case 'Wed' : currentdayOfWeek = "3";
    break; 
    case 'Thu' : currentdayOfWeek = "4";
    break;
    case 'Fri' : currentdayOfWeek = "5";
    break;
    case 'Sat' : currentdayOfWeek = "6";
    break;
  }

  //const strDateTime = new Date(",3/30/2022, 9:50:47 AM").toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
  const strCurrentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
  var currentDate = "";
  var currentHour = "";
  var currentMinute = "";

  var arrayCurrentDateTime = strCurrentDateTime.split(" ");
  var strDate = arrayCurrentDateTime[0];
  var strTime = arrayCurrentDateTime[1];
  var strtimesType = arrayCurrentDateTime[2];
  var arrayCurrentDate = strDate.split("/");
  var arrayCurrentTime = strTime.split(":");
  currentDate = arrayCurrentDate[1];
  currentHour = arrayCurrentTime[0];
  currentMinute = arrayCurrentTime[1];

  //currentDate = parseInt(currentDate);
  currentHour = parseInt(currentHour);
  currentMinute = parseInt(currentMinute);

  //currentMinute push then + rowDataListQuestion.timesForSend - 60

  var checkTimeRunListQuestionAWS = false;
  
  // if(currentMinute % rowDataListQuestion.timesForQuestion == 0){
  //   return true;
  // }

  // if(currentMinute % rowDataListQuestion.timesForQuestion == 0 && (hourAM.includes(currentHour)&& strtimesType == "AM") || (hourPM.includes(currentHour) && strtimesType == "PM")){
  //   return true;
  // }
  
  if(strtimesType == rowDataListQuestion.timeTypeForQuestion)
  {
     checkTimeRunListQuestionAWS = true;
  }

  // check time send with currentHour and check day

  console.log(rowDataListQuestion.timesForQuestion);
  console.log(currentHour);
  console.log(rowDataListQuestion.minuteForQuestion);
  console.log(currentMinute);
  console.log(rowDataListQuestion.dayForQuestion);
  console.log(currentdayOfWeek);
  

  if(rowDataListQuestion.timesForQuestion == currentHour && rowDataListQuestion.minuteForQuestion == currentMinute && checkTimeRunListQuestionAWS == true && rowDataListQuestion.dayForQuestion.includes(currentdayOfWeek))
  {
    return true;
  }
}

// function checkTimeForListExplain(rowDataListAnswer){
//   var today = new Date();
//   //var currentdayOfWeek = today.getDay();
//   var options = { weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Tokyo"};
//   var strToGetdayofweek = today.toLocaleString('en-US',options);
//   var arrGetdayofweek = strToGetdayofweek.split(",");
//   var currentdayOfWeek = arrGetdayofweek[0];

//   switch(currentdayOfWeek){
//     case 'Sun' : currentdayOfWeek = 0;
//     break;
//     case 'Mon' : currentdayOfWeek = 1;
//     break;
//     case 'Tue' : currentdayOfWeek = 2;
//     break;
//     case 'Wed' : currentdayOfWeek = 3;
//     break; 
//     case 'Thu' : currentdayOfWeek = 4;
//     break;
//     case 'Fri' : currentdayOfWeek = 5;
//     break;
//     case 'Sat' : currentdayOfWeek = 6;
//     break;
//   }
  

//   // var dateCurrent = String(today.getDate());
//   // var hourCurrent = today.getHours();
//   // var minuteCurrent = today.getMinutes();

//   //const strDateTime = new Date(",3/30/2022, 9:50:47 AM").toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
//   const strCurrentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
//   var currentDate = "";
//   var currentHour = "";
//   var currentMinute = "";

//   var arrayCurrentDateTime = strCurrentDateTime.split(" ");
//   var strDate = arrayCurrentDateTime[0];
//   var strTime = arrayCurrentDateTime[1];
//   var strtimesType = arrayCurrentDateTime[2];
//   var arrayCurrentDate = strDate.split("/");
//   var arrayCurrentTime = strTime.split(":");
//   currentDate = arrayCurrentDate[1];
//   currentHour = arrayCurrentTime[0];
//   currentMinute = arrayCurrentTime[1];

//   //currentDate = parseInt(currentDate);
//   currentHour = parseInt(currentHour);
//   currentMinute = parseInt(currentMinute);
  

//   for(var j = 0; j < 30; j++){
//         if(currentMinute == (rowDataListAnswer.timesForQuestion * j) + rowDataListAnswer.timesForAnswer){
//              return true;
//         }
//   }
// }



function sendPushMessage(rowData, i) {
  const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });

  // TODO: Send message to room corresponding with rowData
  if (service.hasAccess()) {
    //We retrieve all the spaces bot has been added
    var url = 'https://chat.googleapis.com/v1/spaces';
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
    var rep = JSON.parse(response.getContentText());
    if (rep.spaces && rep.spaces.length > 0)
     {
      for (var a = 0; a < rep.spaces.length; a++)
      {
        var currentGroupName = rep.spaces[a].name.slice(7,18);
        if (currentGroupName == rowData.groupName) 
        {
          var groupNameRow = rowData.groupName.row;

          var space = rep.spaces[a];
          // have if check group name and send message name
          
            var url = 'https://chat.googleapis.com/v1/' + space.name + '/messages';
            var options =
            {
              method: 'POST',
              contentType: 'application/json',
              headers:
              {
                Authorization: 'Bearer ' + service.getAccessToken()
              },
              payload: JSON.stringify({ text: rowData.message })
            }

            //We send message to the DM room
            UrlFetchApp.fetch(url, options);
          
        }
      }
    } else {
      Logger.log('Bot is not added to any spaces');
    }
  } else {
    Logger.log(service.getLastError());
  }

}


//for ListQuestion
function sendPushMessageForListQuestion(rowDataListQuestion,i){
  //const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
 
    // TODO: Send message to room corresponding with rowData
  if (service.hasAccess()) {
    //We retrieve all the spaces bot has been added
    var url = 'https://chat.googleapis.com/v1/spaces';
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
    var rep = JSON.parse(response.getContentText());
    if (rep.spaces && rep.spaces.length > 0)
     {
      for (var a = 0; a < rep.spaces.length; a++)
      {
        var currentGroupName = rep.spaces[a].name.slice(7,18);
        if (currentGroupName == rowDataListQuestion.groupName) 
        {
          var groupNameRow = rowDataListQuestion.groupName.row;

          var space = rep.spaces[a];
          // have if check group name and send message name
          
            var url = 'https://chat.googleapis.com/v1/' + space.name + '/messages';
            var options =
            {
              method: 'POST',
              contentType: 'application/json',
              headers:
              {
                Authorization: 'Bearer ' + service.getAccessToken()
              },
              payload: JSON.stringify({ text: rowDataListQuestion.messageListQuestion })

            }
            
            //We send message to the DM room
            UrlFetchApp.fetch(url, options);
          
        }
      }
    } else {
      Logger.log('Bot is not added to any spaces');
    }
  } else {
    Logger.log(service.getLastError());
  }
}



// function sendPushMessageForListExplain(rowDataListAnswer,i){
//   //const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });

  
  
//     // TODO: Send message to room corresponding with rowData
//   if (service.hasAccess()) {
//     //We retrieve all the spaces bot has been added
//     var url = 'https://chat.googleapis.com/v1/spaces';
//     var response = UrlFetchApp.fetch(url, {
//       headers: {
//         Authorization: 'Bearer ' + service.getAccessToken()
//       }
//     });
//     var rep = JSON.parse(response.getContentText());
//     if (rep.spaces && rep.spaces.length > 0)
//      {
//       for (var a = 0; a < rep.spaces.length; a++)
//       {
//         var currentGroupName = rep.spaces[a].name.slice(7,18);
//         if (currentGroupName == rowDataListAnswer.groupName) 
//         {
//           var groupNameRow = rowDataListAnswer.groupName.row;

//           var space = rep.spaces[a];
//           // have if check group name and send message name
          
//             var url = 'https://chat.googleapis.com/v1/' + space.name + '/messages';
//             var options =
//             {
//               method: 'POST',
//               contentType: 'application/json',
//               headers:
//               {
//                 Authorization: 'Bearer ' + service.getAccessToken()
//               },
//               payload: JSON.stringify(
//                 { text: rowDataListAnswer.messageExplain},
//                 { text: rowDataListAnswer.noForSend}
//               )
//             }

//             //We send message to the DM room
//             // if(rowDataListQuestion.noForSend == randomListQuestionNO)
//             // {
//             //   UrlFetchApp.fetch(url, options);
//             // }

//             UrlFetchApp.fetch(url, options);
//         }
//       }
//     } else {
//       Logger.log('Bot is not added to any spaces');
//     }
//   } else {
//     Logger.log(service.getLastError());
//   }

  
  
// }

// function getDataAll(){
//   for (var i = 1; i < values.length; i++) {
//   var row = "";
//   for (var j = 0; j < values[i].length; j++) {
//     if (values[i][j]) {
//       row = row + values[i][j];
//     }
//     row = row + ",";
//   }
//   Logger.log(i);
//   Logger.log(row);
//   //Logger.log(values[1][0]);
// }
// }

// function getDataEachRow(){
//  // Logger.log(values[1][0]);
// }



// function sendPushMessage() {
//   // var service = getChatbotService();
//   // var sheet = SpreadsheetApp.getActiveSheet();

//   // // data take form google sheet
//   //  var dataGroup = sheet.getRange('A2').getValue();
//   //  var dataText  = sheet.getRange('C2').getValue();
//   //  var dataTime  = sheet.getRange('D2').getValue();


//   if (service.hasAccess()) {
//     //We retrieve all the spaces bot has been added
//     Logger.log(values[1][0]);
//     var url = 'https://chat.googleapis.com/v1/spaces';
//     var response = UrlFetchApp.fetch(url, {
//       headers: {
//         Authorization: 'Bearer ' + service.getAccessToken()
//       }
//     });
//     var rep = JSON.parse(response.getContentText());
//     if(rep.spaces && rep.spaces.length > 0){
//       for(var i = 0; i < rep.spaces.length; i++) {
//         var space = rep.spaces[i];
//         // have if check group type

//           for(var j = 0; j < values.length; j++){
//              Logger.log(values.length)
//           var url = 'https://chat.googleapis.com/v1/'+space.name+'/messages';

//           var options = {
//             method : 'POST',
//             contentType: 'application/json',
//             headers: {
//               Authorization: 'Bearer ' + service.getAccessToken()
//             },
//             payload : JSON.stringify({ text: values[j][3]})
//           }

//           //We send message to the DM room
//           UrlFetchApp.fetch(url, options);
//           }
//       }
//     }else{
//       Logger.log('Bot is not added to any spaces');
//     }
//   } else {
//     Logger.log(service.getLastError());
//   }
// }

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getService().reset();
}

/**
 * Test access token is well returned
 */
function getAccessTokenTest() {
  var service = getChatbotService();
  if (service.hasAccess()) {
    Logger.log(service.getAccessToken());
  } else {
    Logger.log(service.getLastError());
  }
}


// /**
//  * Configures the Chatbot service.
//  */
function getChatbotService() {
  return OAuth2.createService('MyChatBot')
    // Set the endpoint URL.
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')

    // Set the private key and issuer.
    .setPrivateKey(PRIVATE_KEY)
    .setIssuer(CLIENT_EMAIL)

    // Set the property store where authorized tokens should be persisted.
    .setPropertyStore(PropertiesService.getScriptProperties())

    // Set the scope. This must match one of the scopes configured during the
    // setup of domain-wide delegation.
    .setScope('https://www.googleapis.com/auth/chat.bot');
}
