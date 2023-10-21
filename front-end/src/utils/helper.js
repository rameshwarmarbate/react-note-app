const formatDate = (string = "") => {
  const [date, time] = new Date(string)
    .toLocaleDateString("en-US", {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    })
    .split(",");
  if ((date, time)) {
    const [month, day] = date.split(" ");
    return `${time}    ${day}${month}`;
  }
  return "-";
};

const urltoFile = (url, filename, mimeType) => {
  if (url.startsWith("data:")) {
    var arr = url.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var file = new File([u8arr], filename, { type: mime || mimeType });
    return Promise.resolve(file);
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
};

export { formatDate, urltoFile };
