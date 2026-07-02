import {
  getScreenshotUrl
} from "../services/api";

export default function ScreenshotGallery({
  screenshots = []
}) {

  if (!screenshots.length) {
    return null;
  }

  return (
    <div className="
      bg-[#111827]
      border border-slate-700/50
      rounded-[28px]
      p-8
      shadow-2xl
      backdrop-blur-xl
    ">
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

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
      ">
        {screenshots.map(
          (
            screenshot,
            index
          ) => {

            const imageUrl =
              getScreenshotUrl(
                screenshot
              );

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
                "
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="
                    w-full
                    h-56
                    object-cover
                  "
                />

                <div className="p-6">
                  <h3 className="
                    text-xl
                    font-bold
                    mb-4
                  ">
                    {title}
                  </h3>

                  <div className="
                    flex
                    gap-3
                  ">
                    <a
                      href={imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex-1
                        text-center
                        bg-blue-600
                        py-3
                        rounded-xl
                      "
                    >
                      Open
                    </a>

                    <a
                      href={imageUrl}
                      download
                      className="
                        flex-1
                        text-center
                        bg-slate-700
                        py-3
                        rounded-xl
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