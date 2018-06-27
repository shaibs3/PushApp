var semaphore = 0;
let status_array = [];
let status_array_idx = 0;

let countryToIp = {

    "Afghanistan": "27.116.56.1",

    "Albania": "31.22.48.1",

    "Algeria": "41.77.176.1",

    "American Samoa": "41.109.117.1",

    "Andorra": "46.172.224.1",

    "Angola": "41.210.192.1",

    "Anguilla": "76.76.176.1",

    "Antigua and Barbuda": "57.91.0.1",

    "Argentina": "24.232.0.78",

    "Armenia": "5.77.128.0",

    "Aruba": "66.247.200.1",

    "Australia": "1.40.0.1",

    "Austria": "5.132.128.0",

    "Azerbaijan": "5.10.240.1",

    "Bahamas": "24.51.64.1",

    "Bahrain": "37.131.0.1",

    "Bangladesh": "27.147.128.1",

    "Barbados": "63.175.156.1",

    "Belarus": "5.100.192.0	",

    "Belgium": "37.62.0.1",

    "Belize": "45.70.228.1",

    "Benin": "41.74.0.0",

    "Bermuda": "64.147.80.0",

    "Bhutan": "57.92.32.1",

    "Bolivia": "45.70.180.0",

    "Bonaire, Sint Eustatius, and Saba": "161.0.80.1",

    "Bosnia and Herzegovina": "5.102.176.2",

    "Botswana": "41.74.48.1",

    "Brazil": "18.231.0.1",

    "British Virgin Islands": "5.100.152.1",

    "Brunei": "43.225.136.1",

    "Bulgaria": "5.53.128.1",

    "Burkina Faso": "41.78.48.1",

    "Burundi": "57.82.112.1",

    "Cambodia": "36.37.128.1",


    "Cameroon": "41.77.80.0",

    "Canada": "64.56.224.1",

    "Cape Verde": "41.79.124.1",

    "Cayman Islands": "63.136.112.1",

    "Central African Republic": "41.78.120.1",

    "Chad": "57.82.176.1",

    "Chile": "164.98.0.1",

    "China": "1.1.2.1",

    "Colombia": "23.32.192.1",

    "Comoros": "57.82.192.1",

    "Congo": "41.190.72.1",

    "Cook Islands": "202.65.32.1",

    "Costa Rica": "45.5.60.1",

    "Croatia": "5.39.128.1",

    "Cuba": "57.91.32.1",

    "Curaçao": "45.71.156.1",

    "Cyprus": "5.104.0.1",

    "Czechia": "5.59.160.1",

    "Denmark": "2.104.0.1",

    "Djibouti": "41.189.224.1",

    "Dominica": "57.91.48.0",

    "Dominican Republic": "45.6.40.0",

    "Ecuador": "23.57.160.1",

    "Egypt": "41.128.0.3",


    "El Salvador": "57.75.192.1",

    "Equatorial Guinea": "41.79.48.1",

    "Estonia": "5.44.184.1",

    "Ethiopia": "57.83.48.1",

    "Federated States of Micronesia": "57.70.192.1",

    "Fiji": "27.123.128.1",

    "Finland": "37.33.0.1",

    "France": "2.2.2.4",

    "French Guiana": "57.75.96.1",

    "French Polynesia": "103.4.72.1",

    "Gabon": "41.72.224.1",

    "Gambia": "41.76.8.1",

    "Georgia": "5.10.32.1",

    "Germany": "89.48.0.1",

    "Ghana": "41.57.192.1",

    "Greece": "2.18.80.1",

    "Greenland": "46.16.16.0",

    "Grenada": "57.91.80.1",

    "Guadeloupe": "5.187.96.1",


    "Guam": "8.3.112.1",

    "Guatemala": "45.226.176.0",

    "Guinea": "41.77.184.1",

    "Guinea-Bissau": "57.83.112.1",

    "Guyana": "57.75.112.1",

    "Haiti": "57.91.96.1",

    "Hashemite Kingdom of Jordan": "5.45.128.1",

    "Honduras": "45.4.136.1",

    "Hong Kong": "1.32.192.1",

    "Hungary": "5.204.0.1",

    "India": "203.123.128.1",

    "Indonesia": "39.192.0.1",

    "Iran": "2.144.0.1",

    "Iraq": "5.1.108.1",

    "Ireland": "5.83.240.0",

    "Israel": "5.22.128.1",

    "Italy": "2.16.26.1",

    "Ivory Coast": "41.66.0.1",

    "Jamaica": "57.91.112.1",

    "Japan": "1.0.16.1",

    "Jersey": "5.42.128.1",

    "Kazakhstan": "2.72.0.1",

    "Kenya": "41.57.96.0",

    "Kiribati": "57.70.160.0",

    "Kuwait": "23.56.240.0",

    "Kyrgyzstan": "31.29.0.0",

    "Laos": "43.224.36.0",

    "Latvia": "5.44.216.0",

    "Lebanon": "5.8.128.0",

    "Lesotho": "41.203.176.0",

    "Liberia": "41.57.80.0",

    "Libya": "41.74.64.0",

    "Luxembourg": "5.149.112.0",

    "Macao": "27.109.128.0",

    "Macedonia": "5.32.176.0",

    "Madagascar": "41.74.16.0",

    "Malawi": "41.70.0.0",

    "Malaysia": "1.9.0.0",

    "Maldives": "27.114.128.0",

    "Mali": "41.73.96.0",

    "Malta": "46.11.0.0",

    "Marshall Islands": "117.103.88.1",

    "Martinique": "81.52.192.1",

    "Mauritania": "41.138.128.0",

    "Mauritius": "41.76.40.0",

    "Mexico": "17.45.56.0",

    "Mongolia": "27.123.212.0",

    "Montenegro": "31.184.234.0",

    "Montserrat": "199.7.90.0",

    "Morocco": "41.77.112.248",

    "Mozambique": "41.76.0.0",

    "Myanmar [Burma]": "37.111.0.0",

    "Namibia": "41.63.192.0",

    "Nepal": "7.34.0.0",

    "Netherlands": "24.132.0.1",

    "New Caledonia": "27.122.0.0",

    "New Zealand": "14.1.32.0",

    "Nicaragua": "57.75.176.1",

    "Niger": "41.78.116.0",

    "Nigeria": "41.58.0.0",

    "Norway": "2.148.0.0",

    "Oman": "5.32.192.0",

    "Pakistan": "14.192.128.0",

    "Palau": "57.70.240.0",

    "Palestine": "5.34.160.0",

    "Panama": "38.131.13.0",

    "Papua New Guinea": "27.122.16.0",

    "Paraguay": "23.76.33.0",

    "Peru": "23.209.83.0",

    "Philippines": "14.102.168.0",

    "Poland": "5.60.0.1",

    "Portugal": "2.80.0.0",

    "Puerto Rico": "12.41.128.0",

    "Qatar": "2.23.224.0",

    "Republic of Korea": "1.11.0.1",

    "Republic of Lithuania": "5.20.0.0",

    "Republic of Moldova": "5.32.168.0",

    "Republic of the Congo": "31.209.128.0",

    "Romania": "5.2.128.0",

    "Russia": "2.16.154.0",

    "Rwanda": "41.74.160.0",

    "Saint Kitts and Nevis": "57.91.128.0",

    "Saint Lucia": "23.178.192.0",

    "Saint Vincent and the Grenadines": "57.91.160.0",

    "Samoa": "43.241.164.0",

    "Saudi Arabia": "2.88.0.0",

    "Senegal": "41.82.0.0",

    "Serbia": "5.22.160.1",

    "Seychelles": "5.35.171.128",

    "Sierra Leone": "41.78.84.0",

    "Singapore": "1.32.128.0",

    "Slovak Republic": "5.22.154.0",

    "Slovenia": "5.32.136.1",

    "Solomon Islands": "57.71.32.0",

    "Somalia": "41.78.72.0",

    "South Africa": "41.112.0.2",

    "South Sudan": "41.79.24.0",

    "Spain": "2.16.8.1",

    "Sri Lanka": "23.49.160.0",

    "Sudan": "41.67.0.0",

    "Suriname": "57.75.120.0",

    "Swaziland": "41.77.232.0",

    "Sweden": "37.2.0.1",

    "Switzerland": "77.56.0.1",

    "Syria": "5.0.0.1",

    "Taiwan": "1.34.0.1",

    "Tajikistan": "37.98.152.0",

    "Tanzania": "41.59.0.0",

    "Thailand": "1.0.128.0",

    "Togo": "41.78.136.0",

    "Tonga": "43.255.148.1",

    "Trinidad and Tobago": "45.234.164.0",

    "Tunisia": "41.224.0.0",

    "Turkey": "5.2.80.1",

    "Turkmenistan": "27.34.176.0",

    "Turks and Caicos Islands": "65.255.48.0",

    "Tuvalu": "45.42.220.0",

    "U.S. Virgin Islands": "8.26.18.0",

    "Uganda": "41.75.160.0",

    "Ukraine": "2.21.89.0",

    "United Arab Emirates": "2.48.0.1",

    "United Kingdom": "17.69.0.1",

    "United States": "21.56.9.41",

    "Uruguay": "2.22.24.0",

    "Vanuatu": "43.240.140.0",

    "Venezuela": "23.56.176.0",

    "Vietnam": "14.224.0.0",

    "Wallis and Futuna": "45.59.172.0",

    "Yemen": "5.100.160.0",

    "Zambia": "5.11.12.1",

    "Zimbabwe": "41.57.64.1",
};







