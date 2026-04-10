"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    const validChannels = ["close-widget", "minimize-main", "close-main"];
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.send(channel, data);
    }
  },
  invoke: (channel, data) => {
    const validChannels = ["get-app-version"];
    if (validChannels.includes(channel)) {
      return electron.ipcRenderer.invoke(channel, data);
    }
    return Promise.reject(new Error(`Invalid channel: ${channel}`));
  },
  on: (channel, func) => {
    const validChannels = ["widget-show"];
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
