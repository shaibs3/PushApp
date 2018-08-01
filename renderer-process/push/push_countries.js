
/******************* imports ***********************/
const constants = require('./renderer-process/push/constants');

const commonUtils = require('./renderer-process/push/common_utils');

const shell = require('electron').shell;

const Store = require('electron-store');

const { ipcRenderer } = require('electron')

const store = new Store();

/******************* local variables ***********************/
var semaphore = 0;

let status_array = [];

let status_array_idx = 0;

let countryToIp = constants.countryToIp;

/******************* module functions ***********************/

function bSectionShowRevContentAds(jsonData) {

    var url = "none"
    var image = "none"
    var img_index = 0
    var headline = "none"

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

        document.getElementById("bSectionAddsList").appendChild(node);
    }
    status_array_idx = 0;
    semaphore = 0;
    $('#img').hide();

}

function bSectionGetDateAndTime() {
    let datePicker = $('#datetimepicker1').data('DateTimePicker').date()
    let time_str = datePicker._d + ""
    var array = time_str.split(" ");
    var month = commonUtils.convertMonth(array[1])
    var day = array[2]
    var year = array[3]
    var hourMinSec = array[4]
    var time = year + "-" + month + "-" + day + " " + hourMinSec
    return time
}



// function createTimeArray()
// {
//     var arrContainer = [];

//     for (i=0;i<10;i++)
//     {
//       arrContainer.push(    new Date(year, month, day, hours, minutes, seconds, milliseconds)
//     );
//     }
// }




       
        
       

