window.addEventListener("message", function (event) {
  console.log("Message from origin:", event.origin);
  console.log("Received message:", event.data);
  
  if (event.data && event.data.productCodes) {
    const productCodes = event.data.productCodes;
    console.log("Received product codes:", productCodes);

    // Confirm to Akeneo
    window.parent.postMessage(
      { status: "test_completed", message: "Connection successful!" },
      "*"
    );
  }
});
