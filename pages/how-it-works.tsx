import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { Data } from "@/types/index";

import SideBar from "@/components/walkthroughs/sidebar/SideBar";
import MainContent from "@/components/walkthroughs/Main/MainContent";

const HowItWorks: NextPage = () => {
  const [walkthrough, setWalkthrough] = useState(1.1);
  const [stage, setStage] = useState(1);
  const [data, setData] = useState<Data>();
  const [html, setHtml] = useState("");

  useEffect(() => {
    const getJson = async () => {
      const res = await fetch(`/json/sellers/${walkthrough}.json`);
      const result = await res.json();

      setData(result);
    };

    getJson();
    setStage(1);
  }, [walkthrough]);

  useEffect(() => {
    if (data?.options.hide_description.includes(stage)) {
      return;
    }

    const getHtml = async () => {
      const res = await fetch(`/html/${walkthrough}/${stage}.html`);
      const result = await res.text();
      setHtml(result);
    };

    getHtml();
  }, [stage]);

  return (
    <>
      <div className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
        <SideBar
          stage={stage}
          walkthrough={walkthrough}
          setStage={setStage}
          setWalkthrough={setWalkthrough}
          data={data}
          html={html}
        />
        <MainContent stage={stage} setStage={setStage} data={data} />
      </div>
    </>
  );
};

export default HowItWorks;
