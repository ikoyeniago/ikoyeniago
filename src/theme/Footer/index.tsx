import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import { FooterSocial } from '@site/src/components/Homepage';
import styles from './styles.module.css';

// 社交链接配置
const socialLinks = [
  {
    type: 'wechat' as const,
    qrCodePath: '/doc_img/9612e34803b7c83731c7755ad51cfb6b.jpg',
  },
  {
    type: 'github' as const,
    url: 'https://github.com/ikoyeniago',
  },
  {
    type: 'bilibili' as const,
    url: 'https://space.bilibili.com/12325946?spm_id_from=333.33.0.0',
  },
];

function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return (
    <footer
      className={`${styles.footer} ${style === 'dark' ? styles.footerDark : ''}`}>
      <div className={styles.container}>
        {logo && <FooterLogo logo={logo} />}
        <FooterLinks links={links} />
        <div className={styles.bottomRow}>
          {copyright && <FooterCopyright copyright={copyright} />}
          <FooterSocial text="来聊" links={socialLinks} />
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
