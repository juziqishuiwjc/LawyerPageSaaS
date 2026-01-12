import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none",
          },
        }}
        redirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </div>
  );
}
