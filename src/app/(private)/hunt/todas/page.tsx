import { getAllHuntsByUser } from '@api/hunt/getAllHuntsByUser'
import { DEFAULT_HUNT_LIST_PER_PAGE } from '@pages/hunt/consts/perPage'
import ListHuntView from '@pages/hunt/list'
import { redirect } from 'next/navigation'

import { isUserAuthenticated } from '@/utils/auth/userAuthentication'

async function ListHuntsPage() {
  const userLoggedIn = await isUserAuthenticated()

  if (!userLoggedIn) {
    redirect('/login')
  }

  const response = await getAllHuntsByUser(userLoggedIn.id, 1, DEFAULT_HUNT_LIST_PER_PAGE)

  return <ListHuntView hunts={response ?? []} />
}

export default ListHuntsPage
