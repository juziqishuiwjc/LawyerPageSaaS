import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none",
          },
        }}
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
