import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Check, Download, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CV_PATH, PROFILE_CONTENT, SOCIALS } from "../data/data";
import { Folio, Page, Spine, Spread } from "./Book";
import { buttonStyles } from "../lib/styles";

const SOCIAL_ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedin, Instagram: FaInstagram };

const fieldClass =
  "w-full border-0 border-b-2 border-ink/50 bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors focus:border-ink focus-visible:outline-none";

export default function Contact({ language }) {
  const es = language === "es";
  const form = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (event) =>
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const labels = {
    name: es ? "Tu nombre" : "Your name",
    email: es ? "Tu correo" : "Your email",
    message: es ? "Mensaje" : "Message",
  };

  return (
    <Spread id="contact" labelledBy="contact-title">
      <Page>
        <Folio language={language} />

        <h2 id="contact-title" className="m-0 text-[clamp(2.5rem,4.4vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          {es ? "Hablemos" : "Let's talk"}
        </h2>
        <p className="mt-5 max-w-[44ch] text-lg text-ink">
          {es
            ? "Busco oportunidades como desarrollador. Si mi trabajo encaja con tu equipo, escríbeme y respondo pronto."
            : "I'm looking for developer opportunities. If my work fits your team, write to me and I'll reply soon."}
        </p>

        <a
          href={`mailto:${PROFILE_CONTENT.email}`}
          className="mt-8 inline-flex items-center gap-3 self-start font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold text-ink underline decoration-2 hover:text-accent"
        >
          <Mail size={24} aria-hidden="true" />
          {PROFILE_CONTENT.email}
        </a>

        <ul className="m-0 mt-8 list-none border-t-2 border-ink p-0">
          {SOCIALS.map(({ label, handle, href }) => {
            const Icon = SOCIAL_ICONS[label];
            return (
              <li key={label} className="border-b border-ink/20">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[1.75rem_1fr_auto] items-center gap-3 py-3 text-ink hover:text-accent"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                  <span>
                    <strong className="font-bold">{label}</strong>
                    <span className="text-ink-2"> · {handle}</span>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-10">
          <a href={CV_PATH} download className={buttonStyles.secondary}>
            <Download size={18} aria-hidden="true" />
            {es ? "Descargar CV" : "Download CV"}
          </a>
        </div>
      </Page>

      <Spine />

      <Page turn>
        <Folio language={language} plate="VII" />

        <h3 className="m-0 text-3xl font-bold tracking-[-0.02em]">{es ? "Envíame un mensaje" : "Send me a message"}</h3>

        <form ref={form} onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {["name", "email"].map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-ink-2">{labels[field]}</span>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  required
                  autoComplete={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </label>
            ))}
          </div>

          <label className="block flex-1">
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-ink-2">{labels.message}</span>
            <textarea
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`${fieldClass} min-h-40 resize-y`}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className={`${buttonStyles.primary} disabled:cursor-wait disabled:opacity-70`}>
              {status === "sending" ? (es ? "Enviando…" : "Sending…") : es ? "Enviar mensaje" : "Send message"}
            </button>

            <p aria-live="polite" className="m-0 text-ink">
              {status === "sent" && (
                <span className="inline-flex items-center gap-2 font-bold text-ok">
                  <Check size={18} aria-hidden="true" />
                  {es ? "Mensaje enviado. Gracias." : "Message sent. Thank you."}
                </span>
              )}
              {status === "error" && (
                <span className="font-bold text-error">
                  {es
                    ? `No se pudo enviar. Escríbeme directo a ${PROFILE_CONTENT.email}.`
                    : `It could not be sent. Write to ${PROFILE_CONTENT.email} directly.`}
                </span>
              )}
            </p>
          </div>
        </form>
      </Page>
    </Spread>
  );
}
