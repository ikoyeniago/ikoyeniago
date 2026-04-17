import React from 'react';
import Link from '@docusaurus/Link';
import styles from './FieldsSection.module.css';

interface FieldItem {
  title: string;
  description: string;
  image: string;
  linkTo: string;
}

interface FieldsSectionProps {
  fields: FieldItem[];
}

export default function FieldsSection({ fields }: FieldsSectionProps): JSX.Element {
  return (
    <section id="fields" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>关注的领域</h2>
        <div className={styles.grid}>
          {fields.map((field, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={field.image} 
                  alt={field.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{field.title}</h3>
                <p className={styles.description}>{field.description}</p>
                <Link
                  className={styles.button}
                  to={field.linkTo}
                >
                  探索一下
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
