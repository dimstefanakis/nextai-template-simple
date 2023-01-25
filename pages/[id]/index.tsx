import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Hero from "../../src/flat/Hero";
import Features from "../../src/flat/Features";
import Testimonials from "../../src/flat/Testimonials";
import Footer from "../../src/flat/Footer";
import axios from "axios";

function GeneratedWebsite() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  async function getGeneratedWebsite() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/website/${id}`
    );
    setData(res.data.data);
  }

  useEffect(() => {
    if (id) {
      getGeneratedWebsite();
    }
  }, [id]);

  return (
    data && (
      <>
        <Hero data={data} />
        <Features data={data} />
        <Testimonials data={data} />
        <Footer />
      </>
    )
  );
}

export default GeneratedWebsite;