function bSectionShowRevContentAds(jsonData) {

    var url = "none"
    var image = "none"
    var img_index = 0
    var headline = "none"
    $("#bSectionpushrevContentAddsList").empty();
    data = jsonData.content;
    for (var i in data) {
        headline = data[i].headline;
        url = data[i].url;
        image = data[i].image;
        if (i === '0')
            console.log("correct url" + url)
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





        document.getElementById("bSectionpushrevContentAddsList").appendChild(node);
    }

}

function bSectionSendPushNotifications(jsonData, pushApiKey, country) {


    ShowRevContentAds(jsonData);

    const remote = require('electron').remote



    const Store = require('electron-store');
    const store = new Store();


    if (!pushApiKey) {
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
        status_array[status_array_idx] = { country: country, num_ads: 0, send: 'fail' };
        status_array_idx++
        // var dialog = remote.require('electron').dialog
        //  dialog.showMessageBox({
        //     message: "Did not send push notifications with country = " + country + " [No adds retrieved from revcontent ]",
        //     type: "error",
        //     buttons: ["OK"]
        // });
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


    semaphore++
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

            //  var dialog = remote.require('electron').dialog
            // dialog.showMessageBox({
            //    message: "Succesfuly sent push notifications to " + this.local_country + " users",
            //   buttons: ["OK"]
            //});
            status_array[status_array_idx] = { country: country, num_ads: jsonData.content.length, send: 'Success' };
            status_array_idx++;
            semaphore--;
            if (semaphore == 0) {
                sentComplete()
            }
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

function sentComplete() {
   
    $("#bSectionpushrevContentAddsList").empty();
    $("#bSectionsendStatus").empty();
    // $('#here_table').empty();
    // $('#here_table').append("<table class='table table-striped table-bordere'  />");
     let i = 0;
    // $('#here_table table').append('<th>  Country</th>');
    // $('#here_table table').append('<th>  Number ads</th>');
    // $('#here_table table').append('<th>  Result</th>');
    
    $('#myTable').show();
    var t = $('#myTable').DataTable();
    t.clear()
    .draw();
    
    for (; i < status_array_idx; i++) {
let num_ads = "" + status_array[i].num_ads
        t.row.add( [
            status_array[i].country,
            num_ads ,
            status_array[i].send ,
        ] ).draw( false );
        //$('#myTable tbody').append('<tr><td>' +  + '</td><td>' +  + '</td><td>' + + '</td></tr>');

    }

   
    var counter = 1;
 
 
    


    //$('#myTable').DataTable();
   // $('#here_table table').DataTable();
    status_array_idx = 0;
    $('#img').hide(); 
}


//  function sentComplete() {


//     $("#bSectionsendStatus").empty();
//     var dialog = remote.require('electron').dialog
//     let i = 0;
//     let data_msg = '';
//     var node = document.createElement("LI");

//     var newDiv = document.createElement("div");
//     // and give it some content 
//     var newContent = document.createTextNode("country    Number-ads");
//     // add the text node to the newly created div
//     newDiv.appendChild(newContent);
//     node.appendChild(newDiv); // Append the link to the div
//     document.getElementById("bSectionsendStatus").appendChild(node);
//     for (; i < status_array_idx; i++) {
//         data_msg +=
//             "" +
//             status_array[i].country +
//             "- Num ads: " + status_array[i].num_ads +
//             ", Status : " + status_array[i].send +
//             "\n"



//         var node = document.createElement("LI");

//         var newDiv = document.createElement("div");
//         // and give it some content 
//         var newContent = document.createTextNode(data_msg);
//         // add the text node to the newly created div
//         newDiv.appendChild(newContent);
//         node.appendChild(newDiv); // Append the link to the div







//         document.getElementById("bSectionsendStatus").appendChild(node);














//     }
//     // dialog.showMessageBox({
//     //     message: data_msg,
//     //     buttons: ["OK"]
//     // });







































// }
function bSectionRetriveAndParseRevcontentAds(callback) {



    status_array_idx = 0;
    const Store = require('electron-store');
    const store = new Store();
    const revcontentApiKey = store.get('revcontent_api_key', null);
    const monetizeApiKey = store.get('monetize_api_key', null);
    if (!revcontentApiKey) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: "Please provide Api keys",
            type: "error",
            buttons: ["OK"]
        });
        return;
    }

    var widget_idx = $('#bSectionWidgetSelect').find("option:selected").val();
    var pub_id = $('#bSectionDomainSelect').find("option:selected").val();
    var section = $('#bSectionSectionSelect').find("option:selected").val();
    var domain;
    var apiKey;
    var pushApiKey;
    if (pub_id == 3120) {
        domain = "push.lovemyleads" + section + ".com"
        apiKey = revcontentApiKey
        pushApiKey = store.get('pushengage_api_key', null);
    }
    else {
        domain = "push.monetizeplus" + section + ".com"
        apiKey = monetizeApiKey
        pushApiKey = store.get('monetize_pushengage_api_key', null);
    }

    var widget = domainMaps[domain][widget_idx];

    let num_selected_countries = $('#bSectionCountrySelect').val().length
    let country_array = $('#bSectionCountrySelect').val();
    let i = 0;
    if (num_selected_countries == 1) {
        var opt = $('#bSectionCountrySelect').val()[0];
        if (opt === 'All') {
            i = 2;
            country_array = $('#bSectionCountrySelect option');
            num_selected_countries = $('#bSectionCountrySelect option').length
        }
    }


    for (; i < num_selected_countries; i++) {

        var country;
        if (opt == 'All') {
            country = country_array[i].value;
        }
        else {
            country = country_array[i]
        }

        var user_ip = countryToIp[country]

        var data = `api_key=${apiKey}&widget_id=${widget}&pub_id=${pub_id}&domain=${domain}&user_ip=${user_ip}&tracking=manual&tracking_method=get`

        $.ajax({
            beforeSend: function () {
                sendBtn.innerHTML = "Signing In";
                sendBtn.classList.add('spinning');
            },
            url: 'http://trends.revcontent.com/api/v2/',
            method: 'GET',
            dataType: 'json',
            data: data,
            local_country: country,
            success: function (data) {
                callback(data, pushApiKey, this.local_country)
            },
            complete: function () {
                //sentComplete()

            }

        });
    }
}





