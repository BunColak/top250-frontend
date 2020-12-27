import React from 'react'
import { loader } from 'graphql.macro'
import { IMovie } from '../types'
import { useMutation } from '@apollo/client'
import { getListId } from '../services/storageService'
import { useHistory } from 'react-router-dom'

const MUTATION = loader('../graphql/ToggleMovie.gql')

type Props = {
  movie: IMovie | null
  closeSuggestion: () => void;
  newSuggestion: () => void
  refetch: () => void;
}

const Suggestion = ({ movie, newSuggestion, closeSuggestion, refetch }: Props) => {
  const [toggleMovie, { loading }] = useMutation(MUTATION)
  const history = useHistory()

  const handleWatched = async () => {
    const listId = getListId()
    if (!listId || !movie) {
      history.push('/')
    } else {
      try {
        await toggleMovie({ variables: { listId, movieId: movie.id } })
        refetch()
        closeSuggestion()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full text-black text-center">
      <div className="fixed top-0 left-0 bg-black opacity-60 w-full h-full" onClick={closeSuggestion} />
      <div className="fixed top-1/2 left-1/2 w-4/5 lg:w-1/3 lg:h-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-4 pt-8 flex flex-col items-center justify-center" >
        <button className="absolute top-2 right-2" onClick={closeSuggestion}><i className="material-icons">close</i></button>
        <h3 className="text-lg">Your lucky movie is....</h3>
        <h4 className="text-4xl font-semibold my-4 mt-2">{movie?.title}</h4>
        <a className="text-blue-800" href={movie?.link} target="_blank" rel="noopener noreferrer">Here is the IMDB link <i className="material-icons text-base leading-4 align-middle">open_in_new</i></a>
        <div className="text-white flex">
          <button className="button" onClick={newSuggestion}>Gimme Another</button>
          <button className={`button ml-4 secondary ${loading ? 'disabled select-none' : ''}`} onClick={handleWatched}>Mark as watched</button>
        </div>
      </div>
    </div>
  )
}

export default Suggestion
