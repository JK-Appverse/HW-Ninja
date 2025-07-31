import { type SmartSolveInput, type SmartSolveOutput } from "@/ai/flows/smart-solve";

export interface HistoryItem extends SmartSolveInput {
  solution: SmartSolveOutput;
  timestamp: string;
}

const HISTORY_KEY = "smartace_history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Failed to retrieve history from localStorage", error);
    return [];
  }
}

export function saveHistory(item: HistoryItem) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const history = getHistory();
    history.push(item);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}

export function clearHistory() {
    if (typeof window === "undefined") {
      return;
    }
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error("Failed to clear history from localStorage", error);
    }
}
