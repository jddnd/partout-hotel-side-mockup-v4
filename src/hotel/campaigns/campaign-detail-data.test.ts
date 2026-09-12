import { describe, expect, it } from 'vitest'
import { campaignDetails } from '../../data/mock/campaign-details'
import { campaigns } from '../../data/mock/campaigns'

describe('campaign detail mock coverage', () => {
  it('provides a detail record for every static campaign row', () => {
    for (const campaign of campaigns) {
      expect(campaignDetails[campaign.id], `${campaign.name} is missing campaign detail data`).toBeDefined()
    }
  })
})
