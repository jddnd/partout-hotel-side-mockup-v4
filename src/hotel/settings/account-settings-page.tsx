import { Component } from 'react'
import { Button } from '../../components/ui/button'
import {
  getMockSettingsAccount,
  saveMockSettingsAccount,
} from './settings-mock-storage'
import { SettingsDetailHeader } from './settings-detail-header'

type AccountSettingsState = Readonly<{
  baselineName: string
  displayName: string
}>

export class AccountSettingsPage extends Component<Record<string, never>, AccountSettingsState> {
  private readonly email: string
  readonly state: AccountSettingsState

  constructor(props: Record<string, never>) {
    super(props)
    const initial = getMockSettingsAccount()
    this.email = initial.email
    this.state = {
      baselineName: initial.displayName,
      displayName: initial.displayName,
    }
  }

  private handleSave = () => {
    const { displayName } = this.state
    saveMockSettingsAccount({ email: this.email, displayName })
    this.setState({ baselineName: displayName, displayName })
  }

  render() {
    const { baselineName, displayName } = this.state
    const dirty = displayName !== baselineName

    return (
      <div>
        <SettingsDetailHeader
          title="Account"
          subtitle="Your member identity. This stays separate from the hotel profile."
        />

        <form
          className="mt-7 max-w-[720px] overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card"
          aria-label="Hotel member account"
          onSubmit={(event) => {
            event.preventDefault()
            this.handleSave()
          }}
        >
          <div className="flex items-center gap-3 px-5 py-5">
            <div className="staff-avatar size-10 rounded-full border border-partout-border" role="img" aria-label="Hotel member avatar" />
            <div>
              <h2 className="text-[11px] font-medium text-partout-text">Member account</h2>
              <p className="mt-1 text-[7px] text-partout-text-muted">Used for your identity inside the Hotel workspace.</p>
            </div>
          </div>

          <div className="border-t border-partout-border px-5 py-4">
            <label htmlFor="hotel-account-email" className="text-[8px] font-medium text-partout-text-muted">Email</label>
            <input
              id="hotel-account-email"
              className="mt-1.5 h-9 w-full rounded-control border border-partout-border bg-partout-muted px-3 text-[9px] text-partout-text-muted"
              value={this.email}
              readOnly
            />
            <p className="mt-1.5 text-[7px] text-partout-text-muted">Email is read-only in the current account capability.</p>
          </div>

          <div className="border-t border-partout-border px-5 py-4">
            <label htmlFor="hotel-account-display-name" className="text-[8px] font-medium text-partout-text-muted">Display name</label>
            <input
              id="hotel-account-display-name"
              className="mt-1.5 h-9 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors focus:border-partout-action"
              value={displayName}
              placeholder="Not set"
              onChange={(event) => this.setState({ baselineName, displayName: event.target.value })}
            />
            {!baselineName && !displayName.trim() ? (
              <p className="mt-1.5 text-[7px] text-partout-text-muted">No display name yet. Greetings stay generic until you add one.</p>
            ) : null}
          </div>

          {dirty ? (
            <div className="flex items-center justify-between gap-4 border-t border-partout-border px-5 py-4">
              <span className="text-[7px] text-partout-text-muted">Unsaved changes</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="quiet"
                  className="h-8 px-3 text-[8px]"
                  onClick={() => this.setState({ baselineName, displayName: baselineName })}
                >
                  Cancel
                </Button>
                <Button type="submit" className="h-8 px-4 text-[8px]">Save changes</Button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}
