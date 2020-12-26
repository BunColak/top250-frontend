import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const MUTATION = loader('../graphql/CreateUserListMutation.gql')

type Response = {
  createUserList: {
    id: string
  }
}

const Home = () => {
  const [createList] = useMutation<Response>(MUTATION)
  const history = useHistory()

  const handleListCreate = async () => {
    try {
      const response = await createList()
      if (response.data) {
        history.push(`/${response.data.createUserList.id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="p-4 flex flex-col min-h-screen items-center justify-center">
      <h1>Ready for a challenge?</h1>
      <button className="mt-4 py-2 px-4 bg-blue-600 rounded-sm shadow transition cursor-pointer hover:shadow-xl active:shadow-none" onClick={handleListCreate}>
        Create a list
      </button>
    </div>
  )
}

export default Home
