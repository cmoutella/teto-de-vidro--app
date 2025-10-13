'use client'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import cx from 'classnames'

import Button from '@/ui/components/base/Button'
import Input from '@/ui/components/base/form/inputs/Input'
import Icon from '@/ui/components/base/Icon'

const LoginView = () => {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const { login } = useSessionContext()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) return

    await login(email, password)
  }

  const changeUsernameValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setEmail(value)
  }
  const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setPassword(value)
  }

  const EyeButton = () => {
    const style = 'text-brand-gray-600'
    const eye = passwordVisible ? (
      <Icon icon="eye-slash" className={style} />
    ) : (
      <Icon icon="eye" className={style} />
    )

    return (
      <span
        className="cursor-pointer text-slate-600 hover:text-slate-700 leading-none"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {eye}
      </span>
    )
  }

  return (
    <div className="w-full h-full px-6 py-10 flex justify-center items-center">
      <div className="container">
        <div className="flex justify-center">
          <div className="px-6 py-8 pb-6 w-6/12 max-w-xl shadow-md shadow-white">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
              <Input
                label="E-mail"
                name="username"
                value={email ?? ''}
                onChange={changeUsernameValue}
                placeholder="Digite seu e-mail"
              />
              <Input
                name="password"
                label="Senha"
                onChange={changePasswordValue}
                value={password ?? ''}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Digite sua senha"
                iconButton={<EyeButton />}
              />
              <Button
                type="submit"
                className={cx(
                  'self-end',
                  'border border-1',
                  'border-brand-primary-400 bg-brand-primary-400 hover:border-brand-primary-300 hover:bg-brand-primary-500',
                  'text-white',
                  'disabled:text-brand-primary-400 disabled:bg-transparent disabled:border-brand-primary-300',
                  'font-medium'
                )}
                disabled={!password && !email}
                label="Entrar"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginView
