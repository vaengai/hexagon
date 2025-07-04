export default function Example() {
  return (
    <div className="w-full h-full absolute bg-gradient-to-b from-neutral-950 to-stone-900">
      <header className="flex justify-between items-center text-white py-6 px-8 md:px-8 drop-shadow-md">
        <a href="#" className="flex items-center gap-2">
          <i className="bxr bx-blur hover:animate-pulse text-sky-700 text-6xl" />
          <span
            className="text-4xl text-white font-thin"            
          >
            HEXAGON
          </span>
        </a>
        <div className="flex items-center gap-6 ml-auto">
          <i className="bx bx-bell text-4xl text-gray-500" style={{ fontWeight: 100 }}></i>
          {/* Avatar with submenu */}
          <div className="relative group">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Avatar"
              className="w-14 h-14 rounded-full border-none"
            />
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-auto group-hover:pointer-events-auto transition-opacity duration-200 z-10">
              <ul className="py-2">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}