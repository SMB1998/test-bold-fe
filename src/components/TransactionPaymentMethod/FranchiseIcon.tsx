import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

interface FranchiseIconProps {
  franchise: string;
}

export const FranchiseIcon = ({
  franchise,
}: FranchiseIconProps): JSX.Element | null => {
  switch (franchise.toUpperCase()) {
    case "VISA":
      return <FaCcVisa style={{ color: "#0066b3" }} />;
    case "MASTERCARD":
      return <FaCcMastercard style={{ color: "#ff5f00" }} />;
    default:
      return null;
  }
};
