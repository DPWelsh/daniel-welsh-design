import type { Metadata } from 'next'
import Runbook from '@/components/runbook/Runbook'
import { CONTENT } from './content'

export const metadata: Metadata = {
  title: 'Higgsfield vs fal.ai for one AI video: the follow-along runbook',
  description:
    'Make the same shot twice: once in Higgsfield’s creator UI on subscription credits, once through fal.ai’s API at cents per second. Freeze one shot card, run both lanes, and price the finished second with retakes included. Verified against the live model pages.',
  alternates: { canonical: 'https://danielwelsh.design/higgsfield-vs-fal' },
  openGraph: {
    title: 'One AI video, two lanes: Higgsfield vs fal.ai',
    description:
      'The same shot made in a creator UI and through an API, priced per finished second with retakes included. An eight-step runbook you work alongside.',
    url: 'https://danielwelsh.design/higgsfield-vs-fal',
    type: 'article',
  },
}

/* Full-page console, no site chrome — the screen is the set, same as the
   /agent-vps page. The runbook renders its own minimal masthead. */
export default function HiggsfieldVsFalPage() {
  return (
    <main className="min-h-screen bg-[#1a1c12]">
      <Runbook content={CONTENT} />
    </main>
  )
}
