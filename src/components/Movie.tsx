import React, { useState } from 'react'
import { loader } from 'graphql.macro'
import { IMovie } from '../types'
import { useMutation } from '@apollo/client'
import { getListId } from '../services/storageService'
import { useHistory } from 'react-router-dom'

const MUTATION = loader('../graphql/ToggleMovie.gql')

type Props = {
  movie: IMovie
  refetch: Function;
}

const Movie = ({ movie, refetch }: Props) => {
  const [toggleMovie, { loading }] = useMutation(MUTATION)
  const [optimisticWatched, setOptimisticWatched] = useState(movie.watched)
  const history = useHistory()

  const handleToggleMovie = async () => {
    const listId = getListId()
    if (!listId) {
      history.push('/')
    }
    try {
      setOptimisticWatched(r => !r)
      await toggleMovie({ variables: { listId, movieId: movie.id } })
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  const watched = loading ? optimisticWatched : movie.watched

  return (
    <div className={`flex items-center justify-between ${movie.watched ? 'bg-gray-400' : 'bg-gray-200'} text-black my-2 p-2 pl-4 rounded-sm shadow cursor-pointer hover:shadow-lg active:shadow-inner`}>
      <div className="flex flex-col items-baseline">
        <h5>{movie.title}</h5>
        <div className="flex font-semibold text-xs items-baseline">
          <p className="mt-1">{movie.imdbRating}/10</p>
          <a className="text-indigo-800 ml-1" href={movie.link} target="_blank" rel="noopener noreferrer">IMDB<i className="material-icons text-sm leading-4 align-middle ml-1">open_in_new</i></a>
        </div>
      </div>
      <div className="cursor-pointer p-2 py-3 rounded lg:hover:bg-red-300" onClick={handleToggleMovie}>
        <div className={`text-xs hidden lg:block ${loading ? 'text-gray-400 select-none' : ''}`}>
          {movie.watched ? 'Unwatch' : 'Mark As Watched'}
        </div>
        <div className={`flex items-center lg:hidden ml-4 ${loading ? 'text-gray-400 select-none' : ''}`}>
          {watched ? <i className="text-base material-icons">close</i> : <i className="text-base material-icons">done</i>}
        </div>
      </div>
    </div>
  )
}

export default Movie
