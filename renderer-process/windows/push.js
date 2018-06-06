const remote = require('electron').remote
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
    const segment = document.getElementById('segment-number-input').value
    var headline = document.getElementById('headline_input').value
    var image = document.getElementById('image_input').value
    var url = document.getElementById('url_input').value

    const pushengageApiKey = document.getElementById('pushengage_api_key_input').value

    const Store = require('electron-store');
    const store = new Store();

    if (!pushengageApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }
    store.set('pushengage_api_key', pushengageApiKey);



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

    var data_msg;
    if (segment.length) {
        data_msg = 'notification_title=' + headline + '&notification_url=' + url + '&include_segments[0]=' + segment + '&notification_message=';
    }
    else {
        data_msg = `notification_title=${headline}&image_url=${image}&notification_url=${url}&notification_message=""`;
    }

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

function retriveAndParseRevcontentAds()
 {

    const revcontentApiKey = document.getElementById('revcontent_api_key_input').value
    

    const Store = require('electron-store');
    const store = new Store();

    if (!revcontentApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }

    store.set('revcontent_api_key', revcontentApiKey);

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


