import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/movieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "e5c7684";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:blue;
  font-size:45px;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 60px;
  fill: green;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  gap: 20px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.span`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;












function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();
  // const [search, setSearch] = useState("Harry Potter");
  useEffect(() => {
    fetchData("harry potter");
  }, []);

  // function getDetails() {
  //   var searchedMovie = document.getElementById('search').value
  //   setSearch(searchedMovie);
  //   document.getElementById('search').value = ''
  // };
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/logo.jpeg" />
          ABdeBeliever Prime
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-img.svg" />
          <SearchInput
            
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder href="http://www.omdbapi.com/?s={avengers}&apikey=e5c7684"/>
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
