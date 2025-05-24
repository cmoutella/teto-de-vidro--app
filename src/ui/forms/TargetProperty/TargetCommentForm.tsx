'use client'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import SubmitButton from '@ui/base/form/buttons/SubmitButton'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import cx from 'classnames'
import { useFormik } from 'formik'

import type { CommentTopic, InterfaceComment, TargetComment } from '@/types/comment'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import Input from '@/ui/components/base/form/inputs/Input'
import { RadioGroup } from '@/ui/components/base/form/RadioGroup'
import TextAreaInput from '@/ui/components/base/form/Textarea'

interface TargetCommentFormProps {
  onSuccess: (_h: Partial<TargetPropertyInterface>) => void
  onFail: () => void
  formTitle: string
  commentLabel?: string
  enableEmptyComment?: boolean
  currentComment?: InterfaceComment
  submit: (_d: TargetComment) => Promise<InterfaceComment | undefined>
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const topicOptions: { id: CommentTopic; label: string }[] = [
  { id: 'property', label: 'Imóvel' },
  { id: 'lot', label: 'Condomínio' },
  { id: 'surroundings', label: 'Redondezas' },
  { id: 'agency', label: 'Imobiliária' },
  { id: 'owner', label: 'Relação c/ proprietário' },
  { id: 'other', label: 'Outro' }
]

const TargetCommentForm = ({
  onSuccess,
  onFail,
  formTitle,
  commentLabel = 'Deixe um comentário',
  enableEmptyComment,
  currentComment,
  submit
}: TargetCommentFormProps) => {
  const [showTopics, setShowTopics] = useState(false)
  const [submitEnabled, setSubmitEnabled] = useState(true)

  const initiateTopic =
    currentComment?.topic && topicOptions.find((i) => currentComment.topic === i.id)
      ? currentComment.topic
      : topicOptions[0].id

  const initiateOther =
    currentComment?.topic && !topicOptions.find((i) => currentComment.topic === i.id)
      ? currentComment.topic
      : ''

  const formik = useFormik({
    initialValues: {
      comment: currentComment?.comment ?? '',
      topic: initiateTopic,
      otherTopic: initiateOther
    },
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  async function handleSubmit(values: { comment: string; topic: string; otherTopic: string }) {
    if (!formik.isValid || !user) return

    const { comment } = values

    const commentTopic = values.topic === 'other' ? values.otherTopic : values.topic

    const data: TargetComment = {
      comment: comment ?? undefined,
      topic: commentTopic,
      author: user.id,
      authorPrivacy: 'allowed'
    }

    const res = await submit(data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res)
  }

  async function handleCommentInput(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value

    await formik.setFieldValue('comment', value)

    if (value.length >= 5) {
      setShowTopics(true)
    }
  }

  useEffect(() => {
    const actionInProgress = !formik.isValid || formik.isSubmitting
    const comment =
      (enableEmptyComment && formik.values.comment === '') ||
      (formik.values.comment !== '' && showTopics)
    const hasTopic =
      formik.values.topic !== 'other' ||
      (formik.values.topic === 'other' && formik.values.otherTopic !== '')

    setSubmitEnabled(comment && hasTopic && !actionInProgress)
  }, [formik])

  return (
    <div className="w-full flex justify-center flex-col items-center p-2 pb-4 gap-3">
      <h4 className="text-2xl text-brand-primary-800 font-bold text-start w-full">{formTitle}</h4>
      <form onSubmit={formik.handleSubmit} className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
        <span className="col-span-12">
          <TextAreaInput
            label={commentLabel}
            name="comment"
            themeSize={formThemeSize}
            theme={themePallete}
            value={formik.values.comment}
            onChange={handleCommentInput}
          />
        </span>
        {showTopics && (
          <span className="col-span-12">
            <RadioGroup
              label="Meu comentário é sobre:"
              name="topic"
              options={topicOptions}
              current={topicOptions.find((i) => i.id === formik.values.topic) as never}
              manyColumns={true}
              onChange={async (value) => await formik.setFieldValue('topic', value.id)}
            />
          </span>
        )}
        {formik.values.topic === 'other' && (
          <span className="col-span-12">
            <Input
              label="Qual o principal assunto?"
              description="Dê um nome pro tópico do seu comentário"
              name="otherTopic"
              themeSize={formThemeSize}
              theme={themePallete}
              value={formik.values.otherTopic}
              onChange={formik.handleChange}
            />
          </span>
        )}

        <div className={cx('flex flex-col gap-2 col-span-12 justify-center items-center pt-5')}>
          <SubmitButton
            isDisabled={!submitEnabled}
            label={
              submitEnabled && formik.values.comment === '' ? 'Enviar sem comentário' : 'Enviar'
            }
            noWrap={true}
          />
        </div>
      </form>
    </div>
  )
}

export default TargetCommentForm
