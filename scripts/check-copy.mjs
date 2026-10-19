import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const copy = JSON.parse(readFileSync('src/copy.json', 'utf8'))
const hash = createHash('sha256').update(JSON.stringify(copy)).digest('hex')
// Baseline: exact revised copy supplied October 19, 2026; labels are structural.
assert.equal(hash, '91b47c4f8ac63e7c546e4e057cb1401f441e16dcc8de215079393a5e6fa192a3', 'Approved copy changed: review against the authoritative prompt.')
assert.equal(Object.keys(copy).length, 11)
const allText = JSON.stringify(copy)
assert(allText.includes('Whole-Life Strategy Session'))
assert(!/personal advisory/i.test(allText))
assert(allText.includes('Whole-Life Action Roadmap'))
assert(!/30.minute|follow.up session|\$\d|pay.as.you.go/i.test(allText))
const html = readFileSync('dist/index.html', 'utf8')
assert.match(html, /<html lang="en">/)
assert.match(html, /name="introductory-conversation"/)
assert.match(html, /data-netlify="true"/)
assert.match(html, /netlify-honeypot="company"/)
for (const field of ['form-name', 'company', 'name', 'email', 'message']) assert(html.includes(`name="${field}"`), `Missing static form field: ${field}`)
assert.match(html, /https:\/\/diplomatwithin.com\//)
assert(html.includes('https://diplomatwithin.com/images/island-dawn.webp'))
console.log('Approved copy integrity, offering boundaries, SEO basics, and built Netlify form declaration passed.')
