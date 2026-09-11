import { useState } from 'react'
import { ArrowLeft, Check, X } from 'lucide-react'
import { Button } from '../../components/ui/button'

const steps = ['Basics', 'Stay slots', 'Terms', 'Agreed content', 'Review'] as const

type ContentKey = 'reels' | 'stories' | 'posts'

type FormState = Readonly<{
  name: string
  description: string
  startDate: string
  endDate: string
  spots: number
  exchange: string
  usageRights: string
  reels: number
  stories: number
  posts: number
}>

const initialForm: FormState = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  spots: 3,
  exchange: 'Hosted stay',
  usageRights: 'Hotel organic channels · 12 months',
  reels: 1,
  stories: 3,
  posts: 0,
}

export function CampaignCreateDrawer({ onClose }: Readonly<{ onClose: () => void }>) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [finished, setFinished] = useState(false)

  const canContinue = step === 0 ? form.name.trim().length > 0 : true

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      <button
        type="button"
        aria-label="Close campaign creation"
        className="absolute inset-0 bg-partout-text/35"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-campaign-title"
        className="relative flex h-full w-full max-w-[560px] flex-col border-l border-partout-border bg-partout-surface shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-partout-border px-6 py-5">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Campaigns</p>
            <h2 id="new-campaign-title" className="mt-1 font-display text-[24px] font-normal tracking-[-0.025em] text-partout-text">
              New campaign
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-control text-partout-text-muted hover:bg-partout-muted hover:text-partout-text"
          >
            <X aria-hidden="true" size={14} strokeWidth={1.7} />
          </button>
        </header>

        {!finished ? (
          <>
            <div className="border-b border-partout-border px-6 py-3">
              <div className="grid grid-cols-5 gap-1.5" aria-label="Campaign creation progress">
                {steps.map((label, index) => (
                  <div key={label}>
                    <div className={`h-0.5 rounded-full ${index <= step ? 'bg-partout-action' : 'bg-partout-muted'}`} />
                    <p className={`mt-1.5 truncate text-[6px] font-medium ${index === step ? 'text-partout-text' : 'text-partout-text-muted'}`}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">{steps[step]}</p>
              {step === 0 ? <BasicsStep form={form} update={update} /> : null}
              {step === 1 ? <StayStep form={form} update={update} /> : null}
              {step === 2 ? <TermsStep form={form} update={update} /> : null}
              {step === 3 ? <ContentStep form={form} update={update} /> : null}
              {step === 4 ? <ReviewStep form={form} /> : null}
            </div>

            <footer className="flex items-center justify-between border-t border-partout-border px-6 py-4">
              <div>
                {step > 0 ? (
                  <Button variant="quiet" onClick={() => setStep((value) => value - 1)} className="h-8 gap-1.5 px-2.5 text-[8px]">
                    <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.7} />
                    Back
                  </Button>
                ) : null}
              </div>

              {step < steps.length - 1 ? (
                <Button disabled={!canContinue} onClick={() => setStep((value) => value + 1)} className="h-8 min-w-[94px] px-4 text-[8px]">
                  Continue
                </Button>
              ) : (
                <Button onClick={() => setFinished(true)} className="h-8 min-w-[112px] px-4 text-[8px]">
                  Publish campaign
                </Button>
              )}
            </footer>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-10 place-items-center rounded-full bg-partout-success-soft text-partout-success-text">
              <Check aria-hidden="true" size={18} strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 font-display text-[26px] font-normal tracking-[-0.025em] text-partout-text">Campaign flow complete</h3>
            <p className="mt-2 max-w-[320px] text-[9px] leading-4 text-partout-text-muted">
              This demonstrates the existing Partout campaign creation journey. The mockup does not save or publish production data.
            </p>
            <Button onClick={onClose} className="mt-5 h-8 min-w-[100px] px-4 text-[8px]">Done</Button>
          </div>
        )}
      </aside>
    </div>
  )
}

function BasicsStep({ form, update }: StepProps) {
  return (
    <div className="mt-5 space-y-4">
      <Field label="Campaign name">
        <input
          autoFocus
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="Coastal Autumn"
          className={inputClass}
        />
      </Field>
      <Field label="Short description">
        <textarea
          value={form.description}
          onChange={(event) => update('description', event.target.value)}
          placeholder="What makes this creator stay relevant now?"
          rows={5}
          className={`${inputClass} min-h-[112px] resize-none py-3`}
        />
      </Field>
    </div>
  )
}

function StayStep({ form, update }: StepProps) {
  return (
    <div className="mt-5 space-y-4">
      <p className="max-w-[420px] text-[9px] leading-4 text-partout-text-muted">
        Define the first stay window creators can request. Additional windows can be managed from the campaign after it is created.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Arrival">
          <input type="date" value={form.startDate} onChange={(event) => update('startDate', event.target.value)} className={inputClass} />
        </Field>
        <Field label="Departure">
          <input type="date" value={form.endDate} onChange={(event) => update('endDate', event.target.value)} className={inputClass} />
        </Field>
      </div>
      <Field label="Creator spots">
        <input
          type="number"
          min={1}
          max={20}
          value={form.spots}
          onChange={(event) => update('spots', Number(event.target.value) || 1)}
          className={`${inputClass} max-w-[150px]`}
        />
      </Field>
    </div>
  )
}

