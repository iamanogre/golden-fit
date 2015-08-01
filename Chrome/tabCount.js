/* notification and tab counter events js */

/* global variables and options (static so far) */
var id = null;
var counter = 0;
var options = {
		type: "image",
		title: "Golden Fit",
		message: "5 pushups! Keep it up!",
		iconUrl: "gold.png",
		imageUrl: "GoldenFit.png",
		buttons: [{ title: 'Close', }],
	};

function count() {
	counter++;
	if (counter === 25) {
		id = goldenfit();
		counter = 0;
	}
}

function goldenfit() {
	var notID = chrome.notifications.create(options);
	return notID;
}

// list of tab events we are going to count!
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { count(); });

function replyBtnClick(notID, buttonIndex) {
	chrome.notifications.clear(id);
	id = null;
}

/* close when user clicks on button */
chrome.notifications.onButtonClicked.addListener(replyBtnClick);

/* reset id to null */
function ensureDelete(notID, byUser) { id = null; }

/* user told to close or system closed */
chrome.notifications.onClose.addListener(ensureDelete);