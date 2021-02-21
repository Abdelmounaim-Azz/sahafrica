import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import NavItem from "./NavItem";

const Header = ({ currentUser }) => {
  return (
    <Navbar>
      <NavBrand>
        <Image
          src="/logo_africa.webp"
          height={45}
          width={45}
          quality={100}
          alt="Saharafrica"
          priority
        />
      </NavBrand>
      {currentUser && (
        <NavItem
          icon={
            <img
              src="/arrow.png"
              alt="Arrow"
              className="arrow"
              loading="lazy"
            />
          }
          currentUser={currentUser}
        >
          <DropdownMenu avatar={currentUser.avatar}></DropdownMenu>
        </NavItem>
      )}
      {!currentUser && <NavItem currentUser={currentUser}></NavItem>}
    </Navbar>
  );
};
function Navbar(props) {
  return <nav className="navbar">{props.children}</nav>;
}
function NavBrand(props) {
  return (
    <div className="navbar-brand">
      <Link href="/">
        <a className=" px-4">{props.children}</a>
      </Link>
    </div>
  );
}

function DropdownMenu({ avatar }) {
  function DropdownItem(props) {
    return (
      <a
        onClick={props.onClick}
        className="font-weight-bold text-light menu-item"
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }
  return (
    <div className="dropdown">
      <DropdownItem
        leftIcon={
          <Image
            src={avatar}
            className="rounded-circle"
            height={45}
            width={45}
            alt="MyProfile"
            quality={100}
          />
        }
        onClick={() => {
          Router.push("/settings/profile");
        }}
      >
        My Profile
      </DropdownItem>
      <DropdownItem
        leftIcon={
          <Image
            id="logout"
            src="/logout.svg"
            height={28}
            width={28}
            alt="Logout"
            quality={100}
          />
        }
        onClick={async () => {
          await axios.post("/api/users/signout");
          Router.push("/");
        }}
      >
        Signout
      </DropdownItem>
    </div>
  );
}
export default Header;
