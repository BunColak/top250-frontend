import React, { useEffect } from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { getListId, setListId } from '../services/storageService'

const MUTATION = loader('../graphql/CreateUserListMutation.gql')

type Response = {
  createUserList: {
    id: string
  }
}

const Home = () => {
  const [createList] = useMutation<Response>(MUTATION)
  const history = useHistory()

  useEffect(() => {
    const listId = getListId()
    if (listId) {
      history.push(`/${listId}`)
    }
  }, [])

  const handleListCreate = async () => {
    try {
      const response = await createList()
      if (response.data) {
        setListId(response.data.createUserList.id)
        history.push(`/${response.data.createUserList.id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="p-4 flex flex-col min-h-screen items-center justify-center">
      <h1>Ready for a challenge?</h1>
      <button className="button" onClick={handleListCreate}>
        Create a list
      </button>
    </div>
  )
}

export default Home
