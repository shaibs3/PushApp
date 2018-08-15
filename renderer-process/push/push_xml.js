
/******************* imports ***********************/


const CsectionConstans = require('./renderer-process/push/constants');
const CsectionCommonUtils = require('./renderer-process/push/common_utils');

const CsectionShell = require('electron').shell;

const CsectionStore = require('electron-store');

const CsectionipcRenderer = require('electron').ipcRenderer

const Csectionstore = new CsectionStore();

/******************* local variables ***********************/
var cSectionSemaphore = 0;

let cSectionStatus_array = [];

let cSectionStatus_array_idx = 0;

let cSectionCountryToIp = CsectionConstans.countryToIp;

/******************* module functions ***********************/

function cSectionShowRevContentAds(xml) {

    let url = "none"
    let image = "none"
    let img_index = 0
    let headline = "none"

    let number_ads = 0;
    $(xml).find('item').each(function () {
        number_ads++


    });



    let impression;
    if (!number_ads) {

        return;
    }

    $(xml).find('item').each(function () {
        headline = $(this).find("title").text()
        url = $(this).find("link").text()
        image = $(this).find("image_url").text()
        description = $(this).find("description").text()


        var node = document.createElement("LI");
        url_link = document.createElement('a');
        url_link.href = url; // Insted of calling setAttribute 
        url_link.innerHTML = headline // <a>INNER_TEXT</a>
        node.appendChild(url_link); // Append the link to the div
        br1 = document.createElement('br');
        node.appendChild(br1);
        var img_str =  image
        img_link = document.createElement('a');
        img_link.href = image; // Insted of calling setAttribute 
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
        document.getElementById("cSectionAddsList").appendChild(node);

    });





   

    

    cSectionStatus_array_idx = 0;
    cSectionSemaphore = 0;
    $('#img').hide();

}

function cSectionGetDateAndTime() {
    let datePicker = $('#datetimepicker2').data('DateTimePicker').date()
    let time_str = datePicker._d + ""
    var array = time_str.split(" ");
    var month = CsectionCommonUtils.convertMonth(array[1])
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
        CsectionipcRenderer.send('open-error-dialog', "Please provide Api keys")
        return;
    }

    var x = document.getElementById("daysSchedInput").value;
    var time = cSectionGetDateAndTime()

    if (jsonData.content.length) {
        let idx = Math.floor((Math.random() * 100) % jsonData.content.length)
        headline = jsonData.content[idx].headline;
        url = 'https://' + jsonData.content[idx].url.substring(2)
        url = encodeURIComponent(url)
        image = 'https://' + jsonData.content[idx].image.substring(2);
    }
    else {
        update_status_array(country, 0, 'Fail');
        if (cSectionSemaphore == 0) {
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
            CsectionipcRenderer.send('open-error-dialog', "Error type: " + errorThrown)

        },
        complete: function () {
            if (cSectionSemaphore == 0) {
                sentComplete()
            }
        }
    });
}

function randomizeAdds(jsonData) {
    /* randomize adds */
    let idx = Math.floor((Math.random() * 100) % jsonData.content.length)
    headline = jsonData.content[idx].headline;

    url = 'https://' + jsonData.content[idx].url.substring(2)

    url = encodeURIComponent(url)

    image = 'https://' + jsonData.content[idx].image.substring(2);

    impression = jsonData.impression;
    impression = encodeURIComponent(impression)

    return [url, image, headline, impression]
}

