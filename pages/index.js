import HomeQuery from "../graphql/Homepage.query";
import styles from "../styles/pages/Home.module.scss";
import { performQuery } from "../graphql/apollo-client.js";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import classNames from "classnames";
import workmark from "../images/okdeploy-logo.svg";
import Head from "next/head";
import Script from "next/script";
// import ScrollingImages from "../components/ScrollingImages/ScrollingImages";

import dynamic from "next/dynamic";

const ScrollingImages = dynamic(
  () => import("../components/ScrollingImages/ScrollingImages"),
  {
    loading: () => <div></div>,
    ssr: false,
  }
);

const CopySpan = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const doCopy = () => {
    copy(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 999);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <button
      className={classNames(styles.contact, styles["contact--copy"], {
        [styles["contact--copied"]]: isCopied,
      })}
      onClick={doCopy}
      aria-label={`Copy ${value}`}
    >
      <span className={styles.label}>{value}</span>
      <span className={styles.copied} aria-hidden="true">
        Copied
      </span>
    </button>
  );
};

const Home = ({ SingletonHoldingPage }) => {
  const {
    body,
    images,
    heading,
    theme,
    contactAddress,
    contactEmail,
    contactPhone,
    instagramProfile,
    linkedIn,
    description,
    sharingImage,
  } = SingletonHoldingPage;
  const sharingImageUrl = `${sharingImage?.asset?.url}?fit=fill&w=1600&h=836`;

  const title = heading || "ok deploy";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <link
          rel="preload"
          href="/fonts/RadioGrotesk-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="https://ok-deploy.live" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={sharingImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@OkDeploy" />
        <meta name="twitter:image" content={sharingImageUrl} />
      </Head>
      <div className={`${styles.container} ${styles[`container--${theme}`]}`}>
        {heading ? (
          <h1 className={styles.heading}>{heading}</h1>
        ) : (
          <img className={styles.wordmark} src={workmark.src} alt={title} />
        )}
        <section>
          <p className={styles.body}>{body}</p>
        </section>

        {!!contactAddress ? (
          <section>
            <address className={styles.address}>{contactAddress}</address>
          </section>
        ) : null}

        {contactEmail || contactPhone ? (
          <section>
            {contactEmail ? (
              <>
                <CopySpan value={contactEmail} />
                <br />
              </>
            ) : null}
            {contactPhone ? (
              <>
                <CopySpan value={contactPhone} />
                <br />
              </>
            ) : null}
          </section>
        ) : null}

        {instagramProfile || linkedIn ? (
          <section>
            {instagramProfile ? (
              <>
                <a
                  className={styles.contact}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://instagram.com/${instagramProfile}`}
                >
                  Instagram
                </a>
                <br />
              </>
            ) : null}
            {linkedIn ? (
              <a
                className={styles.contact}
                target="_blank"
                rel="noreferrer"
                href={linkedIn}
              >
                LinkedIn
              </a>
            ) : null}
          </section>
        ) : null}
      </div>
      <ScrollingImages images={images} />
      <Script async defer src="https://scripts.withcabin.com/hello.js" />
    </>
  );
};

export async function getStaticProps({ previewData = {} }) {
  const gqlResult = await performQuery(
    HomeQuery,
    { id: process.env.NEXT_PUBLIC_HOLDING_PAGE_ID },
    previewData
  );

  return {
    props: {
      ...gqlResult.data,
    }, // will be passed to the page component as props
  };
}

export default Home;
