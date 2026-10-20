import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import copy from './copy.json'
const sections = Object.values(copy)
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span> }
function IntroLink() { return <a className="cta" href="#contact">Request an Introductory Conversation<Arrow/></a> }
function Periods({ text }: { text: string }) { return <>{text.split('.').map((part,i,parts)=><span key={i}>{part}{i<parts.length-1 && <span className="accent-period">.</span>}</span>)}</> }
function BodyText({ text }: { text: string }) {
  const title = 'Global: An Extraordinary Guide for Ordinary Heroes'
  return <>{text.split(title).map((part,i)=><span key={i}>{i>0 && <em>{title}</em>}{part}</span>)}</>
}
function Lines({ lines }: { lines: string[] }) { return <>{lines.map((line, i) => <p key={i}><BodyText text={line}/></p>)}</> }
function Entry({ section, label, occurrence = 0 }: { section: number; label: string; occurrence?: number }) {
  const entry = sections[section].filter(e => e.label === label)[occurrence]
  return entry ? <Lines lines={entry.text}/> : null
}
function heading(section: number, label = 'Heading') { return <Periods text={sections[section].find(e => e.label === label)?.text[0] || ''}/> }
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
    <h3>{"Request an Introductory Conversation"}</h3>
    <form name="introductory-conversation" method="POST" data-netlify="true" netlify-honeypot="company" onSubmit={submit} aria-describedby="form-note">
      <input type="hidden" name="form-name" value="introductory-conversation"/>
      <div hidden><label>Leave this field empty<input name="company" tabIndex={-1} autoComplete="off"/></label></div>
      <div className="field"><label htmlFor="name">{"Your name"} <span aria-hidden="true">*</span></label><input id="name" name="name" autoComplete="name" required maxLength={160}/></div>
      <div className="field"><label htmlFor="email">{"Your email address"} <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254}/></div>
      <div className="field"><label htmlFor="message">{"What would you like to explore? (optional)"}</label><textarea id="message" name="message" rows={4} maxLength={5000}/></div>
      <button className="cta" type="submit" disabled={status === 'sending' || status === 'success'}>{status === 'sending' ? 'Sending…' : "Send My Inquiry"}<Arrow/></button>
      <p className="form-note" id="form-note">I’ll be in touch to arrange a time.</p>
      <div aria-live="polite" aria-atomic="true">{status === 'success' && <p className="form-feedback success" role="status">Thank you for reaching out. I'll be in touch to arrange a time.</p>}</div>
      {status === 'error' && <p className="form-feedback error" role="alert">{error}</p>}
    </form>
    <p className="email-alternative">You can also reach me at <a href="mailto:lyla@diplomatwithin.com">lyla@diplomatwithin.com</a><span className="accent-period">.</span></p>
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
      <a className="brand" href="#top" aria-label="The Diplomat Within, home"><img className="brand-emblem" src="/images/diplomat-within-logo.png" width="64" height="64" alt=""/><div className="brand-wordmark"><span>The Diplomat</span><span>Within</span></div></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {[['The Approach','approach'],['About Lyla','about'],['Work With Me','work-with-me'],['Questions','faq'],['Contact','contact']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav><a className="header-cta" href="#contact">Request an Introductory Conversation<Arrow/></a>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title">Be ambitious<br/>about your<br/><em>whole life<span className="accent-period">.</span></em></h1>
          <div className="hero-lead"><Entry section={0} label="Supporting headline"/></div>
          <div className="hero-body"><Entry section={0} label="Body"/></div>
          <IntroLink/><div className="micro"><Entry section={0} label="Supporting text"/></div>
        </div>
        <div className="hero-visual"><img src="/images/island-dawn.webp" srcSet="/images/island-dawn-mobile.webp 800w, /images/island-dawn.webp 1536w" sizes="100vw" width="1536" height="1024" alt="" fetchPriority="high"/><div className="hero-shade"/></div>
      </section>
      <section className="section who" aria-labelledby="who-title"><div className="two-column who-story"><div><h2 id="who-title">{heading(1)}</h2><figure className="garden-window"><img src="/images/coastal-perspective.webp" alt="Expansive teal ocean and sculptural volcanic coastline; AI-created editorial image." width="1024" height="1024" loading="lazy"/></figure></div><div className="prose"><Entry section={1} label="Body"/></div></div></section>
      <section className="section approach" id="approach" aria-labelledby="approach-title">
        <div className="section-marker"><span>The Approach</span><i/></div>
        <div className="two-column"><h2 id="approach-title">{heading(2)}</h2><div className="prose"><Entry section={2} label="Body"/></div></div>
        <ol className="capabilities">{[1,2,3,4,5].map((n) => <li key={n}><span className="capability-number" aria-hidden="true">0{n}</span><div><h3>{heading(2,`Item ${n} heading`)}</h3><Lines lines={sections[2].filter(e=>e.label==='Body')[n].text}/></div><div className="outcome"><Entry section={2} label="Outcome" occurrence={n-1}/></div></li>)}</ol>
        <div className="prose approach-closing"><Entry section={2} label="Closing"/></div>
      </section>
      <section className="section about" id="about" aria-labelledby="about-title"><div className="section-marker"><span>About Lyla</span><i/></div><div className="about-heading"><h2 id="about-title">{heading(6)}</h2><p className="serif-subtitle">{heading(6,'Subheading')}</p></div><div className="about-layout"><div className="about-aside"><figure className="portrait-photo"><img src="/images/lyla-portrait-oct20.webp" alt="Lyla Bashan" width="900" height="1200" loading="lazy"/></figure></div><div className="prose biography"><Entry section={6} label="Body"/></div></div></section>
      <section className="section difference" aria-labelledby="difference-title"><div className="two-column"><div><h2 id="difference-title">{heading(3)}</h2><blockquote><Entry section={3} label="Pull quote"/></blockquote></div><div className="prose"><Entry section={3} label="Body"/></div></div></section>
      <section className="section work" id="work-with-me" aria-labelledby="work-title"><div className="section-marker"><span>Work With Me</span><i/></div><div className="two-column section-intro"><h2 id="work-title">{heading(4)}</h2><div className="prose"><Entry section={4} label="Introduction"/></div></div>
        <div className="steps">{[1,2,3].map((n)=><article className={`step ${n===2?'strategy':''}`} key={n}><div><h3>{heading(4,`Service ${n} heading`)}</h3>{n<3 && <div className="step-meta"><Entry section={4} label="Details" occurrence={n-1}/></div>}<div className="prose"><Entry section={4} label="Body" occurrence={n-1}/></div>{n===1 && <IntroLink/>}{n===2 && <><div className="includes-label"><Entry section={4} label="Includes heading"/></div><ul className="includes">{[1,2,3].map(i=><li key={i}><div><strong><Periods text={sections[4].find(e=>e.label===`Included item ${i}`)?.text[0] || ''}/></strong><Lines lines={sections[4].find(e=>e.label===`Included item ${i}`)?.text.slice(1)||[]}/></div></li>)}</ul><div className="prose session-closing"><Entry section={4} label="Closing"/></div></>}</div></article>)}</div>
      </section>
      <section className="section faq" id="faq" aria-labelledby="faq-title"><div className="two-column"><h2 id="faq-title">{heading(7)}</h2><div className="questions">{sections[7].filter(e=>e.label==='Question').map((q,i)=><details key={i}><summary><h3><Periods text={q.text[0]}/></h3><span aria-hidden="true" className="disclosure-icon">+</span></summary><Entry section={7} label="Answer" occurrence={i}/></details>)}</div></div></section>
      <section className="section results" aria-labelledby="results-title"><div className="two-column"><h2 id="results-title">{heading(5)}</h2><div className="prose"><Entry section={5} label="Body"/></div></div><div className="results-philosophy"><h3>{heading(5,'Supporting heading')}</h3><div className="prose"><Entry section={5} label="Body" occurrence={1}/></div></div><div className="quote-landscape global-quote"><img src="/images/global-perspective.webp" alt="" width="1536" height="1024" loading="lazy"/><blockquote><Entry section={5} label="Pull quote"/></blockquote></div></section>
      <section className="section contact" id="contact" aria-labelledby="contact-title"><div className="section-marker"><span>Contact</span><i/></div><div className="two-column"><div><h2 id="contact-title">{heading(8)}</h2><div className="prose"><Entry section={8} label="Body"/></div></div><ContactForm/></div></section>
    </main><footer className="footer"><div className="footer-top"><a href="#top" className="footer-brand">The Diplomat Within</a><p className="footer-tagline">Be ambitious about your whole life<span className="accent-period">.</span></p></div><p className="footer-location">Life Advisory with Lyla Bashan · Hawaiʻi Island</p><div className="footer-bottom"><p>© {new Date().getFullYear()} The Diplomat Within</p><p>Life advisory is not psychotherapy, medical care, or mental health treatment<span className="accent-period">.</span></p><a href="#top">Back to top ↑</a></div></footer>
  </>
}
