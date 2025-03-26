import "./table.css"

const Table = ({ trTh, trTd }) => {
  const columnCount = trTh?.props?.children?.length || 1;
  return (
    <section className="table__body">
      <table>
        <thead>{trTh}</thead>
        <tbody>
          {trTd && trTd.length > 0 ? (
            trTd
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
