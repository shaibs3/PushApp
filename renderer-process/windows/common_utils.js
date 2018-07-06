
module.exports = {
    showErrorDialog: function (error_msg) {
        var dialog = remote.require('electron').dialog
        dialog.showMessageBox({
            message: error_msg,
            type: "error",
            buttons: ["OK"]
        });
        return;
    },
    convertMonth: function (str) {
        switch (str) {
            case 'Jan':
                return '01'
            case 'Feb':
                return '02'
            case 'Mar':
                return '03'
            case 'Apr':
                return '04'
            case 'May':
                return '05'
            case 'Jun':
                return '06'
            case 'Jul':
                return '07'
            case 'Aug':
                return '08'
            case 'Sep':
                return '09'
            case 'Oct':
                return '10'
            case 'Nov':
                return '11'
            case 'Dec':
                return '12'

        }
    }
}
