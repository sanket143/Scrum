const {app, BrowserWindow} = require("electron");
const {Menu} = require('electron')
/*  
  const template = [
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })
  
    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )
  
    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
let mainWindow;
*/
function createWindow(){
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadFile("source/index.html");

  mainWindow.on("closed", function(){
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", function(){

  if(process.platform !== "darwin"){ // For OSX
    app.quit();
  }
});

app.on("activate", function(){

  if(mainWindow === null){
    createWindow();
  }
});


