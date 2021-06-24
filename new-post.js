// Usage:
// yarn new <name>
const arg = process.argv.pop()
const fs = require('fs').promises
fs.appendFile(`./content/articles/${arg}.md`, `---
title: ${arg}
createTime: ${Date.now()}
---
`).then()
// eslint-disable-next-line no-console
console.log(`created ./content/articles/${arg}.md`)
