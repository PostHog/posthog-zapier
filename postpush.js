const fs = require('fs')

const zapierApp = JSON.parse(fs.readFileSync('.zapierapprc', 'utf8'))

console.log(`Complete your private PostHog integration at https://zapier.com/app/developer/app/${zapierApp.id}.`)
