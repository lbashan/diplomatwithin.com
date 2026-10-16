import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const copy = JSON.parse(readFileSync('src/copy.json', 'utf8'))
const hash = createHash('sha256').update(JSON.stringify(copy)).digest('hex')
// Baseline: approved master copy with its duplicate About heading removed, plus the owner-requested diplomatic-skills biography amendment.
assert.equal(hash, 'e75b5caf14d8f99b8c5bd8c9733623275dddae47111c4675aa30e9579e2dccff', 'Approved copy changed: review against the authoritative document before updating this baseline.')
assert.equal(copy.length, 85)
assert.equal(copy.filter(p => p === 'Meet Lyla.').length, 1)
assert(copy.some(p => p.includes('two decades as a U.S. diplomat')))
assert(copy.some(p => p.includes('Your personalized Whole-Life Action Roadmap:')))
assert(!/30.minute|follow.up session|\$\d|pay.as.you.go/i.test(copy.join(' ')))
const html = readFileSync('dist/index.html', 'utf8')
assert.match(html, /<html lang="en">/)
assert.match(html, /name="introductory-conversation"/)
assert.match(html, /data-netlify="true"/)
assert.match(html, /netlify-honeypot="company"/)
for (const field of ['form-name', 'company', 'name', 'email', 'message']) assert(html.includes(`name="${field}"`), `Missing static form field: ${field}`)
assert.match(html, /https:\/\/diplomatwithin.com\//)
assert(!html.includes('og:image'), 'Do not claim a social image exists')
console.log('Approved copy integrity, offering boundaries, SEO basics, and built Netlify form declaration passed.')
