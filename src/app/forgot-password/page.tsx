import Navbar from "../components/Navbar";
import ChangePassword from "./_components/ChangePassword";

const ChangePasswordPage = () => {
  return (
    <>
      <Navbar />

      <div className="pt-12">
        <ChangePassword />
      </div>
    </>
  );
};

export default ChangePasswordPage;
