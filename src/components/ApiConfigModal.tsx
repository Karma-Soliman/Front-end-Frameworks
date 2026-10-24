import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { X } from "lucide-react"
import { storage } from "../utils/storage"

type ApiConfigModalProps = {
  onClose: () => void
  onSaved: () => void
}

function ApiConfigModal({ onClose, onSaved }: ApiConfigModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [apiKey, setApiKey] = useState(storage.getApiKey)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = "hidden"

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      storage.setApiKey(apiKey)
    } catch {
      setError("Could not save the key in this browser.")
      return
    }

    onSaved()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal-overlay active api-config-modal"
      aria-labelledby="api-config-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal-dialog api-config-panel">
        <button
          className="modal-close-btn"
          aria-label="Close API settings"
          onClick={onClose}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 id="api-config-title">Configure TMDB</h2>

        <p id="api-key-help">
          Enter your TMDB v3 API key to load live movies and genres. Leave it
          empty to use sample movies; dynamic genres require a key.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="tmdb-api-key">API key</label>

          <input
            id="tmdb-api-key"
            className="search-input"
            type="password"
            value={apiKey}
            onChange={(event) => {
              setApiKey(event.target.value)
              setError(null)
            }}
            aria-describedby="api-key-help"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />

          {error && <p role="alert">{error}</p>}

          <div className="modal-footer-actions">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default ApiConfigModal
