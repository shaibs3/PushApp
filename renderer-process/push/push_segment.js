const remote = require('electron').remote



let domainMaps = {
    "Push.lovemyleads.com": [95943, 95943, 95943],

    "push.lovemyleadshealth.com": [97700, 97703, 97704],
    "push.lovemyleadsfinance.com": [97705, 97706, 97707],
    "push.lovemyleadssweeps.com": [97708, 97709, 97710],
    "push.lovemyleadsdating.com": [97711, 97712, 97713],
    "push.monetizeplushealth.com": [97717, 97718, 97719],
    "push.monetizeplusfinance.com": [97721, 97722, 97723],
    "push.monetizeplussweeps.com": [97725, 97726, 97728],
    "push.monetizeplusdating.com": [97729, 97730, 97731],
};



function ShowRevContentAds(jsonData) {

    var url = "none"
    var image = "none"
    var img_index = 0
    var headline = "none"
    $("#pushrevContentAddsList").empty();
    data = jsonData.content;
    for (var i in data) {
        headline = data[i].headline;
        url = data[i].url;
        image = data[i].image;

        var node = document.createElement("LI");
        url_link = document.createElement('a');
        url_link.href = 'http://' + url.substring(2); // Insted of calling setAttribute 
        url_link.innerHTML = headline // <a>INNER_TEXT</a>
        node.appendChild(url_link); // Append the link to the div
        br1 = document.createElement('br');
        node.appendChild(br1);
        var img_str = 'http://' + image.substring(2)
        img_link = document.createElement('a');
        img_link.href = image.substring(2); // Insted of calling setAttribute 
        img_link.innerHTML = "Image" // <a>INNER_TEXT</a>
        //node.appendChild(img_link); // Append the link to the div
        img_index++;
        var img = $('<img />').attr({
            'id': 'myImage' + img_index,
            'src': img_str,
            'alt': 'JSFiddle logo',
            'title': 'JSFiddle logo',
            'width': 250
        }).appendTo(node);





        document.getElementById("pushrevContentAddsList").appendChild(node);
    }

}










function sendPushNotifications(jsonData, pushApiKey) {


    ShowRevContentAds(jsonData);

    const remote = require('electron').remote

    const segment = document.getElementById('segmentSelect').value;




    const Store = require('electron-store');
    const store = new Store();
 
   
    if (!pushApiKey ) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }

    
    if (jsonData.content.length) {
        headline = jsonData.content[0].headline;

        url = 'http://' + jsonData.content[0].url.substring(2)
        console.log("before url" + url)
        url = encodeURIComponent(url)
        
        console.log("after url" + url)
        image = 'http://' + jsonData.content[0].image.substring(2);
    }
    else {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Did not send push notifications [No adds retrieved from revcontent]",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }
    let impression = 'https://' + jsonData.impression.substring(2) + "&viewed=1"
    impression = encodeURIComponent(impression)
    
    var segment_id = $('#segmentSelect').find("option:selected").val();
    var data_msg =
        "notification_title="
        + headline
        + "&notification_url="
        + url
        + "&image_url="
        + image
        +"&include_segments[0]="
        + segment_id
        + "&notification_message="
        + "&view_url="
        + impression;

  

    $.ajax({
        url: 'https://api.pushengage.com/apiv1/notifications',
        headers: {
            'api_key': pushApiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        type: 'POST',
        dataType: 'json',
        data: data_msg,

        success: function (data) {

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

function retriveAndParseRevcontentAds(callback) {




    const Store = require('electron-store');
    const store = new Store();
    const loveMyleadsRevcontentApiKey = store.get('lovemyleads_revcontent_api_key', null);
    const monetizeRevcontentApiKey = store.get('monetize_revcontent_api_key', null);
    if (!monetizeRevcontentApiKey || !loveMyleadsRevcontentApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }

    var widget_idx = $('#widgetSelect').find("option:selected").val();
    var pub_id = $('#domainSelect').find("option:selected").val();
    var section = $('#sectionSelect').find("option:selected").val();
    var domain;
    var revcontentApiKey;
    var pushApiKey;
    if (pub_id == 3120) {
        domain = "push.lovemyleads" + section + ".com"
        revcontentApiKey = loveMyleadsRevcontentApiKey
        pushApiKey = store.get('lovemyleads_pushengage_api_key', null);
    }
    else {
        domain = "push.monetizeplus" + section + ".com"
        revcontentApiKey = monetizeRevcontentApiKey
        pushApiKey = store.get('monetize_pushengage_api_key', null);
    }
  
    var widget = domainMaps[domain][widget_idx];



    var data = `api_key=${revcontentApiKey}&widget_id=${widget}&pub_id=${pub_id}&domain=${domain}&tracking=auto&tracking_method=post`

    $.ajax({
        beforeSend: function () {
            sendBtn.innerHTML = "Signing In";
            sendBtn.classList.add('spinning');
        },
        url: 'http:///push.stackie.com/api/v2/',
        method: 'GET',
        dataType: 'json',
        data: data,
        success: function(data){
            callback(data, pushApiKey)
        },
        complete: function () {
            sendBtn.classList.remove('spinning');
            sendBtn.innerHTML = "Sign In";
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

    $('.selectpicker').selectpicker('refresh');


}

function getSegments() {


   

    const Store = require('electron-store');
    const store = new Store();

    const pushengageApiKey = store.get('lovemyleads_pushengage_api_key', null);
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

const toggleBtn = document.getElementById('aSectionToggle')


toggleBtn.addEventListener('click', (event) => {

    $("#pushrevContentAddsList").empty();
    $('.selectpicker').selectpicker('refresh');



})

















const sendBtn = document.getElementById('segmentBtn')


sendBtn.addEventListener('click', (event) => {


    retriveAndParseRevcontentAds(sendPushNotifications);



})

const showAdsBtn = document.getElementById('showAdsBtn')


showAdsBtn.addEventListener('click', (event) => {

    retriveAndParseRevcontentAds(ShowRevContentAds);



})


