import type { FormEvent } from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/ui/FormField'
import { Heading } from '../components/ui/Typography'

const contactDetails = [
  {
    icon: '/assets/icons/contact/phone.svg',
    label: 'Call Efficient Developments',
    content: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: '/assets/icons/contact/mail.svg',
    label: 'Email Efficient Developments',
    content: 'info@efficientdevelopments.com',
    href: 'mailto:info@efficientdevelopments.com',
  },
]

export function ContactPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="contact-page" id="main-content">
      <section className="contact-page__section" aria-labelledby="contact-page-title">
        <Container className="contact-page__layout" size="wide">
          <div className="contact-page__intro">
            <Heading as="h1" className="contact-page__title" id="contact-page-title" size="page">
              Contact Efficient<br />Developments
            </Heading>
            <p className="contact-page__lead">To discuss an upcoming project, get in touch with our team.</p>

            <address className="contact-page__details">
              {contactDetails.map((detail) => (
                <a className="contact-page__detail" href={detail.href} key={detail.href}>
                  <img alt="" aria-hidden="true" src={detail.icon} />
                  <span className="sr-only">{detail.label}: </span>
                  <span>{detail.content}</span>
                </a>
              ))}
              <div className="contact-page__detail contact-page__detail--address">
                <img alt="" aria-hidden="true" src="/assets/icons/contact/map-pin.svg" />
                <span>
                  123 Main Street, Suite 400<br />
                  Charlotte, NC 28202
                </span>
              </div>
            </address>

            <p className="contact-page__service-note">Serving municipalities and developers across the Carolinas.</p>
          </div>

          <div className="contact-form-card">
            <h2 className="contact-form-card__title">Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__fields">
                <div className="contact-form__row">
                  <FormField autoComplete="name" label="Name" name="name" placeholder="Your full name" />
                  <FormField
                    autoComplete="organization"
                    label="Company / Municipality"
                    name="organization"
                    placeholder="Organization name"
                  />
                </div>
                <div className="contact-form__row">
                  <FormField
                    autoComplete="email"
                    label="Email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <FormField autoComplete="tel" label="Phone" name="phone" placeholder="(555) 123-4567" type="tel" />
                </div>
                <FormField
                  label="Tell us about the project"
                  multiline
                  name="projectDetails"
                  placeholder="Share your vision, timeline, and budget..."
                />
              </div>
              <Button className="contact-form__submit" type="submit">
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
