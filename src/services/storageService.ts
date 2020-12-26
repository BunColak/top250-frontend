const LIST_ID = 'list-id'

export const setListId = (id: string) => localStorage.setItem(LIST_ID, id)

export const getListId = () => localStorage.getItem(LIST_ID)