function cSectionSendPushNotifications(xml, pushApiKey, country) {

    if (!pushApiKey) {
        CsectionipcRenderer.send('open-error-dialog', "Please provide Api keys")
        return;
    }

    let number_ads = 0;
    $(xml).find('item').each(function () {
        number_ads++


    });

    let url;
    let image;
    let headline;
    let impression;


    if (number_ads) {
        // try {
        //     params = randomizeAdds(jsonData)
        // }
        // catch (e) {
        //     CsectionipcRenderer.send('open-error-dialog', "Please provide Api keys")
        //     return;
        // }

       
        $(xml).find('item').each(function () {
            headline = $(this).find("title").text()
            url = $(this).find("link").text()
            image = $(this).find("image_url").text()
            description = $(this).find("description").text()


        });


    }
    else {
        update_status_array(country, 0, 'Fail');
        if (cSectionSemaphore == 0) {
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
          


            update_status_array(country, number_ads, 'Success');

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            update_status_array(country, 0, 'Fail');
            CsectionipcRenderer.send('open-error-dialog', errorThrown)
        },
        complete: function () {

            if (cSectionSemaphore == 0) {
                sentComplete()
            }

        }
    });


}

function sentComplete() {

    $("#cSectionAddsList").empty();

    let i = 0;


    $('#CountriesTable').show();
    var t = $('#CountriesTable').DataTable();
    t.clear()
        .draw();

    for (; i < cSectionStatus_array_idx; i++) {
        let num_ads = "" + cSectionStatus_array[i].num_ads
        t.row.add([
            cSectionStatus_array[i].country,
            num_ads,
            cSectionStatus_array[i].send,
        ]).draw(false);
    }

    cSectionStatus_array_idx = 0;
    $('#img').hide();
}

function cSectionGetApiCallsParams() {

    const CsectionStore = require('electron-store');
    const Csectionstore = new CsectionStore();
    const loveMyleadsRevcontentApiKey = Csectionstore.get('lovemyleads_revcontent_api_key', null);
    const monetizeRevcontentApiKey = Csectionstore.get('monetize_revcontent_api_key', null);
    if (!loveMyleadsRevcontentApiKey || !monetizeRevcontentApiKey) {
        throw "missing api keys";
    }

    var widget_idx = $('#cSectionWidgetSelect').find("option:selected").val();
    var pub_id = $('#cSectionDomainSelect').find("option:selected").val();
    var section = $('#cSectionSectionSelect').find("option:selected").val();
    var domain;
    var apiKey;
    var pushApiKey;
    if (pub_id == 3120) {
        domain = "push.lovemyleads" + section + ".com"
        apiKey = loveMyleadsRevcontentApiKey
        pushApiKey = Csectionstore.get('lovemyleads_pushengage_api_key', null);
    }
    else {
        domain = "push.monetizeplus" + section + ".com"
        apiKey = monetizeRevcontentApiKey
        pushApiKey = Csectionstore.get('monetize_pushengage_api_key', null);
    }

    var widget = domainMaps[domain][widget_idx];

    let num_selected_countries = $('#cSectionCountrySelect').val().length
    let country_array = $('#cSectionCountrySelect').val();
    let start_idx = 0;
    if (num_selected_countries == 1) {
        var opt = $('#cSectionCountrySelect').val()[0];
        if (opt === 'All') {
            start_idx = 2;
            var domelts = $('#cSectionCountrySelect option');
            country_array = $.map(domelts, function (elt, i) { return $(elt).val(); });
            num_selected_countries = $('#cSectionCountrySelect option').length
        }
    }
    return [domain, apiKey, num_selected_countries, pushApiKey, country_array, widget, pub_id, start_idx];
}

