const $ = require("jquery");

function retriveRevcontentAds() {
   

    const Store = require('electron-store');
    const store = new Store();

    const revcontentApiKey = store.get('revcontent_api_key', null);
    const pushengageApiKey = store.get('pushengage_api_key', null);

    if (!revcontentApiKey || !pushengageApiKey) {
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
        success: parseRevcontentAds,
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            var dialog = remote.require('electron').dialog
            dialog.showMessageBox({
                message: "Error type: " + errorThrown,
                type: "error",
                buttons: ["OK"]
            });
        },
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }

    });
}





const getRevContentAddsBtn = document.getElementById('getRevContentAdds')


getRevContentAddsBtn.addEventListener('click', (event) => {
    retriveRevcontentAds();
})


console.log('dddd')

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
