import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log(event.target.value)

    if (searchWord === "") {
      setFilteredData([]);
    } else {
        const newFilter = axios.get('https://www.balldontlie.io/api/v1/players', {
            params: {
                per_page: 5,
                search: searchWord
            }
          })
      .then(function (response) {
        setFilteredData(response.data.data);
        console.log(response.data.data);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
    }

  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {(filteredData.length !== 0 && !loading) && (
        <div className="dataResult">
          {filteredData?.map((value, key) => {
            return (
                <a className="dataItem" onclick="clearInput()">
                    <p>{value.first_name} {value.last_name}</p>
                </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;