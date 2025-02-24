import type { Gender } from '@/types/app'

export const genderVowel: { [_key in Gender]: string } = {
  female: 'a',
  male: 'o',
  neutral: 'e'
}
