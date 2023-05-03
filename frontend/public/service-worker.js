self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});

this.addEventListener("fetch", function (event) {
  // it can be empty if you just want to get rid of that error
});
