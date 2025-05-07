window.addEventListener("message", function (event) {
  // Ensure the message is from Akeneo
  if (event.origin !== "https://your-akeneo-instance.com") {
    return;
  }

  console.log("Received message:", event.data);
  
  if (event.data && event.data.productCodes) {
    // Simple test: just log the product codes for now
    const productCodes = event.data.productCodes;
    console.log("Received product codes:", productCodes);

    // Send a simple response back to Akeneo to confirm the communication
    window.parent.postMessage({ status: "test_completed", message: "Connection successful!" }, "*");
  }
});
