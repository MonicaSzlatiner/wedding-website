'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

const ACTIVITIES = [
  {
    key: 'dinner',
    icon: '\u{1F37D}',
    name: 'A really good dinner',
    desc: 'Somewhere with a view, a long menu, and absolutely no rush',
  },
  {
    key: 'night',
    icon: '\u{1F319}',
    name: 'A night somewhere beautiful',
    desc: "We haven\u2019t decided where yet. It will be worth it",
  },
  {
    key: 'spa',
    icon: '\u{1F33F}',
    name: 'A spa day for both of us',
    desc: 'Massages, robes, and a strict no-phone policy',
  },
  {
    key: 'adventure',
    icon: '\u{2708}\u{FE0F}',
    name: "An adventure we haven\u2019t planned yet",
    desc: 'Could be a boat. Could be a hike. Probably both',
  },
  {
    key: 'coffee',
    icon: '\u{2615}',
    name: 'Morning coffee with a view',
    desc: 'The slower the morning, the better the honeymoon',
  },
  {
    key: 'wonderful',
    icon: '\u{2728}',
    name: 'Just make it wonderful',
    desc: "You have no idea what we\u2019ll do \u2014 you just want us to have the best time",
  },
]

function socialLabel(count: number): string {
  if (count === 0) return 'Be the first'
  if (count === 1) return '1 person contributed'
  return `${count} people contributed`
}

export default function HoneymoonFund({
  paypalUrl,
  bankTransferUrl,
}: {
  paypalUrl: string
  bankTransferUrl: string
}) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/contributions/counts')
      .then((r) => r.json())
      .then(setCounts)
      .catch(() => {})
  }, [])

  const selectedActivity = ACTIVITIES.find((a) => a.key === selected)
  const amountNum = parseFloat(amount)
  const canSubmit = !!selected && amountNum > 0

  function handleSelectTile(key: string) {
    setSelected(key)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  async function handleContribute() {
    if (!canSubmit || submitting) return
    setSubmitting(true)

    try {
      await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity: selectedActivity!.name,
          amount_cents: Math.round(amountNum * 100),
        }),
      })
    } catch {
      // Don't block the PayPal redirect if recording fails
    }

    setDone(true)

    setTimeout(() => {
      const url = `${paypalUrl}/${Math.round(amountNum)}EUR`
      window.open(url, '_blank', 'noopener,noreferrer')
      setSubmitting(false)
    }, 600)
  }

  function btnLabel() {
    if (done) return 'Opening PayPal\u2026'
    if (submitting) return 'Just a moment\u2026'
    if (!selected) return 'Select an experience first'
    if (!amountNum || amountNum <= 0) return 'Enter an amount to continue'
    return 'Contribute \u2192 PayPal'
  }

  return (
    <div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {ACTIVITIES.map((activity) => {
          const count = counts[activity.name] ?? 0
          const isSelected = selected === activity.key

          return (
            <div
              key={activity.key}
              className="relative text-center rounded-2xl transition-all duration-200 overflow-hidden"
              style={
                isSelected
                  ? {
                      backgroundColor: 'rgba(195, 123, 96, 0.06)',
                      border: '1.5px solid #C37B60',
                    }
                  : {
                      backgroundColor: 'white',
                      border: '1px solid rgba(45, 41, 38, 0.12)',
                    }
              }
            >
              <button
                type="button"
                onClick={() => handleSelectTile(activity.key)}
                aria-pressed={isSelected}
                className="relative w-full text-center p-5 pb-3 transition-all duration-200 active:scale-[0.98]"
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#C37B60' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}

                <span className="text-2xl mb-2 block">{activity.icon}</span>

                <p
                  className="font-serif italic text-sm leading-snug mb-1.5"
                  style={{ color: '#2D2926' }}
                >
                  {activity.name}
                </p>

                <p
                  className="text-[0.7rem] leading-relaxed mb-3"
                  style={{ color: 'rgba(45, 41, 38, 0.5)' }}
                >
                  {activity.desc}
                </p>

                <p
                  className="text-[0.65rem] uppercase font-bold flex items-center justify-center gap-1.5"
                  style={{ letterSpacing: '0.08em', color: 'rgba(45, 41, 38, 0.35)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                    style={{
                      backgroundColor: count > 0 ? '#C37B60' : 'rgba(45, 41, 38, 0.2)',
                    }}
                  />
                  {socialLabel(count)}
                </p>
              </button>

              <div className="px-5 pb-5">
                <div className="flex gap-3 mt-4 justify-center">
                  <a
                    href={paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1B2A4A] text-[#E8DDB8] text-sm rounded-full hover:opacity-90 transition-opacity"
                  >
                    Pay via PayPal
                  </a>
                  <a
                    href={bankTransferUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-[#1B2A4A] text-[#1B2A4A] text-sm rounded-full hover:bg-[#1B2A4A] hover:text-[#E8DDB8] transition-colors"
                  >
                    Bank transfer
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            ref={formRef}
            key="fund-form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeUp}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(45, 41, 38, 0.12)' }}
          >
            <div className="p-6" style={{ backgroundColor: 'white' }}>

              <p
                className="text-[10px] uppercase font-bold mb-1"
                style={{ letterSpacing: '0.2em', color: 'rgba(45, 41, 38, 0.5)' }}
              >
                Contributing to
              </p>
              <p
                className="font-serif italic text-[1.05rem] mb-6"
                style={{ color: '#2D2926' }}
              >
                {selectedActivity?.name}
              </p>

              <p
                className="text-[10px] uppercase font-bold mb-3"
                style={{ letterSpacing: '0.2em', color: 'rgba(45, 41, 38, 0.5)' }}
              >
                Your contribution
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className="font-serif italic text-2xl"
                  style={{ color: 'rgba(45, 41, 38, 0.4)' }}
                >
                  &euro;
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="any amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 font-serif italic text-3xl outline-none border-b-2 pb-1 bg-transparent transition-colors duration-200 focus:border-[#C37B60] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{
                    borderBottomColor: amount ? '#C37B60' : 'rgba(45, 41, 38, 0.15)',
                    color: '#2D2926',
                  }}
                />
              </div>
              <p
                className="text-[0.78rem] font-light leading-relaxed mb-6"
                style={{ color: 'rgba(45, 41, 38, 0.45)' }}
              >
                Give whatever feels right &mdash; there&rsquo;s no minimum and no wrong answer.
              </p>

              <button
                type="button"
                disabled={!canSubmit || submitting}
                onClick={handleContribute}
                className="w-full py-4 rounded-full text-[11px] uppercase font-bold transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#2D2926',
                  color: '#F5F5F0',
                  letterSpacing: '0.2em',
                }}
              >
                <span style={{ marginRight: '-0.2em' }}>{btnLabel()}</span>
              </button>
            </div>

            <div
              className="px-6 py-3 flex items-center gap-2 text-[0.72rem] font-light"
              style={{
                backgroundColor: 'rgba(45, 41, 38, 0.03)',
                borderTop: '1px solid rgba(45, 41, 38, 0.08)',
                color: 'rgba(45, 41, 38, 0.45)',
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure payment via PayPal &mdash; no platform fees deducted
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
