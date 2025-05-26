import Counter from "@/app/(routes)/counter/_components/counter";
import Breadcrumbs from "@/components/breadcrumbs";

const CounterPage = () => {
  return (
    <div>
    <Breadcrumbs
        items={[
          {
            href: "/",
            label: "Anasayfa",
          },
          {
            href: "/",
            label: "Kesim Listesi",
          },
          {
            href: null,
            label: "Kesim Sırası",
          },
        ]}
      />
      <div className="relative">
      <Counter />
      </div>
    </div>
  );
};

export default CounterPage;
