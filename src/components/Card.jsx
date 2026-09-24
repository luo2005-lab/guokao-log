import SnarkBar from "./SnarkBar";
import { imageUrl } from "../data/storage";

export default function Card({ log, onEdit, onDelete, onViewImage }) {
  const images = log.images || [];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/15 p-6 text-left">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-bold text-xl text-gray-800 text-left">{log.title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-400">{log.date}</span>
          <button
            onClick={() => onEdit(log.id)}
            className="text-xs text-gray-400 hover:text-blue-500 transition"
          >
            ✏️ 编辑
          </button>
          <button
            onClick={() => onDelete(log.id)}
            className="text-xs text-gray-400 hover:text-red-500 transition"
          >
            🗑️ 删除
          </button>
        </div>
      </div>

      {log.content && (
        <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap text-left">
          {log.content}
        </p>
      )}

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {images.map((name, i) => {
            const src = imageUrl(name);
            return (
              <img
                key={i}
                src={src}
                onClick={() => onViewImage(src)}
                onError={(e) => {
                  e.target.alt = "图片加载失败：" + name;
                  e.target.style.opacity = 0.3;
                }}
                className="w-24 h-24 object-cover rounded-lg border border-gray-200 cursor-zoom-in hover:opacity-90 transition"
                alt={`附件 ${i + 1}`}
              />
            );
          })}
        </div>
      )}

      <div className="bg-amber-100/10 border-l-4 border-amber-300/70 p-3 mb-4 rounded">
         <p className="text-sm text-amber-50 whitespace-pre-wrap text-left">
        💬 {log.comment || "（没写点评）"}
          </p>
       </div>

      <SnarkBar value={log.snarkIndex} />

      <div className="flex gap-2 mt-4 flex-wrap">
        {(log.tags || []).map((t) => (
          <span
            key={t}
            className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}