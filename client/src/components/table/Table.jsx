import React from "react";

const Table = (search=null, name, trTh, trTd=null) => {
  return (
    <div className="table-container">
      <section className="table__header">
        <h1>{name}</h1>
        <div className="input-group">
          <input type="search" placeholder="Search Data..." onChange={search} />
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>{trTh}</thead>
          <tbody>{trTd}</tbody>
        </table>
      </section>
    </div>
  );
};

export default Table;
