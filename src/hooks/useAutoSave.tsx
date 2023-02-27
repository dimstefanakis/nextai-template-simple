import { useEffect } from "react";
import { useWebsiteStore } from "../store/websiteStore";
import axios from "axios";

function useAutoSave() {
  const data = useWebsiteStore((state: any) => state.data);
  const website_id = useWebsiteStore((state: any) => state.id);

  useEffect(() => {
    let interval = setTimeout(() => {
      if (data && website_id) {
        axios.patch(`/api/edit-website`, {
          data,
          websiteId: website_id,
        });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);
}

export default useAutoSave;
