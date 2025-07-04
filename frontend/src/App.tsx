function App() {
  return (
    <div className="w-full h-full absolute bg-gradient-to-b from-neutral-950 to-stone-900">
      <header className="flex justify-between items-center text-white py-6 px-8 md:px-32 drop-shadow-md">
        <a href="#" className="-ml-24">
          <i className="bxr bx-blur hover:animate-pulse text-white w-12 h-12 text-4xl" />
        </a>
        <div className="relative md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 rounded-lg border-none bg-neutral-700"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
