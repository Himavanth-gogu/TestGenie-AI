export default function LiveActivityFeed({
  result
}) {

  if (!result) {
    return null;
  }

  const activities = [];

  const now = new Date();

  const timeString = (
    offset
  ) => {
    const date = new Date(
      now.getTime() + offset * 1000
    );

    return date.toLocaleTimeString();
  };

  activities.push({
    time: timeString(-8),
    icon: "🌐",
    title: "Website Analysis Started",
    description:
      result.analysis?.url ||
      "Unknown Website"
  });

  activities.push({
    time: timeString(-6),
    icon: "🔍",
    title: "Page Discovery Completed",
    description:
      `${result.analysis?.links || 0} links discovered`
  });

  activities.push({
    time: timeString(-4),
    icon: "🤖",
    title: "Automation Tests Generated",
    description:
      `${result.generated_tests?.length || 0} test cases created`
  });

  activities.push({
    time: timeString(-3),
    icon: "📷",
    title: "Screenshots Captured",
    description:
      `${result.screenshots?.length || 0} screenshots saved`
  });

  activities.push({
    time: timeString(-2),
    icon: "📄",
    title: "Reports Generated",
    description:
      "HTML and PDF reports available"
  });

  activities.push({
    time: timeString(0),
    icon: "✅",
    title: "Execution Completed",
    description:
      `Health Score ${result.summary?.health_score || 0}%`
  });

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
            Live Activity Feed
          </h2>

          <p className="
            text-gray-400
            mt-2
          ">
            Real-time execution events
          </p>
        </div>

        <div className="
          px-4
          py-2
          rounded-xl
          bg-green-500/10
          border border-green-500/20
          text-green-400
          font-semibold
        ">
          Live
        </div>
      </div>

      <div className="
        relative
      ">

        <div className="
          absolute
          left-5
          top-0
          bottom-0
          w-[2px]
          bg-slate-700
        " />

        <div className="
          space-y-8
        ">
          {
            activities.map(
              (
                activity,
                index
              ) => (
                <div
                  key={index}
                  className="
                    flex
                    gap-5
                    relative
                  "
                >
                  <div className="
                    z-10
                    w-10
                    h-10
                    rounded-full
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                    border border-slate-700
                  ">
                    {activity.icon}
                  </div>

                  <div className="
                    flex-1
                    pb-6
                  ">
                    <div className="
                      flex
                      justify-between
                      items-center
                    ">
                      <h3 className="
                        text-lg
                        font-semibold
                      ">
                        {activity.title}
                      </h3>

                      <span className="
                        text-sm
                        text-gray-500
                      ">
                        {activity.time}
                      </span>
                    </div>

                    <p className="
                      text-gray-400
                      mt-2
                    ">
                      {activity.description}
                    </p>
                  </div>
                </div>
              )
            )
          }
        </div>

      </div>

    </div>
  );
}