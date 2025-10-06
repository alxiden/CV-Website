Office.onReady(function() {
  // Office.js is ready
});

function onSpamReport(event) {
  // Get the current item (email)
  var item = Office.context.mailbox.item;

  // Forward the email
  item.forwardAsync({
    toRecipients: ["it-team@example.com"],
    // Optionally, you can add a message
    htmlBody: "<p>This email was reported as suspicious by a user.</p>"
  }, function(asyncResult) {
    if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
      // Optionally, show a notification or confirmation
      Office.context.mailbox.item.notificationMessages.addAsync("reportSuccess", {
        type: "informationalMessage",
        message: "Email reported to IT.",
        icon: "icon16",
        persistent: false
      });
    } else {
      // Optionally, show an error
      Office.context.mailbox.item.notificationMessages.addAsync("reportError", {
        type: "errorMessage",
        message: "Failed to report email."
      });
    }
    // Indicate the function is complete
    event.completed();
  });
}

// Make the function available globally
window.onSpamReport = onSpamReport;