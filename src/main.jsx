// Diagnostic wrapper — logs each stage to the on-screen bar so we can see
// exactly where loading fails on the user's phone. No top-level await, no
// modern-only syntax — kept deliberately simple.
var diag = function (s) { if (window.__zkDiag) window.__zkDiag(s); };

diag("[3] module entry reached");

Promise.all([
  import("react"),
  import("react-dom/client"),
  import("./ZenKeeper.jsx")
]).then(function (mods) {
  diag("[4] imports resolved");
  var React = mods[0].default || mods[0];
  var ReactDOM = mods[1].default || mods[1];
  var ZenKeeper = mods[2].default;
  diag("[5] modules unwrapped");

  try {
    var root = ReactDOM.createRoot(document.getElementById("root"));
    diag("[6] root created");
    root.render(React.createElement(React.StrictMode, null, React.createElement(ZenKeeper)));
    diag("[7] render called");

    requestAnimationFrame(function () {
      if (document.getElementById("root").childElementCount) {
        var d = document.getElementById("diag");
        if (d) d.remove();
      } else {
        diag("[8 NOT MOUNTED] root has no children after render");
      }
    });
  } catch (e) {
    diag("[RENDER ERROR] " + (e && e.message ? e.message : e));
  }
}).catch(function (e) {
  diag("[IMPORT ERROR] " + (e && e.message ? e.message : e));
});
