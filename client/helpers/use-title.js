import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
export function Title({ title }) {
  let { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t("common:meta")} />

        <link
          rel="icon"
          type="image/webp"
          sizes="32x32"
          href="/favicon-96x96.webp"
        />
      </Head>
    </div>
  );
}
