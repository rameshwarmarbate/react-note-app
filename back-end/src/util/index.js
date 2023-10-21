const repair = (base64Data, mimetype) => {
  const binaryData = atob(base64Data);
  const byteArray = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    byteArray[i] = binaryData.charCodeAt(i);
  }
  return new Blob([byteArray], { type: mimetype });
};

module.exports = { repair };
