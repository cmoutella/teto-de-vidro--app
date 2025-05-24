import type { PropertyHuntingStage } from './targetProperty'

export type AuthorPrivacy = 'allowed' | 'denied'

export type CommentRelatedTo = 'lot' | 'property'

export type CommentTopic = CommentRelatedTo | 'surroundings' | 'owner' | 'agency' | string

export interface InterfaceComment {
  id: string
  comment: string
  topic: CommentTopic

  author: string
  authorPrivacy: AuthorPrivacy

  target?: {
    targetId: string
    stage: PropertyHuntingStage
  }

  updatedAt: string
  createdAt: string
}

export type TargetComment = Pick<InterfaceComment, 'comment' | 'topic' | 'author' | 'authorPrivacy'>
