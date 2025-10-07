import React from "react";
import { FcAbout } from "react-icons/fc";
import { GrResources } from "react-icons/gr";
import { LiaWineGlassAltSolid} from "react-icons/lia";
import { MdContactEmergency } from "react-icons/md";
import { Link } from "react-router-dom";

const CompanyModel = ({ onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="absolute left-[-70px] mt-8 w-[250px] bg-[rgb(17,17,17)] shadow-lg rounded-xl p-6 grid grid-cols-1 gap-4 z-50 text-white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="space-y-4">
        <li>
          <Link  to="/about" className="flex items-start gap-2 hover:text-[#CCFF00]">
            {/* <span><FcAbout className="w-5 h-5" /></span> */}
            <p className="font-medium">About</p>
          </Link>
        </li>
        <li>
          <Link target="_blank" to={"https://docs.coinguard.ai/"} className="flex items-start gap-2 hover:text-[#CCFF00]">
            {/* <span><GrResources className="w-5 h-5" /></span> */}
            <p className="font-medium">Resources</p>
          </Link>
        </li>
        <li>
          <Link to={"/contact"} className="flex items-start gap-2 hover:text-[#CCFF00]">
            {/* <span><MdContactEmergency className="w-5 h-5" /></span> */}
            <p className="font-medium">Contact</p>
          </Link>
        </li>
        <li>
          <Link to={"/privacy-policy"} className="flex items-start gap-2 hover:text-[#CCFF00]">
            {/* <span><LiaWineGlassAltSolid className="w-5 h-5" /></span> */}
            <p className="font-medium">Legal</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CompanyModel;
