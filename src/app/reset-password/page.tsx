import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20 text-slate-400">Loading...</p>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
