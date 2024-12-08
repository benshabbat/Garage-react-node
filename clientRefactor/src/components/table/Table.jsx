const Table = ({ trTh, trTd }) => {
  return (
    <section className="table__body">
      <table>
        <thead>{trTh}</thead>
        <tbody>{trTd}</tbody>
      </table>
    </section>
  );
};

export default Table;
