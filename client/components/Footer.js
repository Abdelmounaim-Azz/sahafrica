import Link from "next/link";
import { useRouter } from "next/router";
const Footer = () => {
  let router = useRouter();
  return (
    <footer id="main-footer">
      <div className="m-ftr">
        <div className="footer-content f-s-1 f-w-450">
          © 2021 Sahafrica Inc.
          <ul className="d-flex ">
            {router.locales.map(
              (locale) =>
                locale === "en" && (
                  <li key={locale} className="mr-3">
                    <Link href={router.asPath} locale={locale}>
                      <a className="lang f-w-450">English</a>
                    </Link>
                  </li>
                )
            )}
            {router.locales.map(
              (locale) =>
                locale === "fr" && (
                  <li key={locale} className="mr-3">
                    <Link href={router.asPath} locale={locale}>
                      <a className="lang f-w-450">Français</a>
                    </Link>
                  </li>
                )
            )}
            {router.locales.map(
              (locale) =>
                locale === "ar" && (
                  <li key={locale} className="mr-3">
                    <Link href={router.asPath} locale={locale}>
                      <a className="lang f-w-450">العربية</a>
                    </Link>
                  </li>
                )
            )}
          </ul>
          <div className="social-icon">
            <Link href="https://twitter.com/AbdelmounaimAzz">
              <a>
                <i className="fab fa-twitter mr-2 lang"></i>
              </a>
            </Link>
            <Link href="https://github.com/Abdelmounaim-Azz">
              <a>
                <i className="fab fa-github lang"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
