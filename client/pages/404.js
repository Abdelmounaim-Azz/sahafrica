import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocalState } from "../helpers/use-localState";
import { Title } from "../helpers/use-title";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT";
const calc = (x, y) => [x - window.innerWidth / 4, y - window.innerHeight / 4];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 2}px,${y / 2}px,0)`;

export default function Custom404({ staticData }) {
  const [theme, setTheme] = useLocalState("theme", "light");

  let { lang } = useTranslation();
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <Title title={staticData.title} />
      <div className="m-4">
        <div className="grid-404">
          <div className="section-content">
            <div className="d-flex flex-column margin-top-8">
              <h1 className="content-title text-center text-info justify-content-center align-items-center">
                {staticData.four04}{" "}
                <span className="font-weight-bold text-warning">
                  {staticData.not}
                </span>{" "}
                {staticData.found}
              </h1>
              <p className="lead text-center justify-content-center align-items-center">
                {staticData.p1}{" "}
                <strong className="text-danger font-weight-bold">
                  {staticData.p2}
                </strong>{" "}
                {staticData.p3}
              </p>
              <div className="text-center justify-content-center align-items-center">
                <Link href="/">
                  <a className="btn-warning mb-2 btn-lg btn">
                    {staticData.anchor}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="section-icon">
            <div className="main-404 mr-4 container ">
              <div
                className="container-404 mr-4 d-flex "
                onMouseMove={({ clientX: x, clientY: y }) =>
                  set({ xy: calc(x, y) })
                }
              >
                <animated.div
                  className="card1 align-items-center justify-content-center"
                  style={{ transform: props.xy.interpolate(trans1) }}
                />
                <animated.div
                  className="card2 align-items-center justify-content-center"
                  style={{ transform: props.xy.interpolate(trans2) }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
export async function getStaticProps({ locale }) {
  const t = await getT(locale, "notfound");
  const title = t("title");
  const four04 = t("404");
  const not = t("not");
  const found = t("found");
  const p1 = t("p1");
  const p2 = t("p2");
  const p3 = t("p3");
  const anchor = t("anchor");
  return {
    props: {
      staticData: {
        title,
        four04,
        not,
        found,
        p1,
        p2,
        p3,
        anchor,
      },
    },
  };
}
