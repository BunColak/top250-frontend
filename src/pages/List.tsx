import React from 'react'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import { IUserList } from '../types'
import Movie from '../components/Movie'

const QUERY = loader('../graphql/UserListQuery.gql')

const List = () => {
  const params = useParams<{ listId: string }>()
  const { data } = useQuery<{ userList: IUserList }>(QUERY, { variables: { id: params.listId } })

  return (
    <div className="flex flex-col min-h-full items-center p-4 w-full mx-auto lg:w-2/3">
      <h1 className="text-2xl font-bold">Your challenge list - {data?.userList.movies.filter(m => m.watched).length}/{data?.userList.movies.length}</h1>
      <div className="mt-8 w-full">
        {data?.userList.movies.map(m => <Movie key={m.id} movie={m} />)}
      </div>
    </div>
  )
}

export default List
