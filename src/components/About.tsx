import { siteConfig } from '../config/site';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section aria-labelledby="about-title" className="about page-shell" id="about">
      <Reveal className="about__inner">
        <div className="about__heading">
          <p className="eyebrow">{siteConfig.brandName}</p>
          <h2 id="about-title">درباره‌ی ما</h2>
        </div>
        <div className="about__body">
          <p>{siteConfig.about}</p>
          <ul aria-label="حوزه‌های کاری" className="capability-list">
            {siteConfig.capabilities.map((capability, index) => (
              <li key={capability}>
                <bdi className="latin" dir="ltr">0{index + 1}</bdi>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
