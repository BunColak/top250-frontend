import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import { IMovie, IUserList } from '../types'
import Movie from '../components/Movie'
import { getListId, setListId } from '../services/storageService'
import Copyboard from '../components/Copyboard'
import Suggestion from '../components/Suggestion'

const QUERY = loader('../graphql/UserListQuery.gql')

const List = () => {
  const params = useParams<{ listId: string }>()
  const { data, refetch } = useQuery<{ userList: IUserList }>(QUERY, { variables: { id: params.listId } })
  const [onlyUnwatched, setOnlyUnwatched] = useState(false)
  const [suggestion, setSuggestion] = useState<IMovie | null>(null)
  const showSuggestion = Boolean(suggestion)

  useEffect(() => {
    if (!getListId()) {
      setListId(params.listId)
    }
  }, [])

  const getSuggestion = () => {
    if (data) {
      const unwatchedMovies = data.userList.movies.filter(m => !m.watched)
      const randomMovieIndex = Math.floor(Math.random() * unwatchedMovies.length)
      setSuggestion(unwatchedMovies[randomMovieIndex])
    }
  }

  return (
    <div className="flex flex-col min-h-full items-center p-4 w-full relative mx-auto lg:w-2/3">
      <h1 className="text-2xl font-bold">Your challenge list - {data?.userList.movies.filter(m => m.watched).length}/{data?.userList.movies.length}</h1>
      <Copyboard />
      <div className="mt-8 self-end flex">
        <button className="flex items-center button text-sm" onClick={getSuggestion}>
          Gimme Random
          </button>
        <button className={`flex items-center button text-sm ml-2 ${onlyUnwatched ? '' : 'disabled'}`} onClick={() => setOnlyUnwatched(r => !r)}>
          <i className="material-icons text-base leading-4 mr-2">{onlyUnwatched ? 'done' : 'close'}</i>Only Unwatched
          </button>
      </div>
      <div className="w-full">
        {data?.userList.movies.filter(m => onlyUnwatched ? !m.watched : true).map(m => <Movie key={m.id} movie={m} refetch={refetch} />)}
      </div>
      {showSuggestion && <Suggestion movie={suggestion} newSuggestion={getSuggestion} closeSuggestion={() => setSuggestion(null)} refetch={refetch} />}
    </div>
  )
}

export default List
