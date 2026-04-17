import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ColumnsSection.module.css';

interface ColumnItem {
  title: string;
  description: string;
  image: string;
  buttons: {
    label: string;
    to?: string;
    onClick?: () => void;
  }[];
}

interface ColumnsSectionProps {
  columns: ColumnItem[];
}

export default function ColumnsSection({ columns }: ColumnsSectionProps): JSX.Element {
  return (
    <section id="columns" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>叨叨的专栏</h2>
        <div className={styles.grid}>
          {columns.map((column, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={column.image} 
                  alt={column.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{column.title}</h3>
                <p className={styles.description}>{column.description}</p>
                <div className={styles.buttons}>
                  {column.buttons.map((button, btnIndex) => (
                    button.to ? (
                      <Link
                        key={btnIndex}
                        className={`${styles.button} ${btnIndex === 0 ? styles.buttonPrimary : styles.buttonSecondary}`}
                        to={button.to}
                      >
                        {button.label}
                      </Link>
                    ) : (
                      <button
                        key={btnIndex}
                        className={`${styles.button} ${btnIndex === 0 ? styles.buttonPrimary : styles.buttonSecondary}`}
                        onClick={button.onClick}
                      >
                        {button.label}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
