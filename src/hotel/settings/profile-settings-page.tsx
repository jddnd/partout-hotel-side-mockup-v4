import { Image as ImageIcon } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { settingsProperty } from '../../data/mock/settings'
import { SettingsDetailHeader } from './settings-detail-header'

const fieldClass =
  'mt-1.5 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors focus:border-partout-action'

export function ProfileSettingsPage() {
  return (
    <div>
      <SettingsDetailHeader
        title="Hotel profile"
        subtitle="Edit the hotel identity and imagery creators see across Partout."
      />

      <div className="mt-7 grid gap-4 xl:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)]">
        <section aria-labelledby="creator-preview-title">
          <div className="mb-2 flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">
            <ImageIcon aria-hidden="true" size={11} strokeWidth={1.6} />
            <h2 id="creator-preview-title">Creator preview</h2>
          </div>

          <div className="overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
            <div className="hotel-cover-placeholder relative aspect-[16/8]">
              <div className="absolute bottom-4 left-5 grid size-12 place-items-center rounded-full border-[3px] border-white bg-partout-forest text-[15px] font-medium text-white shadow-card">
                M
              </div>
            </div>
            <div className="p-5 pt-4">
              <h3 className="font-display text-[24px] font-normal leading-none tracking-[-0.02em] text-partout-text">
                {settingsProperty.name}
              </h3>
              <p className="mt-2 text-[8px] text-partout-text-muted">{settingsProperty.location}</p>
              <p className="mt-4 max-w-[540px] text-[9px] leading-[1.65] text-partout-text-muted">
                {settingsProperty.description}
              </p>
            </div>
          </div>
        </section>

        <form
          className="overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card"
          aria-label="Hotel profile fields"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="px-5 py-4">
            <h2 className="text-[10px] font-medium text-partout-text">Profile details</h2>
            <p className="mt-1 text-[7px] text-partout-text-muted">These fields mirror the current Hotel profile capability.</p>
          </div>

          <ImageSettingRow label="Hero" status={settingsProperty.heroStatus} round={false} />
          <ImageSettingRow label="Logo" status={settingsProperty.logoStatus} round />

          <div className="border-t border-partout-border px-5 py-4">
            <label htmlFor="hotel-profile-name" className="text-[8px] font-medium text-partout-text-muted">Name</label>
            <input id="hotel-profile-name" className={`${fieldClass} h-9`} defaultValue={settingsProperty.name} />
          </div>

          <div className="border-t border-partout-border px-5 py-4">
            <label htmlFor="hotel-profile-location" className="text-[8px] font-medium text-partout-text-muted">Location</label>
            <input id="hotel-profile-location" className={`${fieldClass} h-9`} defaultValue={settingsProperty.location} />
          </div>

          <div className="border-t border-partout-border px-5 py-4">
            <label htmlFor="hotel-profile-description" className="text-[8px] font-medium text-partout-text-muted">Description</label>
            <textarea
              id="hotel-profile-description"
              className={`${fieldClass} min-h-[84px] resize-none py-2.5 leading-[1.55]`}
              defaultValue={settingsProperty.description}
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-partout-border px-5 py-4">
            <span className="text-[7px] text-partout-text-muted">Unsaved changes</span>
            <div className="flex items-center gap-2">
              <Button variant="quiet" className="h-8 px-3 text-[8px]">Cancel</Button>
              <Button type="submit" className="h-8 px-4 text-[8px]">Save changes</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function ImageSettingRow({ label, status, round }: Readonly<{ label: string; status: string; round: boolean }>) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-partout-border px-5 py-4">
      <div>
        <p className="text-[8px] font-medium text-partout-text-muted">{label}</p>
        <div className="mt-2 flex items-center gap-2.5">
          <span className={`hotel-cover-placeholder block size-9 shrink-0 border border-partout-border ${round ? 'rounded-full' : 'rounded-control'}`} />
          <span className="text-[8px] text-partout-text">{status}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[8px]">
        <button type="button" className="font-medium text-partout-action hover:text-partout-action-hover">Replace</button>
        <button type="button" className="text-partout-text-muted hover:text-partout-text">Remove</button>
      </div>
    </div>
  )
}
