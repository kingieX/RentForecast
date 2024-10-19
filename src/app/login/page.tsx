import { LoginForm } from "@/components/login-form";
import Navbar from "../components/Navbar";

export default function Page() {
  return (
    <div>
      <Navbar />

      <div className="flex h-screen w-full items-center justify-center px-4 lg:pt-36 pt-24">
        <LoginForm />
      </div>
    </div>
  );
}
