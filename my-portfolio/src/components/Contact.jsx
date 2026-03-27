import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CV_PATH } from "../data/data";

export default function Contact({ theme, language }) {
  const isDark = theme === "dark";
  const form = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, success: false, error: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: "" });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setStatus({ sending: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus((p) => ({ ...p, success: false })), 3000);
    } catch (err) {
      console.error(err);
      setStatus({
        sending: false,
        success: false,
        error:
          language === "es"
            ? "Algo salió mal. Intenta de nuevo."
            : "Something went wrong. Please try again.",
      });
    }
  };

  const inputClass = [
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 resize-vertical",
    isDark
      ? "bg-[#111118] border-[#2a2a38] text-[#c8c8e0] placeholder:text-[#52526a] focus:border-[#7c6dfa] focus:shadow-[0_0_0_3px_rgba(124,109,250,0.08)]"
      : "bg-white border-black/10 text-[#111827] placeholder:text-[#64748b] focus:border-[#7c6dfa] focus:shadow-[0_0_0_3px_rgba(124,109,250,0.08)]",
  ].join(" ");

  return (
    <section
      id="contact"
      className="relative z-10 px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-14">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-[#7c6dfa]">
            {language === "es" ? "Contacto" : "Contact"}
          </p>

          <h2
            className={[
              "mb-4 text-4xl font-bold md:text-5xl",
              isDark ? "text-white" : "text-[#111827]",
            ].join(" ")}
          >
            {language === "es" ? "¿Hablamos?" : "Let’s talk"}
          </h2>

          <p
            className={[
              "leading-relaxed",
              isDark ? "text-[#c8c8e0]" : "text-[#475569]",
            ].join(" ")}
          >
            {language === "es"
              ? "Estoy abierto a oportunidades, colaboraciones y proyectos interesantes."
              : "I’m open to opportunities, collaborations, and interesting projects."}
            <br />
            {language === "es"
              ? "Si tienes algo en mente, me encantaría escucharte."
              : "If you have something in mind, I’d love to hear about it."}
          </p>
        </div>

        <div
          className={[
            "flex flex-col items-center gap-8 rounded-3xl border p-8 md:p-12",
            isDark
              ? "border-[#2a2a38] bg-[#16161f]/40 shadow-[0_0_60px_rgba(124,109,250,0.12)]"
              : "border-black/10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]",
          ].join(" ")}
        >
          <a
            href="mailto:jocsancoto@gmail.com"
            className={[
              "inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-sm transition-all duration-300",
              isDark
                ? "border-[#7c6dfa]/30 text-[#7c6dfa] hover:bg-[#7c6dfa] hover:text-[#0a0a0f]"
                : "border-[#7c6dfa]/30 text-[#7c6dfa] hover:bg-[#7c6dfa] hover:text-white",
            ].join(" ")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            jocsancoto@gmail.com
          </a>

          <div
            className={[
              "flex w-full flex-col items-center gap-6 border-t pt-8",
              isDark ? "border-[#2a2a38]" : "border-black/10",
            ].join(" ")}
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="flex w-full max-w-lg flex-col gap-4 text-left"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className={isDark ? "text-[0.72rem] uppercase tracking-[0.1em] text-[#52526a] font-medium" : "text-[0.72rem] uppercase tracking-[0.1em] text-[#64748b] font-medium"}>
                    {language === "es" ? "Nombre" : "Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={language === "es" ? "Tu nombre" : "Your name"}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={isDark ? "text-[0.72rem] uppercase tracking-[0.1em] text-[#52526a] font-medium" : "text-[0.72rem] uppercase tracking-[0.1em] text-[#64748b] font-medium"}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={isDark ? "text-[0.72rem] uppercase tracking-[0.1em] text-[#52526a] font-medium" : "text-[0.72rem] uppercase tracking-[0.1em] text-[#64748b] font-medium"}>
                  {language === "es" ? "Mensaje" : "Message"}
                </label>
                <textarea
                  name="message"
                  placeholder={language === "es" ? "Mensaje" : "Message"}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={status.sending}
                className={[
                  "w-full rounded-xl py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60",
                  isDark
                    ? "bg-[#7c6dfa] text-[#0a0a0f] hover:bg-[#a599fd] hover:shadow-[0_8px_24px_rgba(124,109,250,0.25)]"
                    : "bg-[#111827] text-white hover:bg-[#1f2937]",
                ].join(" ")}
              >
                {status.sending
                  ? language === "es"
                    ? "Enviando..."
                    : "Sending..."
                  : language === "es"
                  ? "Enviar mensaje"
                  : "Send message"}
              </button>

              {status.success && (
                <p className="text-center text-sm text-green-500">
                  {language === "es"
                    ? "✓ Mensaje enviado correctamente"
                    : "✓ Message sent successfully"}
                </p>
              )}

              {status.error && (
                <p className="text-center text-sm text-red-500">{status.error}</p>
              )}
            </form>

            <a
              href={CV_PATH}
              download
              className={[
                "inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300",
                isDark
                  ? "bg-[#f0f0ff] text-[#0a0a0f] hover:bg-[#a599fd]"
                  : "bg-[#111827] text-white hover:bg-[#1f2937]",
              ].join(" ")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {language === "es" ? "Descargar CV" : "Download CV"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}