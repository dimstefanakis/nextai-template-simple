import { useEffect } from "react";
import { useWebsiteStore } from "../store/websiteStore";

function useAutoFocus() {
  const editingKey = useWebsiteStore((state: any) => state.editingKey);
  const setEditingKey = useWebsiteStore((state: any) => state.setEditingKey);

  useEffect(() => {
    if (editingKey) {
      const el = document.getElementById(editingKey);
      if (el) {
        el.setAttribute("contenteditable", "true");
        el.focus();
        el.onblur = () => {
          setEditingKey(null);
        };
      }

      return () => {
        if (el) {
          el.setAttribute("contenteditable", "false");
        }
      };
    }
  }, [editingKey]);
}

export default useAutoFocus;
