import HuntView from '@pages/hunt/oneHunt'
import { getHuntById } from '@requests/hunt/getById'
import { redirect } from 'next/navigation'

const HuntPage = async ({ params }: { params: { id: string } }) => {
  const hunt = await getHuntById(params.id)

  if (!hunt) {
    redirect('/')
  }

  return <HuntView hunt={hunt} />
}

export default HuntPage
