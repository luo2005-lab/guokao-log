import { useEffect, useMemo, useState } from "react";
import Timeline from "./components/Timeline";
import Card from "./components/Card";
import EditModal from "./components/EditModal";
import { loadLogs, saveLogs } from "./data/storage";
import MooncakeRain from "./components/MooncakeRain";
import JungleBackground from "./components/JungleBackground";
import WillowSides from "./components/WillowSides";
import Archway from "./components/Archway";


export default function App() {
  const [logs, setLogs] = useState(() => loadLogs());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 每次 logs 变化写入 localStorage
  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  // 按日期倒序
  const sorted = useMemo(
    () => [...logs].sort((a, b) => b.date.localeCompare(a.date)),
    [logs]
  );

  // 越界修正
  useEffect(() => {
    if (currentIndex >= sorted.length) {
      setCurrentIndex(Math.max(0, sorted.length - 1));
    }
  }, [sorted.length, currentIndex]);

  // 键盘左右切换
  useEffect(() => {
    const handler = (e) => {
      if (modalOpen) return;
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((i) => Math.min(sorted.length - 1, i + 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen, sorted.length]);

  const openNew = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (id) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingId !== null) {
      setLogs((prev) =>
        prev.map((l) => (l.id === editingId ? { ...l, ...data } : l))
      );
    } else {
      const newId = logs.length ? Math.max(...logs.map((l) => l.id)) + 1 : 1;
      setLogs((prev) => [...prev, { id: newId, ...data }]);
      setCurrentIndex(0);
    }
    setModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const log = logs.find((l) => l.id === id);
    if (!log) return;
    if (!confirm(`确定删除「${log.title}」吗？`)) return;
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const examDate = new Date("2026-11-29");
  const days = Math.max(
    0,
    Math.ceil((examDate - new Date()) / 86400000)
  );

  const current = sorted[currentIndex];
  const editingLog = editingId !== null
    ? logs.find((l) => l.id === editingId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <JungleBackground />
      <WillowSides />
      <Archway />
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">监督日志</h1>
            <p className="text-xs text-gray-400">
              记录漙瀼🍊的国考日常 · 含祝贺与吐槽
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-gray-400">距离国考还有</div>
              <div className="text-2xl font-bold text-blue-500">{days} 天</div>
            </div>
            <button
              onClick={openNew}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              + 新建
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <aside className="hidden md:block">
          <h2 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            时间轴
          </h2>
          <Timeline
            logs={sorted}
            activeIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </aside>

        <section>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="text-sm text-gray-500 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← 上一条
            </button>
            <span className="text-xs text-gray-400">
              {sorted.length === 0 ? "0 / 0" : `${currentIndex + 1} / ${sorted.length}`}
            </span>
            <button
              onClick={() =>
                setCurrentIndex((i) => Math.min(sorted.length - 1, i + 1))
              }
              disabled={currentIndex >= sorted.length - 1}
              className="text-sm text-gray-500 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              下一条 →
            </button>
          </div>

          {current ? (
            <Card
              log={current}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-400">
              还没有记录，点右上角「+ 新建」开始吧
            </div>
          )}

          <p className="text-center text-xs text-gray-300 mt-6">
            提示：可用键盘 ← → 切换卡片
          </p>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-300 py-8">
        本日志仅供娱乐，祝朋友早日上岸 🌊
      </footer>
      <MooncakeRain />
      <EditModal
        open={modalOpen}
        editingLog={editingLog}
        onClose={() => {
          setModalOpen(false);
          setEditingId(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}