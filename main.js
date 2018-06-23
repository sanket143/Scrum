'use strict'

const {app, BrowserWindow} = require("electron");

let mainWindow;

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


