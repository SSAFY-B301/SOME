self.addEventListener("install", function (event) {});

this.addEventListener("fetch", function (event) {
  // it can be empty if you just want to get rid of that error
});

self.addEventListener("message", (event) => {
  const parseData = JSON.parse(event.data);
  event.waitUntil(
    self.registration.showNotification(parseData.type, {
      body: parseData.content,
    })
  );
});
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  clients.openWindow("https://k8b301.p.ssafy.io/notification");
});
