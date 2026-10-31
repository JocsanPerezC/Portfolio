// Building blocks of the field guide: spreads, pages, folios, specimen chips and buttons.

export function Spread({ id, children, className = "", labelledBy }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-spread
      className={[
        "spread mx-auto grid w-full max-w-[1280px] grid-cols-1 lg:grid-cols-[1fr_14px_1fr]",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export function Spine() {
  return <div aria-hidden="true" className="h-3 bg-spine lg:h-auto" />;
}

export function Page({ children, className = "", turn = false }) {
  return (
    <div
      data-page={turn ? "turn" : "still"}
      className={[
        "relative flex flex-col bg-page px-6 py-8 text-ink sm:px-10 sm:py-10 xl:px-14 xl:py-12",
        turn ? "page-turn" : "",
        className,
      ].join(" ")}
    >
      {children}
      {turn && (
        <div aria-hidden="true" data-shade className="pointer-events-none absolute inset-0 bg-spine opacity-0" />
      )}
    </div>
  );
}

export function Folio({ language, plate, aside }) {
  const es = language === "es";
  return (
    <div className="mb-8 flex items-center justify-between gap-4 border-b border-ink/25 pb-3 text-sm text-ink-2">
      {plate ? (
        <span className="ml-auto font-display font-bold text-ink">{es ? `Lámina ${plate}` : `Plate ${plate}`}</span>
      ) : (
        <span>{es ? "Jocsan Perez Coto · Guía de campo" : "Jocsan Perez Coto · Field guide"}</span>
      )}
      {aside}
    </div>
  );
}

export function Chip({ children, className = "" }) {
  return (
    <span
      data-chip
      className={[
        "tabular inline-flex h-10 min-w-10 items-center justify-center bg-ink px-2 font-display text-lg font-bold text-page",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function Classification({ rows }) {
  return (
    <dl className="grid grid-cols-[minmax(7.5rem,auto)_1fr] border-t-2 border-ink">
      {rows.map(({ term, value }) => (
        <div key={term} className="contents">
          <dt className="border-b border-ink/20 py-3 pr-4 text-sm font-bold uppercase tracking-[0.08em] text-ink-2">
            {term}
          </dt>
          <dd className="m-0 border-b border-ink/20 py-3 text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Figure({ src, alt, number, caption, className = "", imgClassName = "" }) {
  return (
    <figure className={["m-0 flex flex-col", className].join(" ")}>
      <div className="relative flex-1 overflow-hidden border-2 border-ink bg-page-2 lg:min-h-[420px]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          data-specimen-image
          className={["h-full w-full object-cover object-top", imgClassName].join(" ")}
        />
        {number != null && <Chip className="absolute left-0 top-0">{number}</Chip>}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-2">{caption}</figcaption>}
    </figure>
  );
}
