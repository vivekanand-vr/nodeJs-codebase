// ------------------------
// 🌐 Version 1: Using Callbacks
// ------------------------

function downloadData(url, callback) {
  console.log(`⬇️ Downloading from ${url}...`);
  setTimeout(() => {
    const data = `Data from ${url}`;
    console.log(`✅ Downloaded from ${url}`);
    callback(null, data);
  }, 1000);
}

function saveToFile(data, callback) {
  console.log(`💾 Saving data to file...`);
  setTimeout(() => {
    const fileName = `file_${Date.now()}.txt`;
    console.log(`✅ Data saved to ${fileName}`);
    callback(null, fileName);
  }, 1000);
}

function uploadFile(fileName, targetUrl, callback) {
  console.log(`📤 Uploading ${fileName} to ${targetUrl}...`);
  setTimeout(() => {
    console.log(`✅ Uploaded ${fileName} to ${targetUrl}`);
    callback(null, "Upload successful");
  }, 1000);
}

// Using the callback-based flow
downloadData("https://example.com/api/data", function (err, data) {
  if (err) return console.error("Download failed");

  saveToFile(data, function (err, fileName) {
    if (err) return console.error("Saving failed");

    uploadFile(fileName, "https://upload.example.com", function (err, result) {
      if (err) return console.error("Upload failed");

      console.log("🎉 All operations done (Callback):", result);
    });
  });
});


// ------------------------
// 🔁 Version 2: Using Promises
// ------------------------

function downloadDataPromise(url) {
  console.log(`⬇️ Downloading from ${url}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = `Data from ${url}`;
      console.log(`✅ Downloaded from ${url}`);
      resolve(data);
    }, 1000);
  });
}

function saveToFilePromise(data) {
  console.log(`💾 Saving data to file...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileName = `file_${Date.now()}.txt`;
      console.log(`✅ Data saved to ${fileName}`);
      resolve(fileName);
    }, 1000);
  });
}

function uploadFilePromise(fileName, targetUrl) {
  console.log(`📤 Uploading ${fileName} to ${targetUrl}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Uploaded ${fileName} to ${targetUrl}`);
      resolve("Upload successful");
    }, 1000);
  });
}

// Using the Promise-based flow
downloadDataPromise("https://example.com/api/data")
  .then((data) => saveToFilePromise(data))
  .then((fileName) => uploadFilePromise(fileName, "https://upload.example.com"))
  .then((result) => {
    console.log("🎉 All operations done (Promise):", result);
  })
  .catch((err) => {
    console.error("❌ Error occurred:", err);
  });
