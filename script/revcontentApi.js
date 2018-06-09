const $ = require("jquery");

function parseRevcontentAds(data, callback) {

 callback(data);
 return;
  
}

module.exports = {

    retriveRevcontentAds: function (callback) {
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
            success: function (data) {
                parseRevcontentAds(data, callback)

            },

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



}






