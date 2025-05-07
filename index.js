window.addEventListener("message", function (event) {
  console.log("Received message from:", event.origin);
  console.log("Message content:", event.data);
  
  // Verify message origin to ensure it's from Akeneo
  if (event.origin !== "https://coruscating-hotteok-fda7bf.netlify.app") {
    console.error("Invalid origin, message ignored.");
    return;
  }

  // Check if we received product codes in the message
  if (event.data && event.data.productCodes) {
    const productCodes = event.data.productCodes;
    console.log("Product codes received:", productCodes);
    
    // Simple static response back to Akeneo to confirm
    window.parent.postMessage(
      {
        status: "done",
        message: `Handled ${productCodes.length} product(s).`
      },
      "*"
    );
  } else {
    console.log("No product codes found in message.");
    window.parent.postMessage(
      {
        status: "error",
        message: "No product codes found."
      },
      "*"
    );
  }
});
