const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const m = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!m) { console.log("No babel script found"); process.exit(1); }
const code = m[1];
const lines = code.split('\n');

let count = 0;
let minCount = Infinity;
let minLine = -1;
for (let i = 0; i < lines.length; i++) {
  for (const ch of lines[i]) {
    if (ch === '(') count++;
    if (ch === ')') {
      count--;
      if (count < 0 && count < minCount) {
        minCount = count;
        minLine = i + 1;
        console.log('UNDERFLOW at script line ' + (i+1) + ' count=' + count + ': ' + lines[i].substring(0, 120));
      }
    }
  }
}
console.log('\nFinal paren balance:', count);

// Also check the TimeTrackingTab function specifically
let ttStart = -1, ttEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function TimeTrackingTab()')) ttStart = i;
  // Find the closing of the function by tracking brace balance from ttStart
}
if (ttStart >= 0) {
  console.log('\nTimeTrackingTab starts at script line', ttStart + 1);
  let braceCount = 0;
  let parenCount = 0;
  let started = false;
  for (let i = ttStart; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') { braceCount++; started = true; }
      if (ch === '}') braceCount--;
      if (ch === '(') parenCount++;
      if (ch === ')') parenCount--;
    }
    if (started && braceCount === 0) {
      console.log('TimeTrackingTab ends at script line', i + 1);
      console.log('TimeTrackingTab paren balance:', parenCount);
      break;
    }
    if (parenCount < 0) {
      console.log('Paren underflow at script line', i + 1, 'count:', parenCount, lines[i].substring(0, 120));
    }
  }
}