function TermsStep({ form, update }: StepProps) {
  return (
    <div className="mt-5 space-y-4">
      <Field label="Exchange">
        <select value={form.exchange} onChange={(event) => update('exchange', event.target.value)} className={inputClass}>
          <option>Hosted stay</option>
          <option>Hosted stay + fee</option>
          <option>Paid collaboration</option>
        </select>
      </Field>
      <Field label="Usage rights">
        <select value={form.usageRights} onChange={(event) => update('usageRights', event.target.value)} className={inputClass}>
          <option>Hotel organic channels · 12 months</option>
          <option>Hotel organic channels · 6 months</option>
          <option>Organic + paid social · 12 months</option>
        </select>
      </Field>
      <p className="text-[8px] leading-4 text-partout-text-muted">
        The real Partout flow preserves compensation and usage-rights terms as part of the campaign agreement.
      </p>
    </div>
  )
}

function ContentStep({ form, update }: StepProps) {
  return (
    <div className="mt-5">
      <p className="max-w-[420px] text-[9px] leading-4 text-partout-text-muted">
        Set the content you expect from each approved creator. This is an agreement, not a content approval queue.
      </p>
      <div className="mt-5 divide-y divide-partout-border border-y border-partout-border">
        <ContentCount label="Reels" value={form.reels} onChange={(value) => update('reels', value)} />
        <ContentCount label="Stories" value={form.stories} onChange={(value) => update('stories', value)} />
        <ContentCount label="Posts" value={form.posts} onChange={(value) => update('posts', value)} />
      </div>
    </div>
  )
}

function ReviewStep({ form }: Readonly<{ form: FormState }>) {
  return (
    <div className="mt-5 space-y-5">
      <div>
        <h3 className="font-display text-[25px] font-normal tracking-[-0.025em] text-partout-text">{form.name || 'Untitled campaign'}</h3>
        <p className="mt-1.5 text-[9px] leading-4 text-partout-text-muted">{form.description || 'No description added.'}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewCard label="Stay window" value={formatWindow(form.startDate, form.endDate)} detail={`${form.spots} creator spots`} />
        <ReviewCard label="Exchange" value={form.exchange} detail={form.usageRights} />
      </div>

      <section className="rounded-card border border-partout-border bg-partout-canvas/60 p-4">
        <p className="text-[7px] font-medium uppercase tracking-[0.15em] text-partout-text-muted">Agreed content per creator</p>
        <p className="mt-2 text-[10px] text-partout-text">{formatContent(form)}</p>
      </section>

      <p className="text-[8px] leading-4 text-partout-text-muted">
        In the real product, publishing makes the campaign available according to its stay windows, capacity and application rules. This mockup stops at the interaction proof and saves nothing.
      </p>
    </div>
  )
}

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[8px] font-medium text-partout-text">{label}</span>
      {children}
    </label>
  )
}

function ContentCount({ label, value, onChange }: Readonly<{ label: string; value: number; onChange: (value: number) => void }>) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-[9px] font-medium text-partout-text">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="grid size-7 place-items-center rounded-control border border-partout-border bg-partout-surface text-[12px] text-partout-text-muted hover:bg-partout-muted"
          aria-label={`Remove one ${label.toLowerCase()}`}
        >
          −
        </button>
        <span className="w-5 text-center text-[9px] font-medium tabular-nums text-partout-text">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="grid size-7 place-items-center rounded-control border border-partout-border bg-partout-surface text-[12px] text-partout-text-muted hover:bg-partout-muted"
          aria-label={`Add one ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function ReviewCard({ label, value, detail }: Readonly<{ label: string; value: string; detail: string }>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <p className="text-[7px] font-medium uppercase tracking-[0.15em] text-partout-text-muted">{label}</p>
      <p className="mt-2 text-[10px] font-medium text-partout-text">{value}</p>
      <p className="mt-1 text-[8px] leading-4 text-partout-text-muted">{detail}</p>
    </section>
  )
}

function formatWindow(start: string, end: string) {
  if (!start && !end) return 'Dates not set'
  return `${start || 'Start not set'} → ${end || 'End not set'}`
}

function formatContent(form: FormState) {
  const items: Array<[ContentKey, string, string]> = [
    ['reels', 'Reel', 'Reels'],
    ['stories', 'Story', 'Stories'],
    ['posts', 'Post', 'Posts'],
  ]

  const active = items
    .filter(([key]) => form[key] > 0)
    .map(([key, singular, plural]) => `${form[key]} ${form[key] === 1 ? singular : plural}`)

  return active.length > 0 ? active.join(' · ') : 'No content expectations added'
}

type StepProps = Readonly<{
  form: FormState
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}>

const inputClass = 'h-9 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none placeholder:text-partout-text-muted/70 focus:border-partout-action'
