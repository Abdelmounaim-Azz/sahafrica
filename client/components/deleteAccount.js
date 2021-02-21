import { useState, useEffect, useCallback } from "react";
import { pressKey } from "../helpers/use-presskey";
import onClickOutside from "react-onclickoutside";
function DeleteAccount(props) {
  const [openModal, setOpenModal] = useState(false);
  DeleteAccount.handleClickOutside = () => setOpenModal(false);
  pressKey(openModal, setOpenModal);
  return (
    <div className="container d-flex justify-content-center ">
      <input
        className="btn btn-sm btn-outline-danger"
        value="Delete your account"
        type="submit"
        onClick={() => setOpenModal(!openModal)}
      />
      {openModal && props.children}
    </div>
  );
}
const clickOutsideConfig = {
  handleClickOutside: () => DeleteAccount.handleClickOutside,
};
export default onClickOutside(DeleteAccount, clickOutsideConfig);
