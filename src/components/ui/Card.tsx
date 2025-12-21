export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-xl p-8">
      {children}
    </div>
  );
}
