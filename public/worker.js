(() => {
  var __require = typeof require !== "undefined" ? require : (x) => {
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/client/constants.ts
  var FILE_NAME = "large_file";

  // src/client/worker.ts
  self.onmessage = (msg) => __async(void 0, null, function* () {
    var _a;
    const handle = msg.data;
    const writable = yield handle.createWritable();
    const response = yield fetch(`/files/download/${FILE_NAME}`);
    yield (_a = response.body) == null ? void 0 : _a.pipeTo(writable);
  });
})();
