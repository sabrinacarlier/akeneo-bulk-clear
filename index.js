const secret = "684tpg2b27wg8wc00os4cg44w0kk8gsc4woc4g4w44scgoocwo"; // Replace with your generated secret

window.addEventListener("message", function (event) {
  // Ensure the message is from Akeneo and contains the correct secret
  if (event.origin !== "https://coruscating-hotteok-fda7bf.netlify.app" || event.data.secret !== secret) {
    console.error("Invalid origin or secret.");
    return;
  }

  console.log("Received message:", event.data);

  if (event.data && event.data.productCodes) {
    const productCodes = event.data.productCodes;
    console.log("Product codes received:", productCodes);

    window.parent.postMessage({
      status: "done",
      message: `Handled ${productCodes.length} product(s).`
    }, "*");
  } else {
    console.error("No product codes found in the message.");
    window.parent.postMessage({
      status: "error",
      message: "No product codes found."
    }, "*");
  }
});
