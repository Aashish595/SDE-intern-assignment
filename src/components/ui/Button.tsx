export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-indigo-600 py-2 text-white 
      hover:bg-indigo-700 transition font-medium"
    >
      {children}
    </button>
  );
}
