import type { SeoFaq } from "@/config/seo-pages";

export function FaqSection({
  eyebrow,
  title,
  faqs,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  faqs: readonly SeoFaq[];
  tone?: "light" | "dark";
}) {
  if (!faqs.length) return null;
  return (
    <section
      className={`v2-faq-section ${tone === "dark" ? "is-dark" : ""}`}
      aria-labelledby="faq-section-title"
    >
      <div className="v2-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="faq-section-title">{title}</h2>
        <div className="v2-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="v2-faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
