import "./table.css";
import { Children, cloneElement, useState, useMemo } from "react";
import PropTypes from "prop-types";

const Table = ({ trTh, trTd }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !trTd) return trTd;

    return [...trTd].sort((a, b) => {
      const aValue = a.props.children.find(
        (child) => child.props["data-label"] === sortConfig.key
      )?.props.children;
      const bValue = b.props.children.find(
        (child) => child.props["data-label"] === sortConfig.key
      )?.props.children;

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [sortConfig, trTd]);

  const columnCount = trTh?.props?.children?.length || 1;

  const headers = Children.map(trTh?.props?.children, (child) =>
    cloneElement(child, {
      onClick: () => handleSort(child.props.children),
      style: { cursor: "pointer" },
      className:
        sortConfig.key === child.props.children
          ? `sorted-${sortConfig.direction}`
          : "",
    })
  );

  return (
    <section className="table__body">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {sortedData && sortedData.length > 0 ? (
            sortedData
          ) : (
            <tr>
              <td className="no-data-message" colSpan={columnCount}>
                No Data Right now
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

Table.propTypes = {
  trTh: PropTypes.element.isRequired,
  trTd: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Table;