function cSectionGetAdds(callback, update) {

    $('#img').show();
    $("#cSectionAddsList").empty();
    cSectionStatus_array_idx = 0;

    /* get all params for ajax call */
    var params = new Array();
    try {
        params = cSectionGetApiCallsParams();
    }
    catch (e) {
        CsectionipcRenderer.send('open-error-dialog', e)
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


    cSectionSemaphore = num_selected_countries - idx;
    for (; idx < num_selected_countries; idx++) {
        if (idx % 18 === 0 && idx != 0) {
            timeout++;
        }

        let country = country_array[idx]
        if (!cSectionCountryToIp.hasOwnProperty(country)) {
            update_status_array(country, 0, 'Fail');
            continue;
        }
        var user_ip = cSectionCountryToIp[country]


        var data = null
        $.ajax({

            url: 'https://push.zeropark.com/br/1ff08e40-94cf-11e8-9a4d-0ae8b840b174?ua=Mozilla/5.0%20(Linux;%20Android%204.0.4;%20Galaxy%20Nexus%20Build/IMM76B)%20AppleWebKit/535.19%20(KHTML,%20like%20Gecko)%20Chrome/18.0.1025.133%20Mobile%20Safari/535.19&ip=21.56.9.41 ',
            method: 'GET',
            dataType: 'xml',
            data: data,
            local_country: country,
            local_update: update,
            local_timeout: timeout,
            local_multiply: multiply,

            success: function (xml) {


                /* send a push to all users in this country */

                setTimeout(function () {
                    callback(xml, pushApiKey, country, update)
                }, this.local_timeout * this.local_multiply)

            },
            error: function (data) {
                // update_status_array(country, 0, 'Fail');
            },
            complete: function () {
                if (cSectionSemaphore == 0) {
                    sentComplete()
                }

            }
        });
    }
}

function update_status_array(local_country, ads, status) {

    cSectionStatus_array[cSectionStatus_array_idx] = { country: local_country, num_ads: ads, send: status };
    cSectionSemaphore--
    cSectionStatus_array_idx++;
}

function populateCountries(data) {


    /* populate countries */
    let countries = data.data.countries;
    let num_countries = countries.length
    let countriesSelect = document.getElementById('cSectionCountrySelect');

    $('#cSectionCountrySelect')
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

    $('#cSectionCountrySelect').trigger('change');
}

function getCountries() {


    const CsectionStore = require('electron-store');
    const Csectionstore = new CsectionStore();

    /* get the relevant api key (either monetize or loveMyLeads) */
    var pushengageApiKey;
    var pub_id = $('#cSectionDomainSelect').find("option:selected").val();
    if (pub_id == 3120) {
        pushengageApiKey = Csectionstore.get('lovemyleads_pushengage_api_key', null);
    }
    else {
        pushengageApiKey = Csectionstore.get('monetize_pushengage_api_key', null);
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

const cSectionPushBtn = document.getElementById('cSectionPushBtn')
cSectionPushBtn.addEventListener('click', (event) => {

})


$("#cSectionDomainSelect").change(function () {
    var selected = $('#cSectionDomainSelect option:selected').val();
    getCountries()

});

$('#cSectionSendPushBtn').bind('click.mynamespace', function () {

    cSectionGetAdds(cSectionSendPushNotifications, 1)
});


const cSectionshowAdsBtn = document.getElementById('cSectionShowAdsBtn')

cSectionshowAdsBtn.addEventListener('click', (event) => {

    cSectionGetAdds(cSectionShowRevContentAds, 0);
})


$('#schedulePushToggle').change(function () {

    $('#cSectionSendPushBtn').unbind('click.mynamespace');
    if ($(this).is(':checked')) {
        $('#dateInput').prop('disabled', false);
        $("#cSectionSendPushBtn").html('Scheduale push');
        $('#cSectionSendPushBtn').bind('click.mynamespace', function (event) {
            event.preventDefault();
            cSectionGetAdds(SchedulePush, 1)
        });
    }
    else {
        $("#cSectionSendPushBtn").html('Send push');
        $('#dateInput').prop('disabled', true);

        $('#cSectionSendPushBtn').bind('click.mynamespace', function (event) {
            event.preventDefault();
            cSectionGetAdds(cSectionSendPushNotifications, 1);
        });

    }
})

$(document).on('click', 'a[href^="https"]', function (event) {
    event.preventDefault();
    CsectionShell.openExternal(this.href);
});

$(document).ready(function () {
    /*initiallize widgets */
    $('#CountriesTable').DataTable();
    $('#CountriesTable').hide();
    $("#cSectionCountrySelect").select2({ placeholder: 'Select a country' });
    getCountries()
})











