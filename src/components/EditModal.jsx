import { useEffect, useState } from "react";

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  title: "",
  content: "",
  comment: "",
  snarkIndex: 50,
  tags: "",
  images: "",
};

export default function EditModal({ open, editingLog, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (editingLog) {
      setForm({
        ...editingLog,
        tags: (editingLog.tags || []).join(", "),
        images: (editingLog.images || []).join(", "),
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, editingLog]);

  if (!open) return null;

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    const data = {
      date: form.date,
      title: (form.title || "").trim() || "无题",
      content: (form.content || "").trim(),
      comment: (form.comment || "").trim(),
      snarkIndex: Number(form.snarkIndex) || 0,
      tags: (form.tags || "")
        .split(/[,，]/)
        .map((s) => s.trim())
        .filter(Boolean),
      images: (form.images || "")
        .split(/[,，\n]/)
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 text-left">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {editingLog ? "编辑记录" : "新建记录"}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500">日期</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">标题</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="今天他干了啥"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">记录内容</label>
            <textarea
              rows={3}
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* 图片文件名 */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <label className="text-xs text-gray-600 font-medium">
              📎 图片文件名（多个用逗号或换行分隔）
            </label>
            <textarea
              rows={2}
              value={form.images}
              onChange={(e) => update("images", e.target.value)}
              placeholder="2026-09-23-1.jpg, 2026-09-23-2.jpg"
              className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white"
            />
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              把图片拷到项目的{" "}
              <code className="bg-white px-1 rounded">public/uploads/</code>{" "}
              文件夹，然后在这里填文件名即可。
              <br />
              例如文件放在{" "}
              <code className="bg-white px-1 rounded">public/uploads/abc.jpg</code>
              ，这里就填 <code className="bg-white px-1 rounded">abc.jpg</code>。
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500">💬 点评（祝贺 / 吐槽）</label>
            <textarea
              rows={3}
              value={form.comment}
              onChange={(e) => update("comment", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">
              毒舌指数：<span>{form.snarkIndex}</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.snarkIndex}
              onChange={(e) => update("snarkIndex", e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">标签（用逗号分隔）</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="行测, 熬夜"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}