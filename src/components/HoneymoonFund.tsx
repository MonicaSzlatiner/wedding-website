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

export default function HoneymoonFund() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/contributions/counts')
      .then((r) => r.json())
      .then(setCounts)
      .catch(() => {})
  }, [])

  const selectedActivity = ACTIVITIES.find((a) => a.key === selected)
  const amountNum = parseFloat(amount)

  function handleSelectTile(key: string) {
    setSelected(key)
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  function recordContribution() {
    if (!selectedActivity) return
    fetch('/api/contributions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guest_name: name.trim() || null,
        activity: selectedActivity.name,
        amount_cents: amountNum > 0 ? Math.round(amountNum * 100) : null,
      }),
    }).catch(() => {})
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
                className="relative w-full text-center p-5 transition-all duration-200 active:scale-[0.98]"
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
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            ref={panelRef}
            key="fund-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeUp}
            className="rounded-2xl p-6"
            style={{
              border: '1px solid rgba(45, 41, 38, 0.12)',
              backgroundColor: 'white',
            }}
          >
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
              Your name
            </p>
            <input
              type="text"
              placeholder="Your name — we'd love to know who to thank"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full font-serif italic text-lg outline-none border-b-2 pb-1 mb-6 bg-transparent transition-colors duration-200 focus:border-[#C37B60]"
              style={{
                borderBottomColor: name ? '#C37B60' : 'rgba(45, 41, 38, 0.15)',
                color: '#2D2926',
              }}
            />

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

            <div className="flex gap-3">
              <a
                href="https://www.ing.nl/de-ing/payreq?trxid=mdH0dM8iGbS0qO6zsJ7kTNQ0EjibEpPQ&flow-step=payment-request"
                target="_blank"
                rel="noopener noreferrer"
                onClick={recordContribution}
                className="flex-1 text-center py-3 rounded-full text-[0.75rem] font-medium tracking-wide transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]"
                style={{
                  backgroundColor: '#1B2A4A',
                  color: '#E8DDB8',
                  letterSpacing: '0.04em',
                }}
              >
                Bank transfer
              </a>
              <a
                href="https://paypal.me/monicaandlaurens"
                target="_blank"
                rel="noopener noreferrer"
                onClick={recordContribution}
                className="flex-1 text-center py-3 rounded-full text-[0.75rem] font-medium tracking-wide transition-colors duration-200 hover:bg-[#1B2A4A] hover:text-[#E8DDB8] active:scale-[0.98]"
                style={{
                  border: '1px solid #1B2A4A',
                  color: '#1B2A4A',
                  letterSpacing: '0.04em',
                }}
              >
                PayPal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
