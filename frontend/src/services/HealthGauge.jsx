export default function HealthGauge({ score }) {

    if (!score) return null;

    return (
        <div className="
            bg-gray-900
            rounded-3xl
            p-8
            border border-gray-800
            text-center
        ">
            <h2 className="text-2xl mb-8">
                Health Score
            </h2>

            <div className="
                w-52
                h-52
                mx-auto
                rounded-full
                border-[16px]
                border-green-500
                flex
                items-center
                justify-center
            ">
                <span className="text-6xl font-bold">
                    {score}%
                </span>
            </div>

            <p className="text-gray-400 mt-6">
                Website Quality Score
            </p>
        </div>
    );
}