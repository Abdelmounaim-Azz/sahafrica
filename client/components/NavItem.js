import { useState } from "react";
import { pressKey } from "../helpers/use-presskey";
import Link from "next/link";
import onClickOutside from "react-onclickoutside";
function NavItem(props) {
  const [open, setOpen] = useState(false);
  NavItem.handleClickOutside = () => setOpen(false);
  pressKey(open, setOpen);
  return props.currentUser ? (
    <ul>
      <li className="nav-item">
        <a className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>
        {open && props.children}
      </li>
    </ul>
  ) : (
    <ul>
      <li className="nav-item-home">
        <Link href="/signup">
          <input
            value="Sign up"
            type="button"
            className="btn btn-opacity  btn-hover1 btn-outline-danger  font-weight-bold"
          />
        </Link>
        <Link href="/signin">
          <input
            value="Sign in"
            type="button"
            className="btn btn-opacity  btn-hover2 text-warning font-weight-bold btn-active"
          />
        </Link>
      </li>
    </ul>
  );
}
const clickOutsideConfig = {
  handleClickOutside: () => NavItem.handleClickOutside,
};
export default onClickOutside(NavItem, clickOutsideConfig);
