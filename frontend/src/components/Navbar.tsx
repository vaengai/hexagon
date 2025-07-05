import user_img from "../assets/Venkatesh_circle.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  PencilSquareIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
export default function Navbar() {
  return (
    <header className="z-50 flex justify-between items-center py-6 px-8 md:px-8 drop-shadow-md relative">
      <a href="#" className="flex items-center gap-2">
        <i className="bxr bx-blur hover:animate-pulse text-sky-700 text-6xl" />
        <span className="text-4xl text-white font-thin">HEXAGON</span>
      </a>
      <div className="flex items-center gap-6 ml-auto">
        <i className="bx bx-bell text-4xl hover:text-white text-gray-500 font-light"></i>
        <Menu>
          <MenuButton className="focus:outline-none cursor-pointer">
            <img
              src={user_img}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-none"
            />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-40 origin-top-right rounded-md border border-white/5 bg-white/5 p-1 text-lg font-light text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilSquareIcon className="size-6 fill-white/30" />
                Profile
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <AdjustmentsHorizontalIcon className="size-6 fill-white/30" />
                Settings
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <ChartBarSquareIcon className="size-6 fill-white/30" />
                Dashboard
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-red-300">
                <ArrowRightStartOnRectangleIcon className="size-6 fill-white/30" />
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
