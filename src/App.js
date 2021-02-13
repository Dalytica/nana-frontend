import React, {useMemo, useState, useEffect} from "react";
import axios from "axios";

import Table from "./Table";
import "./App.css";

const Gender = ({values}) => {
  return (
    <>
      {values.split(",").map((gender, idx) => {
        if (values) {
          return (
            <span key={idx} className="badge">
              {gender}
            </span>
          );
        } else {
          return;
        }
      })}
    </>
  );
};

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name",
        type: "text"
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
        type: "text"
      },
      {
        Header: "Age",
        accessor: "age",
        type: "text"
      },
      {
        Header: "City",
        accessor: "city",
        type: "text"
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: ({cell: {value}}) => <Gender values={value} />,
        type: "text"
      },
      {
        Header: "Origin",
        accessor: "origin",
        type: "text"
      },
      {
        Header: "Date",
        accessor: "date",
        type: "text"
      },
      {
        Header: "Profile Link",
        accessor: "link_to_profile",
        Cell: ({cell: {value}}) => {
          return <a href={value}>{value}</a>;
        },
        type: "text"
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        "https://nana-scraper.dalytica.com/python/",
        {
          auth: {
            username: "***",
            password: "***"
          }
        }
      );
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
