import type { Metadata } from 'next'
import Runbook from '@/components/runbook/Runbook'
import { CONTENT } from './content'

export const metadata: Metadata = {
  title: 'Cue-locked video overlays: the follow-along runbook',
  description:
    'Graphics that appear on the exact word you say them and sit above your face instead of shrinking it into a corner. Measure the safe zone off the take, build to a chroma-key contract, and prove every cue fired before you publish.',
  alternates: { canonical: 'https://danielwelsh.design/overlay-automation' },
  openGraph: {
    title: 'Overlays that land on the word, and never on your face',
    description:
      'A ten-step runbook for cue-locked chroma-key overlays on vertical video — including the two steps the AI motion-graphics tools skip.',
    url: 'https://danielwelsh.design/overlay-automation',
    type: 'article',
  },
}

/* Full-page console, no site chrome — the screen is the set, same as
   /agent-vps. The runbook renders its own masthead. */
export default function OverlayAutomationPage() {
  return (
    <main className="min-h-screen bg-[#1a1c12]">
      <Runbook content={CONTENT} />
    </main>
  )
}