function populateCountriesStateCities(data) {


    /* populate countries */
    let countries = data.data.countries;
    let num_countries = countries.length
    let countriesSelect = document.getElementById('bSectionCountrySelect');

    for (i = 0; i < num_countries; ++i) {
        var opt = document.createElement('option');
        opt.value = countries[i];
        opt.innerHTML = countries[i];
        countriesSelect.appendChild(opt);
    }

    $('#bSectionCountrySelect').trigger('change');


}



function getCountriesCitiesStates() {


    const Store = require('electron-store');
    const store = new Store();

    /* get the relevant api key (either monetize or loveMyLeads) */
    var pushengageApiKey;
    var pub_id = $('#bSectionDomainSelect').find("option:selected").val();
    if (pub_id == 3120) {
        pushengageApiKey = store.get('pushengage_api_key', null);
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

        success: populateCountriesStateCities,
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





/* register callback */

const bSectionToggle = document.getElementById('bSectionToggle')
bSectionToggle.addEventListener('click', (event) => {

    $("#pushrevContentAddsList").empty();
    $('.selectpicker').selectpicker('refresh');
})


$("#bSectionDomainSelect").change(function () {
    var selected = $('#bSectionDomainSelect option:selected').val();
    getCountriesCitiesStates()

});
$(document).ready(function () {
    /*initiallize widgets */
   
    $('#myTable').DataTable();
    $('#myTable').hide();
    $("#bSectionCountrySelect").select2({ placeholder: 'Select a country' });
    getCountriesCitiesStates()
})

const bSectionSendBtn = document.getElementById('bSectionSendPushBtn')


bSectionSendBtn.addEventListener('click', (event) => {

    $('#img').show(); 
    bSectionRetriveAndParseRevcontentAds(bSectionSendPushNotifications);



})

const bSectionShowAdsBtn = document.getElementById('bSectionShowAdsBtn')


bSectionShowAdsBtn.addEventListener('click', (event) => {

    bSectionRetriveAndParseRevcontentAds(bSectionShowRevContentAds);



})




    //    <table data-toggle="table" 
    //   data-url="https://api.github.com/users/wenzhixin/repos?type=owner&sort=full_name&direction=asc&pe
    //   r_page=100&page=1" data-sort-name="stargazers_count" data-sort-order="desc"> <thead> <tr> <th data-field="name" data-sortable="true"> Name </th> <th data-field="stargazers_count" data-sortable="true"> Stars </th> <th data-field="forks_count" data-sortable="true"> Forks </th> <th data-field="description" data-sortable="true"> Description </th> </tr></thead></table> <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
