
import { useState } from "react";

function Contact() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formNotice, setFormNotice] = useState("");

  function sendMessage() {
    setFormError("");
    setFormNotice("");

    if (
      visitorName.trim().length < 2 ||
      messageSubject.trim().length < 3 ||
      visitorMessage.trim().length < 10
    ) {
      setFormError("Please complete all fields with a little more detail.");
      return;
    }

    setFormNotice(
      "Your message is ready! This is a demo contact form, so no message has been sent."
    );

    setVisitorName("");
    setVisitorEmail("");
    setMessageSubject("");
    setVisitorMessage("");
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-container">
          <h1>Let's Talk Food!</h1>

          <h2>We'd love to hear from you.</h2>

          <p>
            Have a question, a suggestion, or just want to say hello?
            We're always happy to hear from fellow food lovers!
          </p>

          <p>
            Whether you've discovered a new favourite recipe, have an
            idea to share, or need a little help with Good Food, feel
            free to reach out.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-container contact-layout">
          <div className="contact-intro">
            <span className="contact-decoration" aria-hidden="true">
              ✳
            </span>

            <h2>Drop Us a Message</h2>

            <p>
              Got something on your mind? Send us a message using the
              form below, and we'll do our best to get back to you.
            </p>
          </div>

          <div className="contact-form-card">
            <h3>Contact Form</h3>

            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <div className="contact-field">
                <label htmlFor="visitorName">Your Name</label>

                <input
                  id="visitorName"
                  type="text"
                  value={visitorName}
                  onChange={(event) => {
                    setVisitorName(event.target.value);
                  }}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  minLength={2}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="visitorEmail">Email Address</label>

                <input
                  id="visitorEmail"
                  type="email"
                  value={visitorEmail}
                  onChange={(event) => {
                    setVisitorEmail(event.target.value);
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="messageSubject">Subject</label>

                <input
                  id="messageSubject"
                  type="text"
                  value={messageSubject}
                  onChange={(event) => {
                    setMessageSubject(event.target.value);
                  }}
                  placeholder="What is your message about?"
                  required
                  minLength={3}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="visitorMessage">Your Message</label>

                <textarea
                  id="visitorMessage"
                  value={visitorMessage}
                  onChange={(event) => {
                    setVisitorMessage(event.target.value);
                  }}
                  placeholder="Write your message here..."
                  rows={5}
                  required
                  minLength={10}
                />
              </div>

              {formError && (
                <p className="contact-error" role="alert">
                  {formError}
                </p>
              )}

              {formNotice && (
                <p className="contact-notice" role="status">
                  {formNotice}
                </p>
              )}

              <button type="submit" className="contact-send-btn">
                Send Message
              </button>

              <p className="contact-demo-note">
                Demo form only — messages are not delivered yet.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-feedback">
        <div className="contact-container contact-feedback-inner">
          <h2>A Little Feedback Goes a Long Way</h2>

          <p>
            We're always looking for ways to make Good Food even better.
          </p>

          <p>
            Have an idea for a new feature? Found something that could
            be improved? Or simply want to tell us what you love about
            Good Food?
          </p>

          <p className="contact-feedback-ending">
            We're all ears!
          </p>
        </div>
      </section>

      <section className="contact-connected">
        <div className="contact-container">
          <h2>Stay Connected</h2>

          <p>
            Good food is better when shared. Keep exploring, trying
            new recipes, and sharing your creations with our community.
          </p>

          <p className="contact-signoff">
            Good Food — Find your next dish.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
