import { useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { saveMockCampaign, type MockCampaignDraft } from './campaign-mock-storage'
import { canContinueCampaignCreate, isCampaignDraftValid } from './campaign-create-validation'

const steps = ['Basics', 'Stay', 'Terms', 'Content', 'Review'] as const

type ContentKey = 'reels' | 'stories' | 'posts'
type FormState = MockCampaignDraft

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

export function CampaignCreatePage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [finished, setFinished] = useState(false)
  const [savedLocally, setSavedLocally] = useState(false)

  const canContinue = canContinueCampaignCreate(step, form)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function createCampaign() {
    if (!isCampaignDraftValid(form)) return
    setSavedLocally(saveMockCampaign(form))
    setFinished(true)
  }

  if (finished) {
    return (
      <div className="mx-auto flex min-h-[620px] w-full max-w-[920px] items-center justify-center py-12">
        <div className="max-w-[520px] text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-partout-success-soft text-partout-success-text">
            <Check aria-hidden="true" size={19} strokeWidth={1.8} />
          </span>
          <p className="mt-6 text-[7px] font-medium uppercase tracking-[0.18em] text-partout-text-muted">
            {savedLocally ? 'Saved in this mockup' : 'Campaign ready'}
          </p>
          <h1 className="mt-2 font-display text-[40px] font-normal leading-none tracking-[-0.04em] text-partout-text">
            {form.name || 'New campaign'}
          </h1>
          <p className="mx-auto mt-4 max-w-[440px] text-[10px] leading-5 text-partout-text-muted">
            {savedLocally
              ? 'This campaign is saved in this browser and will now appear in Campaigns on this device. Nothing has been published to the real Partout backend.'
              : 'The campaign could not be stored in this browser. Nothing has been published to the real Partout backend.'}
          </p>
          <a
            href="/hotel/campaigns"
            className="mt-7 inline-flex h-8 items-center justify-center rounded-control bg-partout-action px-5 text-[8px] font-medium text-white transition-colors hover:bg-partout-action-hover"
          >
            View campaigns
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1060px] pb-14">
      <header className="border-b border-partout-border pb-5">
        <div className="flex items-center justify-between gap-6">
          <a href="/hotel/campaigns" className="inline-flex items-center gap-1.5 text-[8px] font-medium text-partout-text-muted transition-colors hover:text-partout-text">
            <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.8} />
            Campaigns
          </a>
          <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">New campaign</p>
        </div>

        <div className="mt-7 grid grid-cols-5 gap-5" aria-label="Campaign creation progress">
          {steps.map((label, index) => {
            const complete = index < step
            const active = index === step
            return (
              <div key={label} className="min-w-0">
                <div className={`h-px ${index <= step ? 'bg-partout-action' : 'bg-partout-border'}`} />
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-[7px] font-medium tabular-nums ${active ? 'text-partout-text' : 'text-partout-text-muted'}`}>
                    {complete ? '✓' : `0${index + 1}`}
                  </span>
                  <span className={`truncate text-[7px] ${active ? 'font-medium text-partout-text' : 'text-partout-text-muted'}`}>{label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </header>

      <main className="mx-auto mt-12 max-w-[760px]">
        <StepIntro step={step} />
        <div className="mt-8">
          {step === 0 ? <BasicsStep form={form} update={update} /> : null}
          {step === 1 ? <StayStep form={form} update={update} /> : null}
          {step === 2 ? <TermsStep form={form} update={update} /> : null}
          {step === 3 ? <ContentStep form={form} update={update} /> : null}
          {step === 4 ? <ReviewStep form={form} /> : null}
        </div>
      </main>

      <footer className="mx-auto mt-12 flex max-w-[760px] items-center justify-between border-t border-partout-border pt-5">
        <div>
          {step > 0 ? (
            <Button variant="quiet" onClick={() => setStep((value) => value - 1)} className="h-8 gap-1.5 px-2 text-[8px]">
              <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.7} />
              Back
            </Button>
          ) : null}
        </div>

        {step < steps.length - 1 ? (
          <Button disabled={!canContinue} onClick={() => setStep((value) => value + 1)} className="h-8 min-w-[106px] gap-1.5 px-4 text-[8px]">
            Continue
            <ArrowRight aria-hidden="true" size={11} strokeWidth={1.7} />
          </Button>
        ) : (
          <Button disabled={!isCampaignDraftValid(form)} onClick={createCampaign} className="h-9 min-w-[132px] px-5 text-[8px] ring-4 ring-partout-action/10 transition-shadow hover:ring-partout-action/15">
            Review & create
          </Button>
        )}
      </footer>
    </div>
  )
}

function StepIntro({ step }: Readonly<{ step: number }>) {
  const copy = [
    ['Start with the stay', 'Give creators a clear reason to understand this campaign at a glance.'],
    ['When can they come?', 'Set the first stay window and how many creator stays you want to host.'],
    ['What is the exchange?', 'Keep the commercial terms simple and explicit before a creator applies.'],
    ['What are you agreeing on?', 'Set the expected content per approved creator. This is not an approval queue.'],
    ['See it as a creator will', 'Check the campaign as one coherent invitation before creating it.'],
  ] as const

  return (
    <div>
      <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-partout-text-muted">{steps[step]}</p>
      <h1 className="mt-2 font-display text-[38px] font-normal leading-[0.98] tracking-[-0.04em] text-partout-text">{copy[step][0]}</h1>
      <p className="mt-3 max-w-[520px] text-[10px] leading-5 text-partout-text-muted">{copy[step][1]}</p>
    </div>
  )
}

function BasicsStep({ form, update }: StepProps) {
  return (
    <div className="space-y-8">
      <LineField label="Campaign name">
        <input autoFocus value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Coastal Autumn" className={lineInputClass} />
      </LineField>
      <LineField label="Short description" hint="A short invitation, not a campaign brief.">
        <textarea
          value={form.description}
          onChange={(event) => update('description', event.target.value)}
          placeholder="Two quiet autumn nights by the sea, created for people who travel for atmosphere."
          rows={4}
          className={`${lineInputClass} min-h-[112px] resize-none py-3 leading-5`}
        />
      </LineField>
    </div>
  )
}

function StayStep({ form, update }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <LineField label="Arrival">
          <input type="date" value={form.startDate} onChange={(event) => update('startDate', event.target.value)} className={lineInputClass} />
        </LineField>
        <LineField label="Departure">
          <input type="date" value={form.endDate} onChange={(event) => update('endDate', event.target.value)} className={lineInputClass} />
        </LineField>
      </div>
      <div className="border-y border-partout-border py-5">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-[9px] font-medium text-partout-text">Creator stays</p>
            <p className="mt-1 text-[8px] text-partout-text-muted">How many creators can be confirmed for this first window?</p>
          </div>
          <Counter value={form.spots} min={1} onChange={(value) => update('spots', value)} label="creator stays" />
        </div>
      </div>
    </div>
  )
}

function TermsStep({ form, update }: StepProps) {
  return (
    <div className="space-y-8">
      <ChoiceField label="Exchange" value={form.exchange} options={['Hosted stay', 'Hosted stay + fee', 'Paid collaboration']} onChange={(value) => update('exchange', value)} />
      <ChoiceField
        label="Usage rights"
        value={form.usageRights}
        options={['Hotel organic channels · 12 months', 'Hotel organic channels · 6 months', 'Organic + paid social · 12 months']}
        onChange={(value) => update('usageRights', value)}
      />
    </div>
  )
}

function ContentStep({ form, update }: StepProps) {
  return (
    <div className="border-y border-partout-border">
      <ContentCount label="Reels" note="Short-form video" value={form.reels} onChange={(value) => update('reels', value)} />
      <ContentCount label="Stories" note="Ephemeral coverage" value={form.stories} onChange={(value) => update('stories', value)} />
      <ContentCount label="Posts" note="Feed content" value={form.posts} onChange={(value) => update('posts', value)} />
    </div>
  )
}

function ReviewStep({ form }: Readonly<{ form: FormState }>) {
  return (
    <div className="space-y-8">
      <section className="border-y border-partout-border py-7">
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Campaign</p>
        <h2 className="mt-2 font-display text-[34px] font-normal leading-none tracking-[-0.035em] text-partout-text">{form.name || 'Untitled campaign'}</h2>
        <p className="mt-3 max-w-[590px] text-[10px] leading-5 text-partout-text-muted">{form.description || 'No description added.'}</p>
      </section>
      <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <ReviewItem label="Stay" value={formatWindow(form.startDate, form.endDate)} note={`${form.spots} creator ${form.spots === 1 ? 'stay' : 'stays'}`} />
        <ReviewItem label="Exchange" value={form.exchange} note={form.usageRights} />
        <ReviewItem label="Agreed content" value={formatContent(form)} note="Per approved creator" />
        <ReviewItem label="Status after create" value="Open" note="Creators can apply within the campaign rules." />
      </dl>
    </div>
  )
}

function LineField({ label, hint, children }: Readonly<{ label: string; hint?: string; children: ReactNode }>) {
  return (
    <label className="block">
      <span className="text-[8px] font-medium text-partout-text">{label}</span>
      {hint ? <span className="ml-2 text-[7px] text-partout-text-muted">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  )
}

function ChoiceField({ label, value, options, onChange }: Readonly<{ label: string; value: string; options: string[]; onChange: (value: string) => void }>) {
  return (
    <fieldset>
      <legend className="text-[8px] font-medium text-partout-text">{label}</legend>
      <div className="mt-3 divide-y divide-partout-border border-y border-partout-border">
        {options.map((option) => {
          const selected = option === value
          return (
            <label key={option} className="flex cursor-pointer items-center justify-between gap-6 py-4">
              <span className={`text-[9px] ${selected ? 'font-medium text-partout-text' : 'text-partout-text-muted'}`}>{option}</span>
              <input type="radio" name={label} checked={selected} onChange={() => onChange(option)} className="accent-partout-action" />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function ContentCount({ label, note, value, onChange }: Readonly<{ label: string; note: string; value: number; onChange: (value: number) => void }>) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="text-[10px] font-medium text-partout-text">{label}</p>
        <p className="mt-1 text-[7px] text-partout-text-muted">{note}</p>
      </div>
      <Counter value={value} min={0} onChange={onChange} label={label.toLowerCase()} />
    </div>
  )
}

function Counter({ value, min, onChange, label }: Readonly<{ value: number; min: number; onChange: (value: number) => void; label: string }>) {
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="grid size-8 place-items-center rounded-full border border-partout-border text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text" aria-label={`Remove one ${label}`}>
        <Minus aria-hidden="true" size={11} strokeWidth={1.8} />
      </button>
      <span className="w-6 text-center font-display text-[20px] leading-none tabular-nums text-partout-text">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="grid size-8 place-items-center rounded-full border border-partout-border text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text" aria-label={`Add one ${label}`}>
        <Plus aria-hidden="true" size={11} strokeWidth={1.8} />
      </button>
    </div>
  )
}

function ReviewItem({ label, value, note }: Readonly<{ label: string; value: string; note: string }>) {
  return (
    <div>
      <dt className="text-[7px] font-medium uppercase tracking-[0.15em] text-partout-text-muted">{label}</dt>
      <dd className="mt-2 text-[10px] font-medium text-partout-text">{value}</dd>
      <p className="mt-1 text-[8px] leading-4 text-partout-text-muted">{note}</p>
    </div>
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

  const active = items.filter(([key]) => form[key] > 0).map(([key, singular, plural]) => `${form[key]} ${form[key] === 1 ? singular : plural}`)
  return active.length > 0 ? active.join(' · ') : 'No content expectations added'
}

type StepProps = Readonly<{
  form: FormState
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}>

const lineInputClass = 'w-full border-0 border-b border-partout-border bg-transparent px-0 pb-3 pt-1 text-[12px] text-partout-text outline-none transition-colors placeholder:text-partout-text-muted/55 focus:border-partout-action'
