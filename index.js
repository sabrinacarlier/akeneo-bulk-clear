window.addEventListener("message", function (event) {
  // Ensure the message is from Akeneo
  if (event.origin !== "https://your-akeneo-instance.com") {
    return;
  }

  console.log("Received message:", event.data);
  
  if (event.data && event.data.productCodes) {
    const productCodes = event.data.productCodes;
    console.log("Processing products:", productCodes);
    
    // Call the function to clear attributes and handle success/failure
    clearProductAttributes(productCodes)
      .then(() => {
        // After clearing attributes, send a message back to Akeneo
        window.parent.postMessage({ status: "completed" }, "*");
      })
      .catch((error) => {
        console.error("Error clearing attributes:", error);
        window.parent.postMessage({ status: "failed", error: error.message }, "*");
      });
  }
});

// Function to clear attributes
function clearProductAttributes(productCodes) {
  return new Promise((resolve, reject) => {
    // Replace with your actual API endpoint for clearing attributes
    fetch("/path/to/your/akeneo/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization headers if necessary
      },
      body: JSON.stringify({
        productCodes: productCodes,
        // Include the list of attribute groups to clear
        attributeGroups: ["characteristics_forks", "characteristics_fork_protection"]
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully cleared attributes:", data);
        resolve(data); // Resolve the promise on success
      })
      .catch((error) => {
        console.error("Error clearing attributes:", error);
        reject(error); // Reject the promise on error
      });
  });
}
