import { Children, cloneElement, useState, useMemo } from "react";

export function useTableWithSort(trTh, trTd) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "ascending" ? "descending" : "ascending",
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !trTd) return trTd;

    return [...trTd].sort((a, b) => {
      const aValue = a.props.children.find((child) => child.props["data-label"] === sortConfig.key)
        ?.props.children;
      const bValue = b.props.children.find((child) => child.props["data-label"] === sortConfig.key)
        ?.props.children;

      const aDate = Date.parse(aValue);
      const bDate = Date.parse(bValue);
      const aNum = isNaN(aDate) ? aValue : aDate;
      const bNum = isNaN(bDate) ? bValue : bDate;

      if (aNum < bNum) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aNum > bNum) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [sortConfig, trTd]);

  const columnCount = trTh?.props?.children?.length || 1;

  const headers = Children.map(trTh?.props?.children, (child) =>
    cloneElement(child, {
      onClick: () => handleSort(child.props.children),
      style: { cursor: "pointer" },
      className: sortConfig.key === child.props.children ? `sorted-${sortConfig.direction}` : "",
    })
  );

  return { sortedData, headers, columnCount };
}
