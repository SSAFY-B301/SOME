self.addEventListener("install", function (event) {});

this.addEventListener("fetch", function (event) {
  // it can be empty if you just want to get rid of that error
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  window.location.href("https://k8b301.p.ssafy.io/notification");
});
