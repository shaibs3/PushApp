const remote = require('electron').remote
const $ = require("jquery");
function parseRevcontentAds(data) {

    var url = "none"
    var image = "none"

    var headline = "none"

    for (var i in data) {
        headline = data[i].headline;
        url = data[i].url;
        image = data[i].image;
        break;

    }
    var info;
    if (data.length) {
        info = `headline:  ${headline}  url:  ${url}     image: ${image}`
    }
    else {
        info = 'Did not recevice any ads from Revcontent'
    }

    const remote = require('electron').remote

    var dialog = remote.require('electron').dialog
    dialog.showMessageBox({
        message: info,
        buttons: ["OK"]
    });
}

function sendPushNotifications(data) {

    const remote = require('electron').remote

    const segment = document.getElementById('segmentSelect').value;

   


    const Store = require('electron-store');
    const store = new Store();
    const pushengageApiKey = store.get('pushengage_api_key', null);
    if (!pushengageApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }




    if (data.length) {
        headline = data[0].headline;
        url = data[0].url;
        image = data[0].image;
    }

    if (!headline.length || !image.length || !url.length) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Did not send push notifications [No adds retrieved from revcontent]",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }

    var data_msg = 'notification_title=' + headline + '&notification_url=' + url + '&include_segments[0]=' + segment + '&notification_message=';



    $.ajax({
        url: 'https://api.pushengage.com/apiv1/notifications',
        headers: {
            'api_key': pushEngageApiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        dataType: 'json',
        data: data_msg,
        success: function (data) {
            console.log('succes: ' + data);
            var dialog = remote.require('electron').dialog
            dialog.showMessageBox({
                message: "Succesfuly sent push notifications",
                buttons: ["OK"]
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var dialog = remote.require('electron').dialog
            dialog.showMessageBox({
                message: "Error type: " + errorThrown,
                type: "error",
                buttons: ["OK"]
            });
        }
    });


}

function retriveAndParseRevcontentAds() {

    


    const Store = require('electron-store');
    const store = new Store();
    const revcontentApiKey = store.get('revcontent_api_key', null); 
    if (!revcontentApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }


    var data = `api_key=${revcontentApiKey}&widget_id=95943&pub_id=3120&domain=Push.lovemyleads.com`
    $.ajax({
        beforeSend: function () {
            $('.ajax-loader').css("visibility", "visible");
        },
        url: 'http://trends.revcontent.com/api/v1/',
        method: 'GET',
        dataType: 'json',
        data: data,
        success: sendPushNotifications,
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }

    });
}


function retriveAndParseRevcontentAdsWithSegment() {
    const remote = require('electron').remote;
    var dialog = remote.require('electron').dialog
    dialog.showMessageBox({
        message: "Error type:",
        type: "error",
        buttons: ["OK"]
    });
}


function populateSegments(data) {
    let num_segments = data.count
    select = document.getElementById('segmentSelect');

    for (i = 0; i < num_segments; ++i) {


        var opt = document.createElement('option');
        opt.value = data.segments[i].segment_id;
        opt.innerHTML = data.segments[i].segment_name;
        select.appendChild(opt);

    }
}

function getSegments() {


    //const segment = document.getElementById('segment-number-input').value
    console.log('dddd')

    const Store = require('electron-store');
    const store = new Store();
    
    const pushengageApiKey = store.get('pushengage_api_key', null);
    $.ajax({
        url: 'https://api.pushengage.com/apiv1/segments',
        headers: {
            'api_key': pushengageApiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        dataType: 'json',

        success: populateSegments,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var dialog = remote.require('electron').dialog
            dialog.showMessageBox({
                message: "Error type: " + errorThrown,
                type: "error",
                buttons: ["OK"]
            });
        }
    });


}
getSegments()


const sendBtn = document.getElementById('segmentBtn')


sendBtn.addEventListener('click', (event) => {
   
    retriveAndParseRevcontentAds();

    

})