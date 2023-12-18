export function Content({ children }) {
  // console.log("Content render");
  return (
    <main className="flex grow flex-col">
      {children}
      <div className="absolute bottom-4 right-4 rounded-lg bg-slate-500 p-2">?</div>
    </main>
  );
}
