import type { Route } from "./+types/home";
import {Button} from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function Home() {
  return <>
    <Button>Button</Button>
  </>;
}

export default Home;
