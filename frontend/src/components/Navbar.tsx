import user_img from "../assets/Venkatesh_circle.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { IconBell } from "@tabler/icons-react";
import { IconHexagonLetterHFilled } from "@tabler/icons-react";
import {
  ChartBarSquareIcon,
  PencilSquareIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="z-50 flex justify-between items-center py-6 px-8 md:px-8 drop-shadow-md relative">
      <Link to="/" className="flex items-center gap-2">
        <IconHexagonLetterHFilled size={48} color="#38bdf8" />
        {/* <i className="bxr bx-blur hover:animate-pulse text-sky-700 text-6xl" />
        <span className="text-4xl text-white font-thin">HEXAGON</span> */}
      </Link>
      <div className="flex items-center gap-6 ml-auto">
        {/* <i className="bx bx-bell text-4xl hover:text-white text-gray-500 font-light"></i> */}
        {/* <IconBell size={32} onClick={console.log("no notifications")} /> */}
        <Menu>
          <MenuButton className="focus:outline-none cursor-pointer hover:animate-pulse">
            <img
              src={user_img}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-white"
            />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-40 origin-top-right rounded-md border border-gray-700 bg-gray-900 p-1 text-base font-light text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilSquareIcon className="size-6 fill-white" />
                Profile
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <AdjustmentsHorizontalIcon className="size-6 fill-white" />
                Settings
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <ChartBarSquareIcon className="size-6 fill-white" />
                Dashboard
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />

            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-red-700 bg-red-400">
                <ArrowRightStartOnRectangleIcon className="size-6 fill-white" />
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
