import React, {useState} from "react";
import {useTable, useFilters, useSortBy} from "react-table";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Table({columns, data}) {
  const [filterInputName, setFilterInputName] = useState("");
  const [filterInputPhoneNumber, setFilterInputPhoneNumber] = useState("");
  const [filterInputAge, setFilterInputAge] = useState("");
  const [filterInputCity, setFilterInputCity] = useState("");
  const [filterInputGender, setFilterInputGender] = useState("");
  const [filterInputOrigin, setFilterInputOrigin] = useState("");
  const [filterInputDate, setFilterInputDate] = useState("");
  const [filterInputLinkToProfile, setFilterInputLinkToProfile] = useState("");

  const filters = {
    name: [filterInputName, setFilterInputName],
    phone_number: [filterInputPhoneNumber, setFilterInputPhoneNumber],
    age: [filterInputAge, setFilterInputAge],
    city: [filterInputCity, setFilterInputCity],
    gender: [filterInputGender, setFilterInputGender],
    origin: [filterInputOrigin, setFilterInputOrigin],
    date: [filterInputDate, setFilterInputDate],
    link_to_profile: [filterInputLinkToProfile, setFilterInputLinkToProfile]
  };

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter(e.target.id, value);
    filters[e.target.id][1](value);
  };

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        style: {
          height: "200px"
        }
      }
    },
    useFilters,
    useSortBy
  );
  
  // Render the UI for your table
  return (
    <>
      <div>
        {columns.slice(1).map((item, idx) => (
          <input
            id={item["accessor"].toLowerCase()}
            key={idx}
            type={item["type"]}
            value={filters[item["accessor"].toLowerCase()][0]}
            onChange={handleFilterChange}
            placeholder={"Filter " + item["Header"]}
          />
        ))}

      <ExcelFile filename={"output_"+new Date().toLocaleDateString()} element={<button className="button">Export to Excel</button>}>
        <ExcelSheet data={rows.map(row => row.values)} name="Sheet1">
          <ExcelColumn label="Id" value='id' />
          <ExcelColumn label="Name" value='name' />
          <ExcelColumn label="Phone Number" value='phone_number' />
          <ExcelColumn label="Age" value='age' />
          <ExcelColumn label="City" value='city' />
          <ExcelColumn label="Gender" value='gender' />
          <ExcelColumn label="Origin" value='origin' />
          <ExcelColumn label="Date" value='date' />
          <ExcelColumn label="Link To Profile" value='link_to_profile' />
        </ExcelSheet>
      </ExcelFile>

      <p>Displaying {rows.length} records</p>
      </div>

      <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}
