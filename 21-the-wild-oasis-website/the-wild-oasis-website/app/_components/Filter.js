"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-primary-800">
      <Button filter="all" handle={handleFilter} activeFilter={activeFilter}>
        All cabins
      </Button>
      <Button filter="small" handle={handleFilter} activeFilter={activeFilter}>
        1&mdash;3 guests
      </Button>
      <Button filter="medium" handle={handleFilter} activeFilter={activeFilter}>
        4&mdash;7 guests
      </Button>
      <Button filter="large" handle={handleFilter} activeFilter={activeFilter}>
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handle, activeFilter, children }) {
  return (
    <button
      className={`${activeFilter === filter ? "bg-primary-700 text-primary-50" : ""} px-5 py-2 hover:bg-primary-700`}
      onClick={() => handle(filter)}
    >
      {children}
    </button>
  );
}
