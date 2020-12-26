import React from 'react'
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
  const [toggleMovie] = useMutation(MUTATION)
  const history = useHistory()

  const handleToggleMovie = async () => {
    const listId = getListId()
    if (!listId) {
      history.push('/')
    }
    try {
      await toggleMovie({ variables: { listId, movieId: movie.id } })
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  return (
        <div className={`flex items-center justify-between ${movie.watched ? 'bg-gray-400' : 'bg-gray-200'} text-black my-2 p-2 pl-4 rounded-sm shadow cursor-pointer hover:shadow-lg active:shadow-inner`}>
            <div className="flex items-baseline">
                <p className="font-semibold text-sm">{movie.imdbRating}</p>
                <h5 className="ml-1">- {movie.title}</h5>
            </div>
            <div className="cursor-pointer p-2 py-3 rounded hover:bg-red-300" onClick={handleToggleMovie}>
                <div className="text-xs hidden lg:block">
                    {movie.watched ? 'Unwatch' : 'Mark As Watched'}
                </div>
                <div className="flex items-center lg:hidden ml-4">
                    {movie.watched ? <i className="text-base material-icons">close</i> : <i className="text-base material-icons">done</i>}
                </div>
            </div>
        </div>
  )
}

export default Movie
