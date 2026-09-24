export default function SnarkBar({ value }) {
  const color =
    value < 30 ? "bg-emerald-400" :
    value < 60 ? "bg-yellow-400" :
    value < 85 ? "bg-orange-400" :
    "bg-red-400";

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-black mb-1">
        <span>毒舌指数</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}