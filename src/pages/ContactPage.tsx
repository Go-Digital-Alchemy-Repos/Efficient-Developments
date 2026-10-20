import { Container } from '../components/layout/Container'
import { Seo } from '../components/seo/Seo'
import { Heading } from '../components/ui/Typography'

const contactDetails = [
  {
    icon: '/assets/icons/contact/phone.svg',
    label: 'Call Efficient Developments',
    content: '704-317-5966',
    href: 'tel:+17043175966',
  },
]

export function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <Seo path="/contact" title="Contact" description="Call Efficient Developments to discuss an upcoming heavy civil construction project in the Carolinas." />
      <section className="contact-page__section" aria-labelledby="contact-page-title" data-reveal-sequence>
        <Container className="contact-page__layout" size="wide">
          <div className="contact-page__intro">
            <Heading as="h1" className="contact-page__title" data-reveal-item id="contact-page-title" size="page">
              Contact Efficient<br />Developments
            </Heading>
            <p className="contact-page__lead" data-reveal-delay="1" data-reveal-item>To discuss an upcoming project, get in touch with our team.</p>

            <address className="contact-page__details">
              {contactDetails.map((detail, index) => (
                <a className="contact-page__detail" data-reveal-delay={String(index + 2)} data-reveal-item href={detail.href} key={detail.href}>
                  <img alt="" aria-hidden="true" src={detail.icon} />
                  <span className="sr-only">{detail.label}: </span>
                  <span>{detail.content}</span>
                </a>
              ))}
              <div className="contact-page__detail contact-page__detail--hours" data-reveal-delay="3" data-reveal-item>
                <img alt="" aria-hidden="true" src="/assets/icons/contact/clock.svg" />
                <span>
                  <strong>Business Hours</strong><br />
                  Monday – Friday: 8:00 pm – 5:00 pm
                </span>
              </div>
            </address>

            <p className="contact-page__service-note" data-reveal-delay="5" data-reveal-item>Serving municipalities and developers across the Carolinas.</p>
          </div>

          <div className="contact-form-card contact-call-card">
            <h2 className="contact-form-card__title" data-reveal-delay="6" data-reveal-item>Start a conversation</h2>
            <p data-reveal-delay="7" data-reveal-item>Call our team during business hours to discuss your project, schedule, and next steps.</p>
            <a className="button contact-form__submit" data-reveal-delay="8" data-reveal-item href="tel:+17043175966">
              Call 704-317-5966
              <img alt="" aria-hidden="true" src="/assets/icons/cta-arrow.svg" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
