import { useState, useCallback } from "react";

/**
 * Generic hook for filtering and searching data
 * @param {Array} data - The original data array
 * @param {Function} filterFn - Custom filter function (item, searchValue) => boolean
 * @returns {Object} - { filteredData, displayData, handleSearch, setFilteredData, handleSort }
 */
const useFilteredData = (data, filterFn) => {
  const [filteredData, setFilteredData] = useState(null);

  const displayData = filteredData || data;

  const handleSearch = useCallback(
    (e) => {
      const { value } = e.target;
      if (!value) {
        setFilteredData(null);
        return;
      }
      
      const filtered = data?.filter((item) => filterFn(item, value));
      setFilteredData(filtered);
    },
    [data, filterFn]
  );

  const handleSort = useCallback(
    (key, direction = "asc") => {
      const sorted = [...displayData].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredData(sorted);
    },
    [displayData]
  );

  return {
    filteredData,
    displayData,
    handleSearch,
    setFilteredData,
    handleSort,
  };
};

export default useFilteredData;
