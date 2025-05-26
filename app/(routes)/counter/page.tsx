import Counter from "@/app/(routes)/counter/_components/counter";
import Breadcrumbs from "@/components/breadcrumbs";

const CounterPage = () => {
  return (
    <div className="mt-4">
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
      <Counter />
    </div>
  );
};

export default CounterPage;
