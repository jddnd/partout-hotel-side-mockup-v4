import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { HOTEL_GALLERY_MAX_IMAGES, settingsGallery } from '../../data/mock/settings'
import { SettingsDetailHeader } from './settings-detail-header'

export function GallerySettingsPage() {
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
          <Button variant="secondary" className="h-8 gap-1.5 px-3 text-[8px]">
            <Plus aria-hidden="true" size={11} strokeWidth={1.7} />
            Add image
          </Button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {settingsGallery.map((item, index) => (
            <article key={item.id} className="overflow-hidden rounded-control border border-partout-border bg-partout-canvas">
              <div
                className="hotel-cover-placeholder aspect-[16/10]"
                role="img"
                aria-label={`Hotel gallery image ${index + 1}`}
                style={{ backgroundPosition: item.position }}
              />
              <div className="flex h-10 items-center justify-between gap-3 border-t border-partout-border bg-partout-surface px-3">
                <span className="text-[8px] text-partout-text-muted">Added</span>
                <button type="button" className="text-[8px] font-medium text-partout-text-muted transition-colors hover:text-partout-text">Remove</button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-partout-border pt-4">
          <span className="text-[8px] text-partout-text-muted">{settingsGallery.length} / {HOTEL_GALLERY_MAX_IMAGES}</span>
          <span className="text-[7px] text-partout-text-muted">JPEG, PNG or WebP</span>
        </div>
      </section>
    </div>
  )
}
