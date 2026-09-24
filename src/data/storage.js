const STORAGE_KEY = "guokao-logs";

export const defaultLogs = [
  {
    id: 1,
    date: "2026-09-23",
    title: "资料分析正确率上80%",
    content: "今天刷了两套资料分析，正确率终于上80%了，他说'我感觉我行了'。",
    comment: "行，这波确实行。但昨天数量关系全蒙C的事我还没忘。",
    snarkIndex: 40,
    tags: ["资料分析", "进步"],
    images: [],   // 这里存文件名，例如 ["2026-09-23-1.jpg"]
  },
];

export function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw).map((l) => ({ images: [], ...l }));
    }
  } catch {}
  return defaultLogs;
}

export function saveLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

// 新增：把文件名变成可访问路径
export function imageUrl(name) {
  if (!name) return "";
  // 如果已经是完整路径或 URL，就直接用
  if (name.startsWith("http") || name.startsWith("/")) return name;
  return `/uploads/${name}`;
}