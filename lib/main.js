var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var notifications = require("sdk/notifications");
// navigates to "data" directory
var self = require("sdk/self");

var TABEVENTS = 20;

var panel = panels.Panel({
  width:300,
  height:250,
  contentURL: self.data.url("about.html"),
  onHide: handleHide
});

var button = ToggleButton({
  id: "my-button",
  label: "Golden Fit",
  icon: "./32.png",
  onChange: handleChange
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
} 

function note() {
  notifications.notify({
  title: "Golden Fit",
  text: "Do 5 pushups!",
  iconURL: self.data.url("32.png"),
  });
}

var events = 0;
function test() {
  events += 1;
  if (events === TABEVENTS) {
    note();
    events = 0;
  }
}

var tabs = require("sdk/tabs");
tabs.on("open", test);
tabs.on("close", test);
tabs.on("deactivate", test);
tabs.on("activate", test);
tabs.on("ready", test);

/* notifications have these fields */
/* title - a string to display as message's title
  text - sting to display as body of message
  iconURL - the url of an icon to display inside the message
      can be a remote URL, data URI, or a URL returned by the self module
  onClick - fucntion called by user when clicks on message
  data - a string that will be passed to onClick */