chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message.type) {
      case "getAddress":
        const addynode = document.getElementsByClassName("_5xhp fsm fwn fcg")
        const address = Array.from(addynode).pop().innerHTML
        sendResponse({ address })
        break
      default:
        console.error("Uber script is not working right now")
    }
  }
)
