import { DEFAULT_HUNT_LIST_PER_PAGE } from '@pages/hunt/consts/perPage'
import ListHuntView from '@pages/hunt/list'
import { getAllHuntsByUser } from '@requests/hunt/getAllHuntsByUser'
import { redirect } from 'next/navigation'

import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

async function ListHuntsPage() {
  const userLoggedIn = await isUserAuthenticated({})

  if (!userLoggedIn || userLoggedIn === null) {
    redirect('/login')
    return <></>
  }

  const response = await getAllHuntsByUser(userLoggedIn.id, 1, DEFAULT_HUNT_LIST_PER_PAGE)

  return <ListHuntView hunts={response ?? []} />
}

export default ListHuntsPage
