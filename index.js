window.addEventListener("message", function (event) {
  console.log("Message received from:", event.origin);
  console.log("Message content:", event.data);

  if (event.data && event.data.productCodes) {
    const productCodes = event.data.productCodes;
    console.log("Product codes received:", productCodes);

    // Send a fast dummy response to avoid timeout
    window.parent.postMessage(
      {
        status: "done",
        message: `Handled ${productCodes.length} product(s)`
      },
      "*"
    );
  }
});
