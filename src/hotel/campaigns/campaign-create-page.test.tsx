import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  canContinueCampaignCreate,
  isCampaignDraftValid,
} from './campaign-create-validation'
import type { MockCampaignDraft } from './campaign-mock-storage'

const validDraft: MockCampaignDraft = {
  name: 'Autumn Residency',
  description: 'A quiet stay by the sea.',
  startDate: '2099-09-20',
  endDate: '2099-09-22',
  spots: 3,
  exchange: 'Hosted stay',
  usageRights: 'Hotel organic channels · 12 months',
  reels: 1,
  stories: 3,
  posts: 0,
}

const originalTimezone = process.env.TZ

afterEach(() => {
  vi.useRealTimers()
  process.env.TZ = originalTimezone
})

describe('Campaign creation truth parity', () => {
  it('accepts the approved flow only when every creation gate is valid', () => {
    expect(canContinueCampaignCreate(0, validDraft, '2099-01-01')).toBe(true)
    expect(canContinueCampaignCreate(1, validDraft, '2099-01-01')).toBe(true)
    expect(canContinueCampaignCreate(2, validDraft, '2099-01-01')).toBe(true)
    expect(canContinueCampaignCreate(3, validDraft, '2099-01-01')).toBe(true)
    expect(canContinueCampaignCreate(4, validDraft, '2099-01-01')).toBe(true)
    expect(isCampaignDraftValid(validDraft, '2099-01-01')).toBe(true)
  })

  it('requires a valid stay window and at least one creator stay', () => {
    expect(canContinueCampaignCreate(1, { ...validDraft, startDate: '' }, '2099-01-01')).toBe(false)
    expect(canContinueCampaignCreate(1, { ...validDraft, endDate: '' }, '2099-01-01')).toBe(false)
    expect(
      canContinueCampaignCreate(
        1,
        { ...validDraft, startDate: '2099-09-20', endDate: '2099-09-18' },
        '2099-01-01',
      ),
    ).toBe(false)
    expect(
      canContinueCampaignCreate(
        1,
        { ...validDraft, startDate: '2098-12-20', endDate: '2098-12-22' },
        '2099-01-01',
      ),
    ).toBe(false)
    expect(canContinueCampaignCreate(1, { ...validDraft, spots: 0 }, '2099-01-01')).toBe(false)
  })

  it('uses the local calendar date for the default stay-window gate', () => {
    process.env.TZ = 'America/Los_Angeles'
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2099-01-02T07:30:00.000Z'))

    const endingTodayLocally = {
      ...validDraft,
      startDate: '2099-01-01',
      endDate: '2099-01-01',
    }

    expect(canContinueCampaignCreate(1, endingTodayLocally)).toBe(true)
    expect(isCampaignDraftValid(endingTodayLocally)).toBe(true)
  })

  it('requires explicit exchange, usage rights, and agreed content', () => {
    expect(canContinueCampaignCreate(2, { ...validDraft, exchange: '' }, '2099-01-01')).toBe(false)
    expect(canContinueCampaignCreate(2, { ...validDraft, usageRights: '' }, '2099-01-01')).toBe(false)
    expect(
      canContinueCampaignCreate(
        3,
        { ...validDraft, reels: 0, stories: 0, posts: 0 },
        '2099-01-01',
      ),
    ).toBe(false)
    expect(
      isCampaignDraftValid(
        { ...validDraft, name: '' },
        '2099-01-01',
      ),
    ).toBe(false)
  })
})
