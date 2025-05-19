import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
      <Card className="py-2">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold px-6 text-gray-800">Kesim Listesi</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="p-6">
          <Main />
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
