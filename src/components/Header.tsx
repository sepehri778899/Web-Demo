import { useEffect, useState } from 'react';
import { siteConfig } from '../config/site';

export function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return window.localStorage.getItem('rbd-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'light' ? '#f4f5f6' : '#0d0d0d';

    try {
      window.localStorage.setItem('rbd-theme', theme);
    } catch {
      // Keep the selected appearance for this session if storage is unavailable.
    }
  }, [theme]);

  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <a aria-label={`${siteConfig.brandName}، رفتن به ابتدای صفحه`} className="wordmark" href="#top">
          <img alt="" className="wordmark__logo" src={siteConfig.logoPath} />
          <span className="wordmark__text">{siteConfig.brandName}</span>
        </a>
        <button
          aria-checked={theme === 'light'}
          aria-label="تغییر تم رنگی سایت"
          className="theme-toggle"
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          role="switch"
          title="تغییر تم رنگی سایت"
          type="button"
        >
          <span aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--moon">☾</span>
          <span aria-hidden="true" className="theme-toggle__track">
            <span className="theme-toggle__thumb" />
          </span>
          <span aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--sun">☀</span>
        </button>
      </div>
    </header>
  );
}
