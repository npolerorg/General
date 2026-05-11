const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const m = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!m) { console.log("No babel script found"); process.exit(1); }
console.log("Script length:", m[1].length);
try {
  new Function(m[1]);
  console.log("OK - no syntax errors");
} catch(e) {
  console.log("SYNTAX ERROR:", e.message);
}
