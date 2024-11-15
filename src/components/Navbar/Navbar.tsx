import { FC } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import "./Navbar.css";
import BoldIcon from "../Icons/BoldIcon";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="right-section">
        <BoldIcon />
      </div>
      <div className="left-section">
        <div className="button">Mi negocio</div>
        <div className="button">
          Ayuda
          <FaRegQuestionCircle
            style={{ marginLeft: "8px", marginTop:5}}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
