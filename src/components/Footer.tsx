import { siteConfig } from '../config/site';

export function Footer() {
  return (
    <footer className="site-footer page-shell">
      <a aria-label={`${siteConfig.brandName}، رفتن به ابتدای صفحه`} className="wordmark wordmark--footer" href="#top">
        <img alt="" className="wordmark__logo" src={siteConfig.logoPath} />
        <span className="wordmark__text">{siteConfig.brandName}</span>
      </a>
      <p className="site-footer__note">با دقت طراحی شده، برای تجربه‌ی بهتر.</p>
      <p className="site-footer__copyright">
        <bdi dir="rtl">© {new Date().getFullYear()} {siteConfig.brandName}</bdi>
      </p>
    </footer>
  );
}
