import { useState, useEffect, useCallback } from "react";

export const usePersistentGlobalFilter = (storageKey: string) => {
  const [globalFilter, setGlobalFilter] = useState<string>(() => {
    return localStorage.getItem(storageKey) || "";
  });

  useEffect(() => {
    localStorage.setItem(storageKey, globalFilter);
  }, [globalFilter, storageKey]);

  const clearGlobalFilter = useCallback(() => {
    localStorage.removeItem(storageKey);
    setGlobalFilter("");
  }, [storageKey]);

  return {
    globalFilter,
    setGlobalFilter,
    clearGlobalFilter,
  };
};
