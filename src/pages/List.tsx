import React from 'react'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import { UserList } from '../types'

const QUERY = loader('../graphql/UserListQuery.gql')

const List = () => {
  const params = useParams<{ listId: string }>()
  const { data } = useQuery<{ userList: UserList }>(QUERY, { variables: { id: params.listId } })

  console.log(data)

  return (
    <div className="flex flex-col min-h-full items-center p-8">
      <h1>Your challenge list</h1>
      {data?.userList.movies.map(m => <div key={m.id}>{m.title}</div>)}
    </div>
  )
}

export default List
