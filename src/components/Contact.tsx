import { siteConfig } from '../config/site';
import { Arrow } from './Arrow';
import { Reveal } from './Reveal';

export function Contact() {
  const instagramUrl = siteConfig.instagram
    ? `https://instagram.com/${siteConfig.instagram}`
    : '';

  return (
    <section aria-labelledby="contact-title" className="contact page-shell" id="contact">
      <Reveal className="contact__inner">
        <div className="contact__intro">
          <p className="eyebrow"><span className="status-dot" /> گفت‌وگوی تازه</p>
          <h2 id="contact-title">پروژه‌ای در ذهن دارید؟</h2>
          <p className="contact__description">از ایده‌ی اولیه‌تان بگویید؛ از همان‌جا شروع می‌کنیم.</p>
          <a className="contact__cta" href={`tel:${siteConfig.phone}`}>
            <span>تماس برای شروع پروژه</span>
            <Arrow diagonal />
          </a>
        </div>

        <div className="contact__details">
          {siteConfig.phone ? (
            <a className="contact__detail" href={`tel:${siteConfig.phone}`}>
              <span className="contact__label">تلفن</span>
              <bdi className="contact__value latin" dir="ltr">{siteConfig.phoneDisplay}</bdi>
              <Arrow diagonal />
            </a>
          ) : null}
          {siteConfig.email ? (
            <a className="contact__detail" href={`mailto:${siteConfig.email}`}>
              <span className="contact__label">ایمیل</span>
              <bdi className="contact__value latin" dir="ltr">{siteConfig.email}</bdi>
              <Arrow diagonal />
            </a>
          ) : null}
          {instagramUrl ? (
            <a className="contact__detail" href={instagramUrl} rel="noopener noreferrer" target="_blank">
              <span className="contact__label">اینستاگرام</span>
              <bdi className="contact__value latin" dir="ltr">@{siteConfig.instagram}</bdi>
              <Arrow diagonal />
            </a>
          ) : null}
          {siteConfig.location ? (
            <div className="contact__detail contact__detail--static">
              <span className="contact__label">مکان</span>
              <span className="contact__value">{siteConfig.location}</span>
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
