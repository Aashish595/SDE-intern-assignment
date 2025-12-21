import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <AuthForm type="login" />
    </main>
  );
}

