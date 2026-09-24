export default function Timeline({ logs, activeIndex, onSelect }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
      {logs.map((log, i) => (
        <div
          key={log.id}
          onClick={() => onSelect(i)}
          className="relative mb-6 cursor-pointer group"
        >
          <div
            className={`absolute -left-[18px] top-1 w-3 h-3 rounded-full border-2 transition
              ${i === activeIndex
                ? "bg-blue-500 border-blue-500 scale-125"
                : "bg-white border-gray-300 group-hover:border-blue-400"}`}
          />
          <div
            className={`text-sm transition
              ${i === activeIndex
                ? "text-blue-600 font-semibold"
                : "text-gray-500 group-hover:text-gray-700"}`}
          >
            <div>{log.date}</div>
            <div className="text-xs truncate max-w-[160px]">{log.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}