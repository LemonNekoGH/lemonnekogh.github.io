// Usage:
// yarn new <name>
function main() {
  if (process.argv.length < 3) {
    console.log('Usage: yarn new <post-name>')
    return
  }
  const arg = process.argv[2]
  const fs = require('fs').promises
  fs.appendFile(`./content/articles/${arg}.md`, `---
title: ${arg}
createTime: ${Date.now()}
---
`).then()
  console.log(`created ./content/articles/${arg}.md`)
}

main()
