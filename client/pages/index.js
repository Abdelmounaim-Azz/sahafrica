import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useTranslation from "next-translate/useTranslation";
import buildClient from "../helpers/build-client";
import { Title } from "../helpers/use-title";
import { useLocalState } from "../helpers/use-localState";
import { useHasMounted } from "../helpers/use-hasMounted";
import { ShiftBy } from "../helpers/ShiftBy";
import Footer from "../components/Footer";

const HomePage = () => {
  let router = useRouter();
  const props = useSpring({
    from: { transform: `translateY(-50px)` },
    to: { transform: `translateY(0px)` },
    config: { mass: 1, friction: 30, tension: 200 },
  });
  const values = useSpring({
    from: { transform: `translateY(10px)`, visibility: `hidden` },
    to: { transform: `translateY(0px)`, visibility: `visible` },
    config: { mass: 1, friction: 30, tension: 200 },
  });

  let { t, lang } = useTranslation();
  const [theme, setTheme] = useLocalState("theme", "light");
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>

      <Title title={t("home:title")} />
      <nav className="navbar-home ">
        <ul className="navbar-nav-home mx-4">
          <li className="nav-item-home ">
            <Link href={router.asPath}>
              <a>
                <Image
                  width={45}
                  height={45}
                  quality={100}
                  src="/logo_africa.webp"
                  alt={t("home:logo")}
                  className="img-selector"
                />
              </a>
            </Link>
          </li>
          <li className="nav-item-home d-flex">
            <span className="mr-2 sun-icon">
              <i className="fas fa-sun"></i>
            </span>
            <div className="custom-control custom-switch">
              <input
                readOnly
                checked={theme === "dark"}
                type="checkbox"
                className="custom-control-input "
                id="darkSwitch"
                onClick={() =>
                  setTheme((cur) => (cur === "light" ? "dark" : "light"))
                }
              />
              <label className="custom-control-label" htmlFor="darkSwitch" />
            </div>
            <span className="moon-icon">
              <i className="fas fa-moon "></i>
            </span>
          </li>
          <animated.li className="nav-item-home" style={props}>
            <Link href="/signin">
              <input
                value={t("home:signin")}
                type="button"
                className="btn btn-opacity  btn-hover2 text-warning font-weight-bold btn-active"
              />
            </Link>
            <Link href="/signup">
              <input
                value={t("home:signup")}
                type="button"
                className="btn btn-opacity  btn-hover1 btn-outline-danger text-home font-weight-bold"
              />
            </Link>
          </animated.li>
        </ul>
      </nav>
      <header className="header-home mb-4">
        <Image
          width={200}
          height={140}
          quality={100}
          src="/Z.webp"
          className="logo img-selector"
          alt={t("home:logo")}
          priority
        />
        <main className="f-w-450 wrapper">
          <animated.h1 className="f-w-500" style={values}>
            {t("home:desc1")}
          </animated.h1>
          <animated.h1 className="f-w-500 info" style={values}>
            {t("home:desc2")}
          </animated.h1>
          <p className=" mt-4 f-w-600 l-space">{t("home:desc3")}</p>
          <p className=" go-up mb-2 f-w-600 l-space">{t("home:desc4")}</p>
        </main>
        <div className="mb-4"></div>
      </header>
      <section className="hero container ">
        <h2 className="justify-content-center  text-center text-heading">
          <i className={`fab fa-angellist text-heading `}></i>
          {t("home:about")}
        </h2>
        <div className="b-line"></div>
        <ShiftBy y={-50}>
          <div className="hero-center">
            <article className="hero-info">
              <h1 className={` ${lang === "ar" ? "text-right" : ""}`}>
                {t("home:heading")}
              </h1>

              <p
                className={`lead  ln-hgt  text-left f-w-600  ${
                  lang === "ar" ? "text-right" : ""
                }`}
              >
                {t("home:desc5")}
                {t("home:desc6")}
              </p>
              <Link href="/products">
                <a
                  className={`custom-btn hvr-float-shadow  join-btn ${
                    lang === "ar" ? "row offset-9 justify-content-end" : ""
                  }`}
                >
                  {t("home:join")}
                </a>
              </Link>
            </article>
            <article className="hero-img photo-item">
              <Image
                src="/store.webp"
                className="img-fluid photo-img"
                alt={t("home:logo")}
                width={520}
                height={300}
                quality={75}
              />
            </article>
          </div>
        </ShiftBy>
      </section>
      <ShiftBy y={-50}>
        <section className="container team">
          <div className="d-flex text-uppercase justify-content-center">
            <h2
              className={`align-self-center mx-1 ${
                lang === "ar" ? "order-2" : ""
              }`}
            >
              {t("home:staff1")}
            </h2>
            <h2
              className={`section-title--special mx-1 align-self-center mx-1 ${
                lang === "ar" ? "order-1" : ""
              }`}
            >
              {t("home:staff2")}
            </h2>
          </div>
          <div className="row mt-4">
            <div className="col-10 mx-auto col-md-6 col-lg-4">
              <article className="review">
                <div className="img-container">
                  <Image
                    width={150}
                    height={150}
                    quality={100}
                    src="/img/Pr.Nada-rih.jpg"
                    id="person-img"
                    alt={t("home:name1")}
                  />
                </div>
                <h4 id="author" className="text-home">
                  {t("home:name1")}
                </h4>
                <p id="job">{t("home:job1")}</p>
                <p id="info" className="text-home">
                  {t("home:info1")}
                </p>
                <Link href="https://www.linkedin.com/in/nada-rih-750b894a/">
                  <a
                    target="_blank"
                    className="hvr-float-shadow font-weight-bold"
                  >
                    {t("home:linkedin")}
                  </a>
                </Link>
              </article>
            </div>

            <div className="col-10 mx-auto  col-md-6 col-lg-4">
              <article className="review">
                <div className="img-container">
                  <Image
                    width={150}
                    height={150}
                    quality={100}
                    src="/img/said-el-baoune.jpg"
                    id="person-img"
                    alt={t("home:name2")}
                  />
                </div>
                <h4 id="author" className="text-home">
                  {t("home:name2")}
                </h4>
                <p id="job">{t("home:job2")}</p>
                <p id="info" className="text-home">
                  {t("home:info2")}
                </p>
                <Link href="https://www.linkedin.com/in/said-el-baoune-71671510/">
                  <a
                    target="_blank"
                    className="hvr-float-shadow font-weight-bold"
                  >
                    {t("home:linkedin")}
                  </a>
                </Link>
              </article>
            </div>

            <div className="col-10 mx-auto col-md-6 col-lg-4">
              <article className="review">
                <div className="img-container">
                  <Image
                    width={150}
                    height={150}
                    quality={100}
                    src="/img/M.iyad.jpg"
                    id="person-img"
                    alt={t("home:name3")}
                  />
                </div>
                <h4 id="author" className="text-home">
                  {t("home:name3")}
                </h4>
                <p id="job">{t("home:job3")}</p>
                <p id="info" className="text-home">
                  {t("home:info3")}
                </p>
                <Link href="https://www.linkedin.com/in/iyadaithou/">
                  <a
                    target="_blank"
                    className="hvr-float-shadow font-weight-bold"
                  >
                    {t("home:linkedin")}
                  </a>
                </Link>
              </article>
            </div>
          </div>
        </section>
      </ShiftBy>
      <Footer />
    </HelmetProvider>
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  if (data.currentUser?.validated === false) {
    return {
      redirect: {
        destination: "/account/unverified-email",
        permanent: false,
      },
    };
  }
  if (data.currentUser?.validated === true) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default HomePage;
