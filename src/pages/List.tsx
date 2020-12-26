import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import { IUserList } from '../types'
import Movie from '../components/Movie'
import { getListId, setListId } from '../services/storageService'

const QUERY = loader('../graphql/UserListQuery.gql')

const List = () => {
  const params = useParams<{ listId: string }>()
  const { data, refetch } = useQuery<{ userList: IUserList }>(QUERY, { variables: { id: params.listId } })

  useEffect(() => {
    if (!getListId()) {
      setListId(params.listId)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-full items-center p-4 w-full mx-auto lg:w-2/3">
      <h1 className="text-2xl font-bold">Your challenge list - {data?.userList.movies.filter(m => m.watched).length}/{data?.userList.movies.length}</h1>
      <div className="mt-8 w-full">
        {data?.userList.movies.map(m => <Movie key={m.id} movie={m} refetch={refetch} />)}
      </div>
    </div>
  )
}

export default List
