import { A } from "./(post)/components/a";

export function Footer() {
  return (
    <footer className="p-6 pt-3 pb-6 flex text-xs text-center mt-3 dark:text-gray-400 text-gray-500 font-mono">
      <div className="grow text-left">
        Yuuki008 (
        <A target="_blank" href="https://twitter.com/nomu487495">
          @nomu487495
        </A>
        )
      </div>
      <div>
        <A target="_blank" href="https://github.com/yuuki008/blog2">
          Source
        </A>
      </div>
    </footer>
  );
}
