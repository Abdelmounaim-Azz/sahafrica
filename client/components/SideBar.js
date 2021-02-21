import Image from "next/image";
import Link from "next/link";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocalState } from "../helpers/use-localState";
const SideBar = ({ currentUser }) => {
  const [theme, setTheme] = useLocalState("theme", "light");

  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <nav className="sidebar  border-3 rounded">
        <div className="sidebar-sticky margin-1 p-2">
          <div className="mx-auto justify-content-center">
            <img
              src={currentUser.avatar}
              className="rounded-circle avatar"
              alt="MyProfile"
              loading="lazy"
            />
            <h3 className="font-weight-bold mt-1 sidebar-heading">
              {currentUser.name}
            </h3>
          </div>
          <ul className="nav flex-column list-group ">
            <li className="list-group-item active-li">
              <Link href="/settings/profile">
                <a className="nav-link">Profile</a>
              </Link>
            </li>
            <li className="list-group-item active-li">
              <Link href="/settings/account">
                <a className="nav-link">Account</a>
              </Link>
            </li>
            <li className="list-group-item active-li">
              <Link href="/settings/appearance">
                <a className="nav-link">Appearance</a>
              </Link>
            </li>
            <li className="list-group-item active-li">
              <Link href="/orders">
                <a className="nav-link">Orders</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </HelmetProvider>
  );
};
export default SideBar;
