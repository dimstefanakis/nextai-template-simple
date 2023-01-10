import { useEffect, useState } from "react";
import Hero from "../src/flat/Hero";
import Features from "../src/flat/Features";
import Testimonials from "../src/flat/Testimonials";
import Footer from "../src/flat/Footer";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);

  async function getData() {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/generate_website`,
      {
        prompt:
          "A burger house for 40 year old mothers"
          // "A mentoring application to help learners gain knowledge to specific and customized learning topics with the promotion of interactivity between instructors and students while also facilitating collaborative work.",
      }
    );
    setData(response.data);
  }

  useEffect(() => {
    // getData();
  }, []);

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
