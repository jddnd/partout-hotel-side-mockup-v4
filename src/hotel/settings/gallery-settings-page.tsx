import { Plus } from 'lucide-react'
import { Component, createRef } from 'react'
import { Button } from '../../components/ui/button'
import { HOTEL_GALLERY_MAX_IMAGES } from '../../data/mock/settings'
import {
  getMockSettingsGallery,
  saveMockSettingsGallery,
  type MockSettingsGalleryItem,
} from './settings-mock-storage'
import { SettingsDetailHeader } from './settings-detail-header'

type GalleryItem = MockSettingsGalleryItem & Readonly<{ previewUrl?: string }>
type GallerySettingsState = Readonly<{ items: ReadonlyArray<GalleryItem> }>

export class GallerySettingsPage extends Component<Record<string, never>, GallerySettingsState> {
  readonly state: GallerySettingsState = { items: getMockSettingsGallery() }
  private readonly fileInputRef = createRef<HTMLInputElement>()

  private persist = (nextItems: ReadonlyArray<GalleryItem>) => {
    this.setState({ items: nextItems })
    saveMockSettingsGallery(nextItems)
  }

  private handleRemove = (id: string) => {
    const removed = this.state.items.find((item) => item.id === id)
    if (removed?.previewUrl && typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(removed.previewUrl)
    }
    this.persist(this.state.items.filter((item) => item.id !== id))
  }

  private handleAdd = (file: File | null) => {
    if (!file || this.state.items.length >= HOTEL_GALLERY_MAX_IMAGES) return
    const previewUrl = typeof URL.createObjectURL === 'function' ? URL.createObjectURL(file) : undefined
    const next: GalleryItem = {
      id: `gallery-${Date.now()}`,
      position: '50% 50%',
      previewUrl,
    }
    this.persist([...this.state.items, next])
  }

  render() {
    const { items } = this.state
    const canAdd = items.length < HOTEL_GALLERY_MAX_IMAGES

    return (
      <div>
        <SettingsDetailHeader
          title="Gallery"
          subtitle="Manage the photographs creators see when they look at your hotel."
        />

        <section className="mt-7 rounded-card border border-partout-border bg-partout-surface p-5 shadow-card" aria-labelledby="gallery-images-title">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="gallery-images-title" className="text-[10px] font-medium text-partout-text">Hotel photographs</h2>
              <p className="mt-1 text-[7px] text-partout-text-muted">Add or remove images. Partout currently allows up to six.</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-8 gap-1.5 px-3 text-[8px]"
              disabled={!canAdd}
              onClick={() => this.fileInputRef.current?.click()}
            >
              <Plus aria-hidden="true" size={11} strokeWidth={1.7} />
              Add image
            </Button>
            <input
              ref={this.fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              aria-label="Add gallery image file"
              disabled={!canAdd}
              onChange={(event) => {
                this.handleAdd(event.target.files?.[0] ?? null)
                event.target.value = ''
              }}
            />
          </div>

          {items.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <article key={item.id} className="overflow-hidden rounded-control border border-partout-border bg-partout-canvas">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt={`Hotel gallery image ${index + 1}`}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  ) : (
                    <div
                      className="hotel-cover-placeholder aspect-[16/10]"
                      role="img"
                      aria-label={`Hotel gallery image ${index + 1}`}
                      style={{ backgroundPosition: item.position }}
                    />
                  )}
                  <div className="flex h-10 items-center justify-between gap-3 border-t border-partout-border bg-partout-surface px-3">
                    <span className="text-[8px] text-partout-text-muted">Added</span>
                    <button
                      type="button"
                      className="text-[8px] font-medium text-partout-text-muted transition-colors hover:text-partout-text"
                      onClick={() => this.handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-control border border-dashed border-partout-border px-5 py-10 text-center">
              <p className="text-[9px] font-medium text-partout-text">No gallery photographs yet</p>
              <p className="mt-1 text-[7px] text-partout-text-muted">Add the first image creators should see.</p>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-partout-border pt-4">
            <span className="text-[8px] text-partout-text-muted">{items.length} / {HOTEL_GALLERY_MAX_IMAGES}</span>
            <span className="text-[7px] text-partout-text-muted">JPEG, PNG or WebP</span>
          </div>
        </section>
      </div>
    )
  }
}
