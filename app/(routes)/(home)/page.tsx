import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Main from "./_components/main";

const Home = () => {
  return (
    <>
      <Breadcrumbs items={[
        {
            href: "/",
            label: "Anasayfa",
        },
        {
            href: null,
            label: "Kesim Listesi",
        },
      ]} />
      <Card className="py-0">
        <CardContent className="p-1.5">
          <Main />
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
