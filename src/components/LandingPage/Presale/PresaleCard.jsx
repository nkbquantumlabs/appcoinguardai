export default function PresaleCard() {
  return (
    <div className="max-w-[900px] w-full mx-auto bg-zinc-800 rounded-2xl md:rounded-[36px] overflow-hidden flex flex-col gap-3 md:gap-4 mt-8 md:mt-12 pb-4 md:pb-6 mb-8 md:mb-12 mx-4">
      {/* Header */}
      <div className="w-full px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-lime-400 via-lime-600 to-zinc-800 rounded-tl-2xl rounded-tr-2xl md:rounded-tl-[36px] md:rounded-tr-[36px]">
        <h2 className="text-zinc-800 text-2xl md:text-3xl lg:text-4xl font-bold font-['Mona_Sans'] uppercase">
          Presale
        </h2>
      </div>

      {/* Presale Details */}
      <div className="w-full px-4 md:px-6 flex flex-col gap-3 md:gap-4">
        {/* Progress Section */}
        <div className="flex flex-col gap-1 md:gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-stone-300 text-sm md:text-base lg:text-lg font-['Manrope']">
              Progress
            </span>
            <span className="text-white text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
              1.24M WHYPE
            </span>
          </div>
          <div className="w-full h-2.5 md:h-3 lg:h-4 bg-zinc-500 rounded-full shadow-[inset_0_4px_4px_rgba(51,51,51,0.25)] md:shadow-[inset_0_6px_6px_rgba(51,51,51,0.25)]" />
          <div className="text-right text-stone-300 text-sm md:text-base lg:text-lg font-['Manrope']">
            $12,545,545,683
          </div>
        </div>

        {/* Target & Offering */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="w-full sm:w-44 md:w-48 bg-stone-300 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col gap-1 md:gap-2">
            <span className="text-zinc-800 text-sm md:text-base font-['Manrope']">
              Target
            </span>
            <span className="text-zinc-800 text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
              1.24M WHYPE
            </span>
          </div>
          <div className="w-full sm:w-44 md:w-48 bg-stone-300 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col gap-1 md:gap-2">
            <span className="text-zinc-800 text-sm md:text-base font-['Manrope']">
              Offering
            </span>
            <span className="text-zinc-800 text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
              20M UPLH
            </span>
          </div>
        </div>

        {/* Period */}
        <div className="flex flex-col gap-1 md:gap-2">
          <span className="text-stone-300 text-sm md:text-base font-['Manrope']">
            Period
          </span>
          <div className="flex items-center gap-2 text-white text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
            <span>26/05/2025</span>
            <span>-</span>
            <span>15/08/2025</span>
          </div>
        </div>

        {/* Participate Section */}
        <div className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-zinc-500">
          <span className="text-stone-300 text-base md:text-lg lg:text-xl font-medium font-['Manrope']">
            Participate
          </span>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* Input with Max Button */}
            <div className="w-full sm:w-64 md:w-80 flex justify-between items-center h-12 md:h-14 px-3 md:px-4 bg-stone-300 rounded-xl md:rounded-2xl">
              <span className="text-zinc-500 text-base md:text-lg lg:text-xl font-medium font-['Manrope']">
                0
              </span>
              <div className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-500 rounded-md md:rounded-lg">
                <span className="text-white text-base md:text-lg lg:text-xl font-medium font-['Manrope']">
                  Max
                </span>
              </div>
            </div>
            {/* Commit Button */}
            <div className="w-full sm:w-32 md:w-36 flex justify-center items-center h-12 md:h-14 px-4 md:px-5 bg-zinc-800 rounded-xl md:rounded-2xl border border-lime-400">
              <span className="text-lime-400 text-base md:text-lg lg:text-xl font-medium font-['Manrope']">
                Commit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
