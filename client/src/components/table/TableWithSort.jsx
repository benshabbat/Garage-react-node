import "./table.css";
import PropTypes from "prop-types";
import { useTableWithSort } from "./hooks/useTableWithSort";

const Table = ({ trTh, trTd }) => {
  const { sortedData, headers, columnCount } = useTableWithSort(trTh, trTd);

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
