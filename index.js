window.addEventListener("message", function (event) {
  console.log("Received message from:", event.origin);
  console.log("Message content:", event.data);
  
  // Verify message structure and ensure the product codes are provided
  if (event.origin !== "https://tvhsandbox.cloud.akeneo.com") {
    console.error("Invalid origin, message ignored.");
    return;
  }

  if (event.data && event.data.productCodes) {
    const productCodes = event.data.productCodes;
    console.log("Product codes received:", productCodes);

    // Respond with the number of products received
    window.parent.postMessage({
      status: "done",
      message: `Handled ${productCodes.length} product(s)`
    }, "*");
  } else {
    console.error("No product codes found in the message");
    window.parent.postMessage({
      status: "error",
      message: "No product codes found in the message."
    }, "*");
  }
});
