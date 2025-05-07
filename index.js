window.addEventListener("message", function (event) {
  // Log the message to see if it's received
  console.log("Received message:", event);

  if (event.origin !== "https://coruscating-hotteok-fda7bf.netlify.app") {
    console.error("Invalid origin");
    return;
  }

  window.parent.postMessage({ status: "success", message: "Hello from the extension!" }, "*");
});
