import type { FormEvent } from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/ui/FormField'
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="contact-page" id="main-content">
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
              <div className="contact-page__detail contact-page__detail--address" data-reveal-delay="4" data-reveal-item>
                <img alt="" aria-hidden="true" src="/assets/icons/contact/map-pin.svg" />
                <span>
                  123 Main Street, Suite 400<br />
                  Charlotte, NC 28202
                </span>
              </div>
            </address>

            <p className="contact-page__service-note" data-reveal-delay="5" data-reveal-item>Serving municipalities and developers across the Carolinas.</p>
          </div>

          <div className="contact-form-card">
            <h2 className="contact-form-card__title" data-reveal-delay="6" data-reveal-item>Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__fields">
                <div className="contact-form__row" data-reveal-delay="7" data-reveal-item>
                  <FormField autoComplete="name" label="Name" name="name" placeholder="Your full name" />
                  <FormField
                    autoComplete="organization"
                    label="Company / Municipality"
                    name="organization"
                    placeholder="Organization name"
                  />
                </div>
                <div className="contact-form__row" data-reveal-delay="8" data-reveal-item>
                  <FormField
                    autoComplete="email"
                    label="Email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <FormField autoComplete="tel" label="Phone" name="phone" placeholder="(555) 123-4567" type="tel" />
                </div>
                <div data-reveal-delay="9" data-reveal-item>
                  <FormField
                    label="Tell us about the project"
                    multiline
                    name="projectDetails"
                    placeholder="Share your vision, timeline, and budget..."
                  />
                </div>
              </div>
              <Button className="contact-form__submit" data-reveal-delay="10" data-reveal-item type="submit">
                Send Message
                <img alt="" aria-hidden="true" src="/assets/icons/cta-arrow.svg" />
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </main>
  )
}
