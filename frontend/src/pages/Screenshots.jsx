import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export default function Screenshots() {
  const [history, setHistory] = useState([]);
  const [selectedImage, setSelectedImage] =
    useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch(
        "https://testgenie-ai-docker.onrender.com/dashboard/stats"
      );

      const data =
        await response.json();

      setHistory(
        data.execution_history || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const screenshots =
    history.flatMap(
      item =>
        item.screenshots || []
    );

  return (
    <div className="
      flex
      bg-[#0B1120]
      min-h-screen
      text-white
    ">
      <Sidebar />

      <div className="
        flex-1
        p-10
        overflow-auto
      ">
        <h1 className="
          text-5xl
          font-bold
          mb-3
        ">
          Screenshots
        </h1>

        <p className="
          text-gray-400
          mb-10
        ">
          Visual evidence captured
          during executions
        </p>

        {
          screenshots.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            ">
              {
                screenshots.map(
                  (
                    image,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        bg-[#111827]
                        rounded-3xl
                        overflow-hidden
                        border
                        border-slate-700/50
                        cursor-pointer
                        hover:scale-105
                        transition-all
                      "
                      onClick={() =>
                        setSelectedImage(
                          image
                        )
                      }
                    >
                      <img
                        src={image}
                        alt=""
                        className="
                          w-full
                          h-64
                          object-cover
                        "
                      />

                      <div className="
                        p-5
                      ">
                        <h3 className="
                          text-lg
                          font-bold
                        ">
                          Screenshot
                          {
                            index + 1
                          }
                        </h3>

                        <p className="
                          text-gray-400
                          text-sm
                          mt-2
                        ">
                          Captured
                          during
                          automated
                          execution
                        </p>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          )
        }

        {
          selectedImage && (
            <div className="
              fixed
              inset-0
              bg-black/90
              flex
              items-center
              justify-center
              z-50
            "
            onClick={() =>
              setSelectedImage(
                null
              )
            }>
              <img
                src={selectedImage}
                className="
                  max-w-[90%]
                  max-h-[90%]
                  rounded-3xl
                "
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="
      bg-[#111827]
      rounded-3xl
      p-20
      text-center
    ">
      <div className="
        text-7xl
        mb-6
      ">
        📷
      </div>

      <h2 className="
        text-4xl
        font-bold
        mb-4
      ">
        No Screenshots Available
      </h2>

      <p className="
        text-gray-400
      ">
        Run a website analysis
        to generate screenshots.
      </p>
    </div>
  );
}