import Navbar from "../components/Navbar";
import { SignUpForm } from "@/components/signup-form";

export default function Page() {
  return (
    <div>
      <Navbar />

      <div className="flex h-screen w-full items-center justify-center px-4 pt-40">
        <SignUpForm />
      </div>
    </div>
  );
}
