const remote = require('electron').remote
const $ = require("jquery");


function sendPushNotifications(data) {



    let pushengageApiKey;

    const Store = require('electron-store');
    const store = new Store();
    store.get('pushengage_api_key', pushengageApiKey);
    store.get('monetize_api_key', monetizeApiKey);
    if (!pushengageApiKey || !monetizeApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
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

function retriveAndParseRevcontentAds() {

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
        url: 'http://trends.revcontent.com/api/v2/',
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


