import {useState, useEffect} from 'react';
import { localData } from '../system/localData';
export const Search = (props) => {
  const {
    changeCity
  } = props;
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const changeValue = (e) => {
    let value = e.target.value;
    setSearch(value);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchWord(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!searchWord){
      setSearchResult([]);
      return () => {};
    }
    const searchResult = localData.filter((item) => {
      return item.toLowerCase().includes(
        searchWord.toLowerCase()
      );
    });
    setSearchResult(searchResult);
  }, [searchWord]);
  
  return (
    <div className="App-search">
      <input 
        type="text" 
        placeholder="Search"
        value={search}
        onChange={changeValue}
      />
      {searchResult.length > 0 ?
        <div className="App-search__result">
          {searchResult.map((item, index) => {
            let itemArr = item.split('\t');
            // console.log(item.split('\t'));
            return (
              <p key={index}
                onClick={() => {
                  changeCity(itemArr[0]);
                  setSearch('');
                }}
              >
                <span><span>City</span> {itemArr[0]}</span>
                <span><span>Lon</span> {itemArr[1]}</span>
                <span><span>Lat</span> {itemArr[2]}</span>
                <span><span>Country</span> {itemArr[3]}</span>
              </p>
            )
          })}
        </div>
        : null
      }
    </div>
  )
}