const {ipcMain, dialog} = require('electron')

ipcMain.on('open-error-dialog', (event, arg) => {
  dialog.showErrorBox('An Error Message', arg)
})
