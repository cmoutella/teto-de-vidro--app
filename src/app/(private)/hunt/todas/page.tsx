import { DEFAULT_HUNT_LIST_PER_PAGE } from '@pages/hunt/consts/perPage'
import ListHuntView from '@pages/hunt/list'
import { redirect } from 'next/navigation'

import { getAllHuntsByUser } from '@/requests/client/hunt/getAllHuntsByUser'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

async function ListHuntsPage() {
  const userLoggedIn = await isUserAuthenticated({})

  if (!userLoggedIn || userLoggedIn === null) {
    redirect('/login')
    return <></>
  }

  const response = await getAllHuntsByUser(userLoggedIn.id, 1, DEFAULT_HUNT_LIST_PER_PAGE)

  return <ListHuntView hunts={(response as never) ?? []} />
}

export default ListHuntsPage
