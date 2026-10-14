import { useRef, useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { GALLERY } from "../data/gallery.js";

export default function Gallery({ asPage = false }) {
  const { lang, t } = useLang();
  const dialog = useRef(null);
  const [open, setOpen] = useState(null);

  const show = (photo) => { setOpen(photo); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const caption = (p) => p?.[lang] || p?.en || "";

  return (
    <section className="block" id="work">
      <div className="block-title">{asPage ? <h1>{t.workTitle}</h1> : <h2>{t.workTitle}</h2>}<span className="rule" /></div>
      <p className="block-lede">{t.workLede}</p>
      <div className="gallery">
        {GALLERY.map((p) => (
          <figure className="shot" key={p.file}>
            <button type="button" aria-label={caption(p)} onClick={() => show(p)}>
              <img src={p.file} alt={caption(p)} loading="lazy" />
            </button>
            <figcaption>{caption(p)}</figcaption>
          </figure>
        ))}
      </div>

      <dialog className="lightbox" ref={dialog} onClick={(e) => e.target === dialog.current && close()}>
        <button type="button" className="close" aria-label={t.close} onClick={close}>×</button>
        {open && <img src={open.file} alt={caption(open)} />}
        <p>{caption(open)}</p>
      </dialog>
    </section>
  );
}
