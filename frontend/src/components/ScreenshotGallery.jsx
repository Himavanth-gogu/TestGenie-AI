export default function ScreenshotGallery({
  screenshots = []
}) {

  if (!screenshots.length) {
    return null;
  }

  return (
    <div
      className="
      bg-[#111827]
      border border-slate-700/50
      rounded-[28px]
      p-8
      shadow-2xl
      backdrop-blur-xl
      "
    >
      {/* Header */}
      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">
        <div>
          <h2 className="
            text-3xl
            font-bold
          ">
            Screenshot Gallery
          </h2>

          <p className="
            text-gray-400
            mt-2
          ">
            Visual evidence captured during execution
          </p>
        </div>

        <div className="
          bg-blue-500/10
          border border-blue-500/20
          px-5 py-2
          rounded-xl
          text-blue-400
          font-semibold
        ">
          {screenshots.length} Captured
        </div>
      </div>

      {/* Gallery */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
        "
      >
        {screenshots.map(
          (
            screenshot,
            index
          ) => {

            const title =
              index === 0
              ? "Homepage"
              : `Page ${index}`;

            return (
              <div
                key={index}
                className="
                  group
                  bg-slate-900/60
                  border border-slate-700/50
                  rounded-3xl
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:border-blue-500/40
                  hover:shadow-blue-500/10
                  hover:shadow-2xl
                "
              >

                {/* Image */}
                <div className="
                  overflow-hidden
                ">
                  <img
                    src={screenshot}
                    alt={title}
                    className="
                      w-full
                      h-56
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-6">

                  <div className="
                    flex
                    justify-between
                    items-center
                    mb-4
                  ">
                    <h3 className="
                      text-xl
                      font-bold
                    ">
                      {title}
                    </h3>

                    <span className="
                      text-green-400
                      text-sm
                    ">
                      Captured
                    </span>
                  </div>

                  <div className="
                    space-y-2
                    text-sm
                    text-gray-400
                    mb-5
                  ">
                    <p>
                      Resolution:
                      1440 × 900
                    </p>

                    <p>
                      Status:
                      Screenshot Available
                    </p>

                    <p>
                      Execution:
                      Successful
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="
                    flex
                    gap-3
                  ">
                    <a
                      href={screenshot}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex-1
                        text-center
                        bg-blue-600
                        hover:bg-blue-700
                        py-3
                        rounded-xl
                        transition
                      "
                    >
                      Open
                    </a>

                    <a
                      href={screenshot}
                      download
                      className="
                        flex-1
                        text-center
                        bg-slate-700
                        hover:bg-slate-600
                        py-3
                        rounded-xl
                        transition
                      "
                    >
                      Download
                    </a>
                  </div>

                </div>

              </div>
            );
          }
        )}
      </div>

    </div>
  );
}