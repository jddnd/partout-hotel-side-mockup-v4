import { Image as ImageIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../../components/ui/button'
import {
  getMockSettingsProfile,
  saveMockSettingsProfile,
  type MockSettingsProfile,
} from './settings-mock-storage'
import { SettingsDetailHeader } from './settings-detail-header'

const fieldClass =
  'mt-1.5 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors focus:border-partout-action'

type ProfileDraft = MockSettingsProfile & Readonly<{
  heroPreviewUrl: string | null
  logoPreviewUrl: string | null
}>

function initialDraft(): ProfileDraft {
  return {
    ...getMockSettingsProfile(),
    heroPreviewUrl: null,
    logoPreviewUrl: null,
  }
}

function profileIsDirty(draft: ProfileDraft, baseline: ProfileDraft) {
  return (
    draft.name !== baseline.name ||
    draft.location !== baseline.location ||
    draft.description !== baseline.description ||
    draft.heroPresent !== baseline.heroPresent ||
    draft.logoPresent !== baseline.logoPresent ||
    draft.heroPreviewUrl !== baseline.heroPreviewUrl ||
    draft.logoPreviewUrl !== baseline.logoPreviewUrl
  )
}

function persistableProfile(draft: ProfileDraft): MockSettingsProfile {
  return {
    name: draft.name,
    location: draft.location,
    description: draft.description,
    heroPresent: draft.heroPresent,
    logoPresent: draft.logoPresent,
  }
}

export function ProfileSettingsPage() {
  const [baseline, setBaseline] = useState<ProfileDraft>(() => initialDraft())
  const [draft, setDraft] = useState<ProfileDraft>(() => initialDraft())
  const heroInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const dirty = profileIsDirty(draft, baseline)

  function stageImage(kind: 'hero' | 'logo', file: File | null) {
    if (!file) return
    const previewUrl = typeof URL.createObjectURL === 'function' ? URL.createObjectURL(file) : null
    const presentKey = kind === 'hero' ? 'heroPresent' : 'logoPresent'
    const previewKey = kind === 'hero' ? 'heroPreviewUrl' : 'logoPreviewUrl'

    setDraft((current) => {
      const previousUrl = current[previewKey]
      if (previousUrl && typeof URL.revokeObjectURL === 'function') URL.revokeObjectURL(previousUrl)
      return { ...current, [presentKey]: true, [previewKey]: previewUrl }
    })
  }

  function removeImage(kind: 'hero' | 'logo') {
    const presentKey = kind === 'hero' ? 'heroPresent' : 'logoPresent'
    const previewKey = kind === 'hero' ? 'heroPreviewUrl' : 'logoPreviewUrl'
    setDraft((current) => {
      const previousUrl = current[previewKey]
      if (previousUrl && typeof URL.revokeObjectURL === 'function') URL.revokeObjectURL(previousUrl)
      return { ...current, [presentKey]: false, [previewKey]: null }
    })
  }

  function handleCancel() {
    if (draft.heroPreviewUrl && draft.heroPreviewUrl !== baseline.heroPreviewUrl && typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(draft.heroPreviewUrl)
    }
    if (draft.logoPreviewUrl && draft.logoPreviewUrl !== baseline.logoPreviewUrl && typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(draft.logoPreviewUrl)
    }
    setDraft(baseline)
  }

  function handleSave() {
    saveMockSettingsProfile(persistableProfile(draft))
    setBaseline(draft)
  }

  return (
    <div>
      <SettingsDetailHeader
        title="Hotel profile"
        subtitle="Edit the hotel identity and imagery creators see across Partout."
      />

      <div className="mt-7 grid items-start gap-4 xl:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)]">
        <section
          aria-labelledby="creator-preview-title"
          className="overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card"
        >
          <div className="flex min-h-[52px] items-center gap-1.5 border-b border-partout-border px-5 py-3 text-[8px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">
            <ImageIcon aria-hidden="true" size={11} strokeWidth={1.6} />
            <h2 id="creator-preview-title">Creator preview</h2>
          </div>

          {draft.heroPresent ? (
            <div
              className="hotel-cover-placeholder relative aspect-[16/8] bg-cover bg-center"
              style={draft.heroPreviewUrl ? { backgroundImage: `url(${draft.heroPreviewUrl})` } : undefined}
            >
              {draft.logoPresent ? (
                <PreviewLogo name={draft.name} previewUrl={draft.logoPreviewUrl} floating />
              ) : null}
            </div>
          ) : null}

          <div className="p-5 pt-4">
            {!draft.heroPresent && draft.logoPresent ? (
              <PreviewLogo name={draft.name} previewUrl={draft.logoPreviewUrl} />
            ) : null}
            <h3 className={`${!draft.heroPresent && draft.logoPresent ? 'mt-3 ' : ''}font-display text-[24px] font-normal leading-none tracking-[-0.02em] text-partout-text`}>
              {draft.name || 'Hotel name'}
            </h3>
            <p className="mt-2 text-[8px] text-partout-text-muted">{draft.location || 'Location'}</p>
            <p className="mt-4 max-w-[540px] text-[9px] leading-[1.65] text-partout-text-muted">
              {draft.description || 'Add a short description creators will see when they look at your hotel.'}
            </p>
          </div>
        </section>

        <form
          className="overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card"
          aria-label="Hotel profile fields"
          onSubmit={(event) => {
            event.preventDefault()
            handleSave()
          }}
        >
          <div className="flex min-h-[52px] flex-col justify-center px-5 py-3">
            <h2 className="text-[10px] font-medium text-partout-text">Profile details</h2>
            <p className="mt-1 text-[7px] text-partout-text-muted">These fields mirror the current Hotel profile capability.</p>
          </div>

          <ImageSettingRow
            label="Hero"
            present={draft.heroPresent}
            previewUrl={draft.heroPreviewUrl}
            round={false}
            inputRef={heroInputRef}
            onChoose={() => heroInputRef.current?.click()}
            onRemove={() => removeImage('hero')}
            onFile={(file) => stageImage('hero', file)}
          />
          <ImageSettingRow
            label="Logo"
            present={draft.logoPresent}
            previewUrl={draft.logoPreviewUrl}
            round
            inputRef={logoInputRef}
            onChoose={() => logoInputRef.current?.click()}
            onRemove={() => removeImage('logo')}
            onFile={(file) => stageImage('logo', file)}
          />

          <div className="border-t border-partout-border px-5 py-3">
            <label htmlFor="hotel-profile-name" className="text-[8px] font-medium text-partout-text-muted">Name</label>
            <input
              id="hotel-profile-name"
              className={`${fieldClass} h-8`}
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
            />
          </div>

          <div className="border-t border-partout-border px-5 py-3">
            <label htmlFor="hotel-profile-location" className="text-[8px] font-medium text-partout-text-muted">Location</label>
            <input
              id="hotel-profile-location"
              className={`${fieldClass} h-8`}
              value={draft.location}
              onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))}
            />
          </div>

          <div className="border-t border-partout-border px-5 py-3">
            <label htmlFor="hotel-profile-description" className="text-[8px] font-medium text-partout-text-muted">Description</label>
            <textarea
              id="hotel-profile-description"
              className={`${fieldClass} min-h-[60px] resize-none py-2 leading-[1.5]`}
              value={draft.description}
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            />
          </div>

          {dirty ? (
            <div className="flex items-center justify-between gap-4 border-t border-partout-border px-5 py-3">
              <span className="text-[7px] text-partout-text-muted">Unsaved changes</span>
              <div className="flex items-center gap-2">
                <Button type="button" variant="quiet" className="h-8 px-3 text-[8px]" onClick={handleCancel}>Cancel</Button>
                <Button type="submit" className="h-8 px-4 text-[8px]">Save changes</Button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}

function PreviewLogo({ name, previewUrl, floating = false }: Readonly<{ name: string; previewUrl: string | null; floating?: boolean }>) {
  return (
    <div
      className={`${floating ? 'absolute bottom-4 left-5 ' : ''}grid size-12 place-items-center overflow-hidden rounded-full border-[3px] border-white bg-partout-forest text-[15px] font-medium text-white shadow-card`}
      aria-label="Hotel logo preview"
    >
      {previewUrl ? <img src={previewUrl} alt="" className="size-full object-cover" /> : (name.trim().charAt(0).toUpperCase() || 'H')}
    </div>
  )
}

function ImageSettingRow({
  label,
  present,
  previewUrl,
  round,
  inputRef,
  onChoose,
  onRemove,
  onFile,
}: Readonly<{
  label: string
  present: boolean
  previewUrl: string | null
  round: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  onChoose: () => void
  onRemove: () => void
  onFile: (file: File | null) => void
}>) {
  return (
    <div className="flex min-h-[64px] items-center justify-between gap-4 border-t border-partout-border px-5 py-3">
      <div>
        <p className="text-[8px] font-medium text-partout-text-muted">{label}</p>
        <div className="mt-1.5 flex items-center gap-2.5">
          {present ? (
            <span
              className={`hotel-cover-placeholder block size-8 shrink-0 overflow-hidden border border-partout-border bg-cover bg-center ${round ? 'rounded-full' : 'rounded-control'}`}
              style={previewUrl ? { backgroundImage: `url(${previewUrl})` } : undefined}
            />
          ) : (
            <span className={`grid size-8 shrink-0 place-items-center border border-dashed border-partout-border text-partout-text-muted ${round ? 'rounded-full' : 'rounded-control'}`}>
              <ImageIcon aria-hidden="true" size={12} strokeWidth={1.5} />
            </span>
          )}
          <span className="text-[8px] text-partout-text">{present ? 'Added' : 'Not added'}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[8px]">
        <button type="button" className="font-medium text-partout-action hover:text-partout-action-hover" onClick={onChoose}>
          {present ? 'Replace' : 'Add'}
        </button>
        {present ? (
          <button type="button" className="text-partout-text-muted hover:text-partout-text" onClick={onRemove}>Remove</button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-label={`${label} image file`}
          onChange={(event) => {
            onFile(event.target.files?.[0] ?? null)
            event.target.value = ''
          }}
        />
      </div>
    </div>
  )
}
