/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

export default function Example() {
  return (
    <header className="bg-indigo-600">
      <nav
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Top"
      >
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              {/* <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              /> */}
              <h1 className="text-white text-2xl">EXETER MARKET DESIGN</h1>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
