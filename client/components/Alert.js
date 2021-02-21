import { useState } from "react";
const Alert = ({ content, className }) => {
  const [show, setShow] = useState(true);
  return show ? (
    <div className={`alert  ${className}`} role="alert">
      {content}
      <button type="button" className="close" onClick={() => setShow(false)}>
        <span>
          <i className="fas fa-times fa-xs" data-fa-transform="shrink-4"></i>
        </span>
      </button>
    </div>
  ) : null;
};
export default Alert;
