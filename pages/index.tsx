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
  const heroPageData = data?.pages[0].results[0];

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) fetchNextPage();
  }

  return (
    <main className="relative h-screen overflow-y-scroll" onScroll={handleScroll}>
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

      <Grid className="p-4 max-w-7xl m-auto" title={query ? `Search Results: ${data?.pages[0].total_results}` : 'Popular Movies'}>
        {data && data.pages ? data.pages.map((page) => page.results.map((movie) => (
          <div key={movie.id}>
            <Card
              imgUrl={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : '/no_image.jpg'}
              title={movie.title}
            />
          </div>
        ))) : null}
      </Grid>
      {isLoading || isFetching ? <Spinner /> : null}
    </main>
  )
}

export default Home;
