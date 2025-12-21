interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 
      bg-transparent px-4 py-2 text-sm focus:outline-none 
      focus:ring-2 focus:ring-indigo-500"
    />
  );
}
