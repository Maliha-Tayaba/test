import React from "react";
import SearchTable from "../components/search-table";
import SearchAutocomplete from "../components/search-autocomplete";
import { getAmadeusData } from "../service/amadeus.api";
import axios from "axios"
import SearchCheckboxes from "../components/search-checkboxes";

const SearchRoot = () => {


  const [search, setSearch] = React.useState({
    keyword: "a",
    city: true,
    airport: true,
    page: 0
  });

  const [dataSource, setDataSource] = React.useState({
    meta: { count: 0 },
    data: []
  });

  const [loading, setLoading] = React.useState(false)


  React.useEffect(() => {
    
    setLoading(true)

    const { out, source } = getAmadeusData(search);

    out.then(res => {
      if (!res.data.code) {
        setDataSource(res.data); 
      }
      setLoading(false)
    }).catch(err => {
      axios.isCancel(err);
      setLoading(false)
    });

    return () => {
      source.cancel()
    };
  }, [search]);

  return (
    <div className="container">
      <div className="search-panel">
        <SearchAutocomplete search={search} setSearch={setSearch} />
        <SearchCheckboxes search={search} setSearch={setSearch} />
      </div>
      <SearchTable dataSource={dataSource} search={search} setSearch={setSearch} loading={loading} />
    </div>
  );
};

export default SearchRoot;
