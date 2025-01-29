import { Children, cloneElement, useState } from "react";


//TODO:need to understand this code about sorting
const Table = ({ trTh, trTd }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key || !trTd) return trTd;

    return [...trTd].sort((a, b) => {
      const aValue = a.props.children.find(
        child => child.props['data-label'] === sortConfig.key
      )?.props.children;
      const bValue = b.props.children.find(
        child => child.props['data-label'] === sortConfig.key
      )?.props.children;

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  const columnCount = trTh?.props?.children?.length || 1;
  const sortedData = getSortedData();

  // Add click handlers to table headers
  const headers = Children.map(trTh?.props?.children, (child) => {
    return cloneElement(child, {
      onClick: () => handleSort(child.props.children),
      style: { cursor: 'pointer' },
      className: sortConfig.key === child.props.children ? 
        `sorted-${sortConfig.direction}` : ''
    });
  });

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
              <td className="no-data-message" colSpan={columnCount}>No Data Right now</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Table;