import HomeQuery from "../graphql/Homepage.query";
import styles from "../styles/pages/Home.module.scss";
import { performQuery } from "../graphql/apollo-client.js";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import classNames from "classnames";
import workmark from "../images/okdeploy-logo-june-2023-black.png";

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

const Home = ({ SingletonHoldingPage, SingletonContact }) => {
  const {
    contactAddress,
    contactEmail,
    contactPhone,
    instagramProfile,
    linkedIn,
  } = SingletonContact;
  const { body } = SingletonHoldingPage;

  return (
    <div className={`${styles.container}`}>
      <img className={styles.wordmark} src={workmark.src} alt="OK Deploy" />
      <section>
        <p className={styles.body}>{body}</p>
      </section>

      <section>
        <address className={styles.address}>{contactAddress}</address>
      </section>

      <section>
        <CopySpan value={contactEmail} />
        <br />
        <CopySpan value={contactPhone} />
        <br />
      </section>

      <section>
        <a
          className={styles.contact}
          target="_blank"
          rel="noreferrer"
          href={`https://instagram.com/${instagramProfile}`}
        >
          Instagram
        </a>
        <br />
        <a
          className={styles.contact}
          target="_blank"
          rel="noreferrer"
          href={`https://www.linkedin.com/in/${linkedIn}`}
        >
          LinkedIn
        </a>
      </section>
    </div>
  );
};

export async function getStaticProps({ previewData = {} }) {
  const gqlResult = await performQuery(HomeQuery, {}, previewData);
  console.log(gqlResult.data);

  return {
    props: {
      ...gqlResult.data,
    }, // will be passed to the page component as props
  };
}

export default Home;
