import Link from "next/link";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Title } from "../../helpers/use-title";
import { useLocalState } from "../../helpers/use-localState";

import buildClient from "../../helpers/build-client";

const Profile = ({ currentUser }) => {
  const [theme, setTheme] = useLocalState("theme", "light");

  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <div className="width">
        <Title title="Your Profile" />
        {currentUser?.validated === false && (
          <Alert
            content="Your account has not been validated yet.please check your email for a validation link.You won't be able to fully use our services."
            className="text-center alert-warning"
          />
        )}
        <Header currentUser={currentUser} />
        <div className="row">
          <div className="col-md-3 margin-left-1 margin-top-20">
            <SideBar currentUser={currentUser} />
          </div>
          <div className="col-md-8 ">
            <h3 className="display-4 margin-top-40 font-weight-bold">
              Profile
            </h3>
            <div className="card bg-card m-b-10">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold ">WHAT'S NEXT</span>
                  <Link href="/orders">
                    <a>View all current and past orders</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="margin-top-20 card-profile user-profile">
              <div className="text-home ml-2">
                <h5>Contact Info</h5>
              </div>
              <div className="block-profile">
                <div className="user-image">
                  <img
                    src={currentUser.avatar}
                    className="img-radius"
                    alt="User-Profile-Image"
                    loading="lazy"
                  />
                </div>
                <h6 className="f-w-600 m-t-25 m-b-10">{currentUser.name} </h6>
                <p>Email:{currentUser.email} </p>
                <div className="row text-muted card-footer justify-content-center ">
                  Joined on: {currentUser.dateCreated.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { ...data },
  };
}
export default Profile;
