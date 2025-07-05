import { PlusIcon } from "@heroicons/react/24/solid";

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
      >
        <div className="overflow-x-hidden">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 w-[90vw] max-w-[36rem] aspect-[1155/678] -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
      </div>
      <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-balance text-sky-400 sm:text-7xl">
            Build Better Habits. Your journey to discipline starts here...
          </h1>
          <p className="mt-8 text-xl sm:text-4xl font-bold text-white">
            Stay consistent, track your progress, and become the best version of
            yourself
          </p>
          {/* Centered Card for Add Habit */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => console.log("Add Habit Clicked")}
              className="bg-white/5 active:scale-[.98] rounded-md shadow-2xl hover:shadow-lg cursor-pointer p-8 flex flex-col items-center w-sm border-sky-400 focus:outline-none focus:ring-2 data-focus:bg-white/10 transition transform shadow-sky-600"
              type="button"
            >
              <PlusIcon className="w-16 h-16 mb-2 text-gray-300" />
              <div className="flex h-10 w-48 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-yellow-500 p-[1.5px] text-white">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-neutral-800">
                  Add your first habit
                </div>
              </div>
              <p className="mt-4 text-lg font-light text-white text-center">
                Create a new habit to start tracking your progress
              </p>
            </button>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="overflow-x-hidden relative left-1/2 -translate-x-1/2 w-[90vw] max-w-[36rem] aspect-[1155/678] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}
