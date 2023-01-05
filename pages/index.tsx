import React, { useState } from "react"

import type { NextPage } from "next"
// Fetch hooks
import { useFetchMovies } from "../api/fetchHooks"
// Components
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Grid from "../components/Grid/Grid"
import Card from "../components/Card/Card"
import Spinner from "../components/Spinner/Spinner"
// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config"

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query);
  console.log(data);
  const heroPageData = data?.pages[0].results[0];

  return (
    <main className="relative h-screen overflow-y-scroll">
      <Header setQuery={setQuery} />
      {!query && data && data.pages ? (
        <Hero
          imgUrl={heroPageData?.backdrop_path
            ? IMAGE_BASE_URL + BACKDROP_SIZE + heroPageData?.backdrop_path : '/no_image.jpg'}
          title={heroPageData?.title ? heroPageData.title : ''}
          text={heroPageData?.overview ? heroPageData.overview : ''
          }
        />
      ) : null}

      <Grid />
      <Card />
      <Spinner />
    </main>
  )
}

export default Home;
