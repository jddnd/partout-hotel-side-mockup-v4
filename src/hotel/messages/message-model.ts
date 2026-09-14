import { getCollaboration } from '../../data/mock/collaborations'
import { getCreator } from '../../data/mock/creators'
import { getRelationship, relationshipContexts } from '../../data/mock/relationships'
import { getResolvedHotelStay } from '../stays/stay-room-reference'
import type { ConversationContextView, ConversationListItem, HotelConversation } from './messages.types'

export function resolveConversationListItem(conversation: HotelConversation): ConversationListItem | undefined {
  const creator = getCreator(conversation.creatorId)
  const relationship = getRelationship(conversation.relationshipId)
  const context = relationshipContexts[conversation.relationshipId]

  if (!creator || !relationship || !context) return undefined

  return {
    id: conversation.id,
    creatorId: creator.id,
    creatorName: creator.name,
    initials: creator.initials,
    preview: conversation.preview,
    timestamp: conversation.timestamp,
    unread: conversation.unread,
    relationshipLabel: relationship.label,
    contextLabel: context.listContextLabel,
  }
}

export function resolveConversationContext(conversation: HotelConversation): ConversationContextView | undefined {
  const relationship = getRelationship(conversation.relationshipId)
  const context = relationshipContexts[conversation.relationshipId]
  const collaboration = context?.collaborationId ? getCollaboration(context.collaborationId) : undefined
  const stay = context?.stayId ? getResolvedHotelStay(context.stayId) : undefined

  if (!relationship || !context) return undefined

  return {
    relationshipLabel: relationship.label,
    relationshipDetail: relationship.detail,
    knownSince: relationship.knownSince,
    campaign: context.campaign,
    campaignId: context.campaignId,
    campaignDates: context.campaignDates,
    currentContext: context.currentContext,
    stayId: context.stayId,
    room: stay?.room ?? context.room,
    checkIn: context.checkIn,
    checkOut: context.checkOut,
    agreedContentCompleted: collaboration?.agreedContentCompleted,
    agreedContentTotal: collaboration?.agreedContentTotal,
    previousStays: relationship.previousStays,
  }
}
