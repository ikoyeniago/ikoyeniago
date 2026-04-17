import React from 'react';
import Link from '@docusaurus/Link';
import styles from './AboutSection.module.css';

interface AboutItem {
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
  onButtonClick?: () => void;
  linkTo?: string;
}

interface AboutSectionProps {
  items: AboutItem[];
}

export default function AboutSection({ items }: AboutSectionProps): JSX.Element {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>AI-in-the-Loop</h2>
        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                {item.linkTo ? (
                  <Link
                    className={styles.button}
                    to={item.linkTo}
                  >
                    {item.buttonLabel}
                  </Link>
                ) : (
                  <button
                    className={styles.button}
                    onClick={item.onButtonClick}
                  >
                    {item.buttonLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