function SchedulePush(jsonData, pushApiKey, country) {

   
 
    if (!pushApiKey) {
        ipcRenderer.send('open-error-dialog',"Please provide Api keys")
        return;
    }
 
    var x = document.getElementById("daysSchedInput").value;
    var time = bSectionGetDateAndTime()

    if (jsonData.content.length) {
        let idx = Math.floor((Math.random() * 100) % jsonData.content.length)
        headline = jsonData.content[idx].headline;
        url = 'http://' + jsonData.content[idx].url.substring(2)
        url = encodeURIComponent(url)
        image = 'http://' + jsonData.content[idx].image.substring(2);
    }
    else {
        update_status_array(country, 0, 'Fail');
        if (semaphore == 0) {
            sentComplete()
        }
        return;
    }

    var data_msg =
        "notification_title="
        + headline
        + "&notification_url="
        + url
        + "&image_url="
        + image
        + "&include_countries[0]="
        + country
        + "&notification_message="
        + "&notification_type=later"
        + "&valid_from_utc="
        + time

    $.ajax({
        url: 'https://api.pushengage.com/apiv1/notifications',
        headers: {
            'api_key': pushApiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        type: 'POST',
        dataType: 'json',
        local_country: country,
        data: data_msg,

        success: function (data) {
            update_status_array(this.local_country, jsonData.content.length, 'Success');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            update_status_array(this.local_country, jsonData.content.length, 'Fail');
            ipcRenderer.send('open-error-dialog', "Error type: " + errorThrown)

        },
        complete: function () {
            if (semaphore == 0) {
                sentComplete()
            }
        }
    });
}

function randomizeAdds(jsonData) {
    /* randomize adds */
    let idx = Math.floor((Math.random() * 100) % jsonData.content.length)
    headline = jsonData.content[idx].headline;

    url = 'http://' + jsonData.content[idx].url.substring(2)

    url = encodeURIComponent(url)

    image = 'http://' + jsonData.content[idx].image.substring(2);

    return [url, image, headline]
}

function bSectionSendPushNotifications(jsonData, pushApiKey, country) {

    if (!pushApiKey) {
        ipcRenderer.send('open-error-dialog', "Please provide Api keys")
        return;
    }

    let number_ads = jsonData.content.length

    if (number_ads) {
        try {
            params = randomizeAdds(jsonData)
        }
        catch (e) {
            ipcRenderer.send('open-error-dialog', "Please provide Api keys")
            return;
        }

        let url = params[0];
        let image = params[1];
        let headline = params[2];
    }
    else {
        update_status_array(country, 0, 'Fail');
        if (semaphore == 0) {
            sentComplete()
        }
        return;
    }

    var data_msg =
        "notification_title="
        + headline
        + "&notification_url="
        + url
        + "&image_url="
        + image
        + "&include_countries[0]="
        + country
        + "&notification_message=";

    $.ajax({
        url: 'https://api.pushengage.com/apiv1/notifications',
        headers: {
            'api_key': pushApiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        type: 'POST',
        dataType: 'json',
        local_country: country,
        data: data_msg,

        success: function (data) {
            // let notifiction_id = data.notification_id;

            // var d = new Date();
            // var n = d.getTime();

            // var obj = {
            //     timestamp: n,
            //     impressionurl: impression,
            //     notificationId: notifiction_id
            // }

            // fs.readFile("impression.json", function (err, fileData) {
            //     if (err) {
            //         return console.log(err);
            //     }
            //     else {
            //         var json = JSON.parse(fileData)
            //         json.impressions.push(obj); //add some data
            //         fs.writeFile("impression.json", JSON.stringify(json), 'utf8', function (err) {
            //             if (err) throw err;
            //             console.log('complete');
            //         });

            //     }
            // })

            update_status_array(country, number_ads, 'Success');

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            update_status_array(country, 0, 'Fail');
            ipcRenderer.send('open-error-dialog', errorThrown)
        },
        complete: function () {

            if (semaphore == 0) {
                sentComplete()
            }

        }
    });


}

function sentComplete() {

    $("#bSectionAddsList").empty();

    let i = 0;


    $('#CountriesTable').show();
    var t = $('#CountriesTable').DataTable();
    t.clear()
        .draw();

    for (; i < status_array_idx; i++) {
        let num_ads = "" + status_array[i].num_ads
        t.row.add([
            status_array[i].country,
            num_ads,
            status_array[i].send,
        ]).draw(false);
    }

    status_array_idx = 0;
    $('#img').hide();
}

function bSectionGetApiCallsParams() {

    const Store = require('electron-store');
    const store = new Store();
    const loveMyleadsRevcontentApiKey = store.get('lovemyleads_revcontent_api_key', null);
    const monetizeRevcontentApiKey = store.get('monetize_revcontent_api_key', null);
    if (!loveMyleadsRevcontentApiKey || !monetizeRevcontentApiKey) {
        throw "missing api keys";
    }

    var widget_idx = $('#bSectionWidgetSelect').find("option:selected").val();
    var pub_id = $('#bSectionDomainSelect').find("option:selected").val();
    var section = $('#bSectionSectionSelect').find("option:selected").val();
    var domain;
    var apiKey;
    var pushApiKey;
    if (pub_id == 3120) {
        domain = "push.lovemyleads" + section + ".com"
        apiKey = loveMyleadsRevcontentApiKey
        pushApiKey = store.get('lovemyleads_pushengage_api_key', null);
    }
    else {
        domain = "push.monetizeplus" + section + ".com"
        apiKey = monetizeRevcontentApiKey
        pushApiKey = store.get('monetize_pushengage_api_key', null);
    }

    var widget = domainMaps[domain][widget_idx];

    let num_selected_countries = $('#bSectionCountrySelect').val().length
    let country_array = $('#bSectionCountrySelect').val();
    let start_idx = 0;
    if (num_selected_countries == 1) {
        var opt = $('#bSectionCountrySelect').val()[0];
        if (opt === 'All') {
            start_idx = 2;
            var domelts = $('#bSectionCountrySelect option');
            country_array = $.map(domelts, function (elt, i) { return $(elt).val(); });
            num_selected_countries = $('#bSectionCountrySelect option').length
        }
    }
    return [domain, apiKey, num_selected_countries, pushApiKey, country_array, widget, pub_id, start_idx];
}

function bSectionGetAdds(callback, update) {

    $('#img').show();
    $("#bSectionAddsList").empty();
    status_array_idx = 0;

    /* get all params for ajax call */
    var params = new Array();
    try {
        params = bSectionGetApiCallsParams();
    }
    catch (e) {
        ipcRenderer.send('open-error-dialog', e)
        return;
    }

    let domain = params[0];
    let apiKey = params[1];
    let num_selected_countries = params[2];
    let pushApiKey = params[3];
    let country_array = params[4];
    let widget = params[5];
    let pub_id = params[6];
    let idx = params[7];
    let timeout = 0;
    let multiply = 60000;


    semaphore = num_selected_countries - idx;
    for (; idx < num_selected_countries; idx++) {
        if (idx % 18 === 0 && idx != 0) {
            timeout++;
        }

        let country = country_array[idx]
        if (!countryToIp.hasOwnProperty(country)) {
            update_status_array(country, 0, 'Fail');
            continue;
        }
        var user_ip = countryToIp[country]


        var data = `api_key=${apiKey}&widget_id=${widget}&pub_id=${pub_id}&domain=${domain}&user_ip=${user_ip}&tracking=manual&tracking_method=get`

        $.ajax({

            url: 'http://push.stackie.com/api/v2/',
            method: 'GET',
            dataType: 'json',
            data: data,
            local_country: country,
            local_update: update,
            local_timeout: timeout,
            local_multiply: multiply,

            success: function (data) {
                /* send a push to all users in this country */

                setTimeout(function () {
                    callback(data, pushApiKey, country, update)
                }, this.local_timeout * this.local_multiply)

            },
            error: function (data) {
                update_status_array(country, 0, 'Fail');
            },
            complete: function () {
                if (semaphore == 0) {
                    sentComplete()
                }

            }
        });
    }
}

function update_status_array(local_country, ads, status) {

    status_array[status_array_idx] = { country: local_country, num_ads: ads, send: status };
    semaphore--
    status_array_idx++;
}

function populateCountries(data) {


    /* populate countries */
    let countries = data.data.countries;
    let num_countries = countries.length
    let countriesSelect = document.getElementById('bSectionCountrySelect');

    $('#bSectionCountrySelect')
    .find('option')
    .remove()

    var opt = document.createElement('option');
    opt.value = "Choose a Country";
    opt.innerHTML = "Choose a Country";
    opt.hidden = true;
    countriesSelect.appendChild(opt);

    var opt = document.createElement('option');
    opt.value = "All";
    opt.innerHTML = "All";
    countriesSelect.appendChild(opt);

  




    for (i = 0; i < num_countries; ++i) {
        var opt = document.createElement('option');
        opt.value = countries[i];
        opt.innerHTML = countries[i];
        countriesSelect.appendChild(opt);
    }

    $('#bSectionCountrySelect').trigger('change');
}

function getCountries() {


    const Store = require('electron-store');
    const store = new Store();

    /* get the relevant api key (either monetize or loveMyLeads) */
    var pushengageApiKey;
    var pub_id = $('#bSectionDomainSelect').find("option:selected").val();
    if (pub_id == 3120) {
        pushengageApiKey = store.get('lovemyleads_pushengage_api_key', null);
    }
    else {
        pushengageApiKey = store.get('monetize_pushengage_api_key', null);
    }

    $.ajax({
        url: 'https://api.pushengage.com/apiv1/segments?segment_type=all',
        headers: {
            'api_key': pushengageApiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        dataType: 'json',

        success: populateCountries,
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






/******************* callbacks ***********************/

const bSectionPushBtn = document.getElementById('bSectionPushBtn')
bSectionPushBtn.addEventListener('click', (event) => {

})


$("#bSectionDomainSelect").change(function () {
    var selected = $('#bSectionDomainSelect option:selected').val();
    getCountries()

});

$('#bSectionSendPushBtn').bind('click.mynamespace', function () {
    
    bSectionGetAdds(bSectionSendPushNotifications, 1)
});


const bSectionshowAdsBtn = document.getElementById('bSectionShowAdsBtn')

bSectionshowAdsBtn.addEventListener('click', (event) => {
   
    bSectionGetAdds(bSectionShowRevContentAds, 0);
})


$('#schedulePushToggle').change(function () {

    $('#bSectionSendPushBtn').unbind('click.mynamespace');
    if ($(this).is(':checked')) {
        $('#dateInput').prop('disabled', false);
        $("#bSectionSendPushBtn").html('Scheduale push');
        $('#bSectionSendPushBtn').bind('click.mynamespace', function (event) {
            event.preventDefault();
            bSectionGetAdds(SchedulePush, 1)
        });
    }
    else {
        $("#bSectionSendPushBtn").html('Send push');
        $('#dateInput').prop('disabled', true);

        $('#bSectionSendPushBtn').bind('click.mynamespace', function (event) {
            event.preventDefault();
            bSectionGetAdds(bSectionSendPushNotifications, 1);
        });

    }
})

$(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

$(document).ready(function () {
    /*initiallize widgets */
    $('#CountriesTable').DataTable();
    $('#CountriesTable').hide();
    $("#bSectionCountrySelect").select2({ placeholder: 'Select a country' });
    getCountries()
})

