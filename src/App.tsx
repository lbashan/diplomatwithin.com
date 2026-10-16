import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 60)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer: IntersectionObserver | null = !reducedMotion && 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          })
        }, { threshold: 0.08 })
      : null
    document.querySelectorAll('.reveal').forEach(element => {
      if (observer) {
        element.classList.add('will-reveal')
        observer.observe(element)
      }
    })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      observer?.disconnect()
    }
  }, [])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : 'at-top'}`}>
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
        <div className="hero-visual"><img src="/images/island-dawn.webp" srcSet="/images/island-dawn-mobile.webp 800w, /images/island-dawn.webp 1536w" sizes="100vw" width="1536" height="1024" alt="" fetchPriority="high"/><div className="hero-shade"/></div>
        <div className="hero-orbits" aria-hidden="true"><span/><span/></div>
      </section>
      <section className="section who" aria-labelledby="who-title">
        <div className="two-column who-story"><div className="reveal"><h2 id="who-title" data-copy="5">You can have a good life <em>and still want more from it.</em></h2><figure className="garden-window"><img src="/images/garden-path.webp" alt="Sunlight along a lush island-inspired garden path; AI-created landscape artwork." width="1024" height="1024" loading="lazy" decoding="async"/><span className="window-orbit" aria-hidden="true"/></figure></div><div className="prose reveal"><Paragraphs from={6} to={9}/></div></div>
      </section>
      <section className="section philosophy" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-marker"><span>Philosophy</span><i/></div>
        <div className="philosophy-heading reveal"><h2 id="philosophy-title" data-copy="10">Create the life you want. <em>Enjoy the life you have.</em></h2><svg className="globe-mark" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="34"/><ellipse cx="50" cy="50" rx="15" ry="34"/><path d="M16 50h68M22 31c17 10 39 10 56 0M22 69c17-10 39-10 56 0"/><path className="globe-orbit" d="M10 73C-5 48 68-6 89 27s-43 74-69 59"/><circle className="globe-star" cx="88" cy="26" r="3"/></svg></div>
        <div className="philosophy-prose prose reveal"><Paragraphs from={11} to={15}/></div>
        <div className="quote-landscape global-quote reveal"><img src="/images/global-perspective.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async"/><blockquote data-copy="16"><span className="quote-mark" aria-hidden="true">“</span>{text(16)}</blockquote><span className="quote-orbit" aria-hidden="true"/></div>
      </section>
      <section className="section work" id="work-with-me" aria-labelledby="work-title">
        <div className="section-marker"><span>Work With Me</span><i/></div>
        <div className="two-column section-intro reveal"><h2 id="work-title" data-copy="17">{text(17)}</h2><div className="prose"><Paragraphs from={18} to={20}/></div></div>
        <ol className="steps">
          <li className="step reveal"><div><h3 data-copy="21">{text(21)}</h3><p className="step-meta" data-copy="22">{text(22)}</p><div className="prose"><Paragraphs from={23} to={25}/></div><IntroLink/></div></li>
          <li className="step strategy reveal"><div><h3 data-copy="27">{text(27)}</h3><p className="step-meta" data-copy="28">{text(28)}</p><div className="prose"><Paragraphs from={29} to={31}/></div><p className="includes-label" data-copy="32">{text(32)}</p><ul className="includes">{[33,34,35].map(i => { const split = text(i).indexOf(':'); return <li key={i} data-copy={i}><span className="small-mark" aria-hidden="true">↗</span><p><strong>{text(i).slice(0,split+1)}</strong>{text(i).slice(split+1)}</p></li> })}</ul></div></li>
          <li className="step reveal"><div><h3 data-copy="36">{text(36)}</h3><div className="prose"><Paragraphs from={37} to={39}/></div></div></li>
        </ol>
      </section>
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="section-marker"><span>About</span><i/></div>
        <div className="about-heading"><h2 id="about-title" data-copy="40">{text(40)}</h2><p className="serif-subtitle" data-copy="41">{text(41)}</p></div>
        <div className="about-layout"><div className="about-aside"><figure className="portrait-photo"><img src="/images/lyla-portrait.webp" alt="Lyla Bashan" width="900" height="1200" loading="lazy" decoding="async"/></figure></div><div className="prose biography"><Paragraphs from={42} to={50}/></div></div>
      </section>
      <section className="section priorities" aria-labelledby="priorities-title"><div className="priorities-inner reveal"><svg className="lotus-mark" viewBox="0 0 120 90" fill="none" aria-hidden="true"><path d="M60 71C39 58 38 36 60 12c22 24 21 46 0 59Z"/><path d="M59 71C33 73 15 53 17 29c28 2 43 19 42 42ZM61 71c26 2 44-18 42-42-28 2-43 19-42 42Z"/><path d="M58 73C30 86 10 72 5 51c23-6 42 3 53 22ZM62 73c28 13 48-1 53-22-23-6-42 3-53 22Z"/><path d="M28 84h64"/></svg><h2 id="priorities-title" data-copy="51">{text(51)}</h2><div className="prose"><Paragraphs from={52} to={55}/></div></div></section>
      <section className="section faq" id="faq" aria-labelledby="faq-title"><div className="section-marker"><span>FAQ</span><i/></div><div className="two-column reveal"><h2 id="faq-title" data-copy="56">{text(56)}</h2><div className="questions">{[57,59,61,63,65].map(i => <details key={i}><summary><h3 data-copy={i}>{text(i)}</h3><span aria-hidden="true" className="disclosure-icon">+</span></summary><p data-copy={i+1}>{text(i+1)}</p></details>)}</div></div></section>
      <section className="section contact" id="contact" aria-labelledby="contact-title"><div className="section-marker"><span>Contact</span><i/></div><div className="two-column"><div><h2 id="contact-title" data-copy="67">{text(67)}</h2><div className="prose"><Paragraphs from={68} to={71}/></div></div><ContactForm/></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#top" className="footer-brand" data-copy="80">{text(80)}</a><p className="footer-tagline" data-copy="81">{text(81)}</p></div><p className="footer-location" data-copy="82">{text(82)}</p><div className="footer-bottom"><p data-copy="83">{text(83)}</p><p data-copy="84">{text(84)}</p><a href="#top">Back to top ↑</a></div></footer>
  </>
}
