export type BatchStatus =
  | "idle"
  | "waiting"
  | "in_progress"
  | "completed"
  | "error";

export const getBatchStatusText = (status: BatchStatus) => {
  switch (status) {
    case "waiting":
      return "待機中";
    case "in_progress":
      return "クローリング中";
    case "completed":
      return "完了";
    case "error":
      return "エラー";
    default:
      return "";
  }
};

export const getBatchStatusColor = (status: BatchStatus) => {
  switch (status) {
    case "waiting":
      return "bg-yellow-500";
    case "in_progress":
      return "bg-blue-500";
    case "completed":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
