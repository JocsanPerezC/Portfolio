import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/contact.css";

export default function Contact() {
  const form = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      sending: true,
      success: false,
      error: "",
    });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus({
        sending: false,
        success: true,
        error: "",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          success: false,
        }));
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus({
        sending: false,
        success: false,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="section__inner contact__inner">
        <div className="contact__header">
          <h2 className="section__title">Contact</h2>
          <p className="contact__heading">
            Get in touch before I write another line of code!
          </p>
        </div>

        <form ref={form} className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="contact__submit"
            disabled={status.sending}
          >
            {status.sending ? "Sending..." : "Submit"}
          </button>

          {status.success && (
            <p className="contact__success">Message sent successfully</p>
          )}

          {status.error && (
            <p className="contact__error">{status.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}