import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Hero from "../../src/flat/Hero";
import Features from "../../src/flat/Features";
import Testimonials from "../../src/flat/Testimonials";
import Footer from "../../src/flat/Footer";
import ActionButtons from "../../src/features/ActionButtons";
import { useWebsiteStore } from "../../src/store/websiteStore";
import useAutoSave from "../../src/hooks/useAutoSave";
import axios from "axios";

function GeneratedWebsite() {
  const router = useRouter();
  const { id } = router.query;
  useAutoSave();
  const [data, setData] = useState(null);
  const setWebsiteData = useWebsiteStore((state: any) => state.setWebsiteData);
  const websiteData = useWebsiteStore((state: any) => state.data);
  const setId = useWebsiteStore((state: any) => state.setId);

  async function getGeneratedWebsite() {
    const res = await axios.post(`/api/get-website`, {
      websiteId: id,
    });
    setData(res.data.data);
  }

  useEffect(() => {
    if (id) {
      setId(id);
      getGeneratedWebsite();
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setWebsiteData(data);
    }
  }, [data]);

  console.log("data", data);

  return (
    websiteData && (
      <>
        <Hero data={websiteData} />
        <Features data={websiteData} />
        <Testimonials data={websiteData} />
        <Footer />
        <ActionButtons />
      </>
    )
  );
}

export default GeneratedWebsite;
