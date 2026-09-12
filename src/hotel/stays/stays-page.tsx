import { stays } from '../../data/mock/stays'
import { StayContextPanel } from './stay-context-panel'
import { StaysHeader } from './stays-header'
import { StaysList } from './stays-list'
import { StaysTabs } from './stays-tabs'

export function StaysPage() {
  const selectedStay = stays[0]

  return (
    <div>
      <StaysHeader />
      <StaysTabs />

      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
        <StaysList stays={stays} selectedId={selectedStay.id} />
        <StayContextPanel stay={selectedStay} />
      </div>
    </div>
  )
}
