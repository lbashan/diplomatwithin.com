import { useState } from 'react'
import type { FormEvent } from 'react'
import copy from './copy.json'

const nav = [['Philosophy', 'philosophy'], ['Work With Me', 'work-with-me'], ['About', 'about'], ['FAQ', 'faq'], ['Contact', 'contact']]
const text = (i: number) => copy[i]
function Paragraphs({ from, to }: { from: number; to: number }) {
  return <>{copy.slice(from, to + 1).map((p, i) => <p key={i} data-copy={from + i}>{p}</p>)}</>
}
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span> }
function IntroLink({ light = false }: { light?: boolean }) {
  return <a className={`cta ${light ? 'cta-light' : ''}`} href="#contact">{text(3).slice(1, -1)}<Arrow /></a>
}
function Horizon({ portrait = false }: { portrait?: boolean }) {
  return <svg className={`horizon-art ${portrait ? 'portrait-art' : ''}`} viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id={portrait ? 'sky-p' : 'sky'} x2="0" y2="1"><stop stopColor="#e9dfcd"/><stop offset="1" stopColor="#c3d0c3"/></linearGradient>
      <linearGradient id={portrait ? 'water-p' : 'water'} x2="0.8" y2="1"><stop stopColor="#728f8a"/><stop offset="1" stopColor="#244c58"/></linearGradient>
    </defs>
    <path fill={`url(#${portrait ? 'sky-p' : 'sky'})`} d="M0 0h800v1000H0z"/>
    <circle cx="540" cy="310" r="89" fill="#f4ecd9"/>
    <path fill="#a5b5a4" d="M0 535 Q150 410 300 495 T800 470 V1000H0z"/>
    <path fill={`url(#${portrait ? 'water-p' : 'water'})`} d="M0 567 Q340 520 800 580V1000H0z"/>
    <path fill="#526f61" d="M0 530 Q105 550 170 665 Q250 730 340 747 Q450 785 392 1000H0z"/>
    <path fill="#354f43" d="M0 627Q110 640 153 733T300 847Q380 940 260 1000H0z"/>
    <path d="M183 692Q220 748 335 775T394 944" fill="none" stroke="#e0cfb0" strokeWidth="9" opacity=".75"/>
    <g fill="none" stroke="#e2e6d8" strokeWidth="1.5" opacity=".4"><path d="M370 640q150-30 360 0"/><path d="M450 686q150-20 320 0"/><path d="M470 832q130-24 300 0"/><path d="M433 920q160-25 360 0"/></g>
    <path d="M670 0Q610 103 663 209 M660 120q-57-12-71-58 M647 95q72-17 85-62 M658 161q60-2 85-49" fill="none" stroke="#35453d" strokeWidth="3" opacity=".6"/>
    <g fill="#526653" opacity=".7"><ellipse cx="586" cy="60" rx="12" ry="34" transform="rotate(-35 586 60)"/><ellipse cx="729" cy="36" rx="12" ry="34" transform="rotate(35 729 36)"/><ellipse cx="740" cy="112" rx="11" ry="32" transform="rotate(50 740 112)"/></g>
  </svg>
}
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    // Vite's development and preview servers do not process Netlify submissions.
    if (['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
      setError('This local preview cannot send inquiries. Please email lyla@diplomatwithin.com, or test the form after Netlify deployment.')
      setStatus('error'); return
    }
    setStatus('sending'); setError('')
    const data = new URLSearchParams()
    new FormData(form).forEach((value, key) => data.append(key, String(value)))
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data.toString() })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success'); form.reset()
    } catch {
      setError('Your inquiry could not be sent. Please try again, or email lyla@diplomatwithin.com directly.')
      setStatus('error')
    }
  }
  return <div className="form-panel">
    <h3>{text(72)}</h3>
    <form name="introductory-conversation" method="POST" data-netlify="true" netlify-honeypot="company" onSubmit={submit} aria-describedby="form-note">
      <input type="hidden" name="form-name" value="introductory-conversation"/>
      <div hidden><label>Leave this field empty<input name="company" tabIndex={-1} autoComplete="off"/></label></div>
      <div className="field"><label htmlFor="name">{text(74)} <span aria-hidden="true">*</span></label><input id="name" name="name" autoComplete="name" required maxLength={160}/></div>
      <div className="field"><label htmlFor="email">{text(75)} <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254}/></div>
      <div className="field"><label htmlFor="message">{text(76)}</label><textarea id="message" name="message" rows={4} maxLength={5000}/></div>
      <button className="cta" type="submit" disabled={status === 'sending' || status === 'success'}>{status === 'sending' ? 'Sending…' : text(77).slice(1, -1)}<Arrow/></button>
      <p className="form-note" id="form-note">{text(78)}</p>
      <div aria-live="polite" aria-atomic="true">{status === 'success' && <p className="form-feedback success" role="status">Thank you for reaching out. I'll be in touch to arrange a time.</p>}</div>
      {status === 'error' && <p className="form-feedback error" role="alert">{error}</p>}
    </form>
    <p className="email-alternative">You can also reach me directly at <a href="mailto:lyla@diplomatwithin.com">lyla@diplomatwithin.com</a>.</p>
  </div>
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="The Diplomat Within, home"><span>The Diplomat</span><span>Within<span className="brand-dot">.</span></span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="header-cta" href="#contact">Request an Introductory Conversation<Arrow/></a>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-content">
          <span className="eyebrow">The Diplomat Within</span>
          <h1 id="hero-title" data-copy="0">Be ambitious <br/>about your <br/><em>whole life.</em></h1>
          <p className="hero-lead" data-copy="1">{text(1)}</p>
          <p data-copy="2">{text(2)}</p>
          <IntroLink/><p className="micro" data-copy="4">{text(4)}</p>
        </div>
        <div className="hero-visual"><Horizon/><div className="art-caption"><span>Hawaiʻi Island</span><span aria-hidden="true">19° N · 155° W</span></div><span className="art-note">An island-inspired illustration</span></div>
      </section>
      <section className="section who" aria-labelledby="who-title">
        <div className="section-marker" aria-hidden="true"><span>01</span><i/></div>
        <div className="two-column"><h2 id="who-title" data-copy="5">{text(5)}</h2><div className="prose"><Paragraphs from={6} to={9}/></div></div>
      </section>
      <section className="section philosophy" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-marker"><span>02 / Philosophy</span><i/></div>
        <div className="two-column"><h2 id="philosophy-title" data-copy="10">Create the life <br/>you want. <br/><em>Enjoy the life <br/>you have.</em></h2><div className="prose"><Paragraphs from={11} to={15}/></div></div>
        <blockquote data-copy="16"><span className="quote-mark" aria-hidden="true">“</span>{text(16)}</blockquote>
      </section>
      <section className="section work" id="work-with-me" aria-labelledby="work-title">
        <div className="section-marker"><span>03 / Work With Me</span><i/></div>
        <div className="two-column section-intro"><h2 id="work-title" data-copy="17">{text(17)}</h2><div className="prose"><Paragraphs from={18} to={20}/></div></div>
        <ol className="steps">
          <li className="step"><span className="step-number" aria-hidden="true">01</span><div><h3 data-copy="21">{text(21)}</h3><p className="step-meta" data-copy="22">{text(22)}</p><div className="prose"><Paragraphs from={23} to={25}/></div><IntroLink/></div></li>
          <li className="step strategy"><span className="step-number" aria-hidden="true">02</span><div><h3 data-copy="27">{text(27)}</h3><p className="step-meta" data-copy="28">{text(28)}</p><div className="prose"><Paragraphs from={29} to={31}/></div><p className="includes-label" data-copy="32">{text(32)}</p><ul className="includes">{[33,34,35].map(i => { const split = text(i).indexOf(':'); return <li key={i} data-copy={i}><span className="small-mark" aria-hidden="true">↗</span><p><strong>{text(i).slice(0,split+1)}</strong>{text(i).slice(split+1)}</p></li> })}</ul></div></li>
          <li className="step"><span className="step-number" aria-hidden="true">03</span><div><h3 data-copy="36">{text(36)}</h3><div className="prose"><Paragraphs from={37} to={39}/></div></div></li>
        </ol>
      </section>
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="section-marker"><span>04 / About</span><i/></div>
        <div className="about-layout"><div className="about-aside"><h2 id="about-title" data-copy="40">{text(40)}</h2><p className="serif-subtitle" data-copy="41">{text(41)}</p><figure className="portrait-placeholder"><Horizon portrait/><div className="portrait-label"><span className="portrait-monogram" aria-hidden="true">LB</span><span>Portrait of Lyla<br/><small>Photo to come</small></span></div><figcaption>Portrait placeholder · Lyla Bashan</figcaption></figure></div><div className="prose biography"><Paragraphs from={42} to={50}/></div></div>
      </section>
      <section className="section priorities" aria-labelledby="priorities-title"><div className="priorities-inner"><span className="horizon-mark" aria-hidden="true">⌒</span><h2 id="priorities-title" data-copy="51">{text(51)}</h2><div className="prose"><Paragraphs from={52} to={55}/></div></div></section>
      <section className="section faq" id="faq" aria-labelledby="faq-title"><div className="section-marker"><span>05 / FAQ</span><i/></div><div className="two-column"><h2 id="faq-title" data-copy="56">{text(56)}</h2><div className="questions">{[57,59,61,63,65].map(i => <details key={i}><summary><h3 data-copy={i}>{text(i)}</h3><span aria-hidden="true" className="disclosure-icon">+</span></summary><p data-copy={i+1}>{text(i+1)}</p></details>)}</div></div></section>
      <section className="section contact" id="contact" aria-labelledby="contact-title"><div className="section-marker"><span>06 / Contact</span><i/></div><div className="two-column"><div><h2 id="contact-title" data-copy="67">{text(67)}</h2><div className="prose"><Paragraphs from={68} to={71}/></div></div><ContactForm/></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#top" className="footer-brand" data-copy="80">{text(80)}</a><p className="footer-tagline" data-copy="81">{text(81)}</p></div><p className="footer-location" data-copy="82">{text(82)}</p><div className="footer-bottom"><p data-copy="83">{text(83)}</p><p data-copy="84">{text(84)}</p><a href="#top">Back to top ↑</a></div></footer>
  </>
}
