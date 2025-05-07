export default {
  name: 'bulk-clear-characteristics',
  label: 'Clear characteristic values',
  icon: 'trash',
  async execute(productIds) {
    const confirmClear = confirm(`Clear characteristic values for ${productIds.length} products?`);
    if (!confirmClear) return;

    // Step 1: Load all attributes
    const attributeResponse = await fetch('/api/rest/v1/attributes?limit=1000', {
      headers: { 'Accept': 'application/json' },
      credentials: 'same-origin',
    });

    const attributeData = await attributeResponse.json();
    const characteristicAttrs = attributeData._embedded.items
      .filter(attr => attr.group.startsWith('characteristics_'))
      .map(attr => attr.code);

    for (const identifier of productIds) {
      const response = await fetch(`/api/rest/v1/products/${identifier}`, {
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin',
      });

      if (!response.ok) {
        console.warn(`Failed to fetch product ${identifier}`);
        continue;
      }

      const product = await response.json();
      const clearedValues = {};

      for (const attr of characteristicAttrs) {
        if (product.values[attr]) {
          clearedValues[attr] = null;
        }
      }

      if (Object.keys(clearedValues).length === 0) {
        console.log(`No characteristic values to clear for ${identifier}`);
        continue;
      }

      const patchResponse = await fetch(`/api/rest/v1/products/${identifier}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ values: clearedValues }),
      });

      if (!patchResponse.ok) {
        console.error(`Failed to clear product ${identifier}`);
      }
    }

    alert('Characteristic values cleared (only visible & allowed attributes).');
  }
};