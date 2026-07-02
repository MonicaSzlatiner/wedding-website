'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingConfig } from '@/config/content'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

const ACTIVITIES = [
  {
    key: 'dinner',
    icon: '\u{1F37D}',
    name: 'A few really good dinners',
    desc: 'Somewhere with a view, a long menu, and absolutely no rush. More than once.',
  },
  {
    key: 'night',
    icon: '\u{1F6F6}',
    name: 'Something on the water',
    desc: 'A jetski, a canoe, a paddleboard. Probably all three. Definitely in that order.',
  },
  {
    key: 'spa',
    icon: '\u{1F697}',
    name: 'A terrible little rental car',
    desc: "They\u2019re thinking road trip. No itinerary, one bag, wrong turns not just allowed but encouraged.",
  },
  {
    key: 'adventure',
    icon: '\u{1F97E}',
    name: "A hike Monica didn\u2019t agree to",
    desc: 'Laurens picks the trail. Monica complains for the first 20 minutes. They both agree it was worth it at the top.',
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

const PAYPAL_ME_BASE = 'https://paypal.me/monicaandlaurens'
const BANK_URL =
  'https://www.ing.nl/de-ing/payreq?trxid=mdH0dM8iGbS0qO6zsJ7kTNQ0EjibEpPQ&flow-step=payment-request'
const ZELLE_EMAIL = weddingConfig.gifts.zelle.email

type PaymentMethod = 'bank' | 'paypal' | 'zelle'
type AmountCurrency = 'eur' | 'usd'

function socialLabel(count: number): string {
  if (count === 0) return 'Be the first'
  if (count === 1) return '1 person contributed'
  return `${count} people contributed`
}

function buildPayPalUrl(amount: number): string {
  if (!(amount > 0) || !Number.isFinite(amount)) return PAYPAL_ME_BASE
  const formatted = Number.isInteger(amount) ? String(amount) : amount.toFixed(2)
  return `${PAYPAL_ME_BASE}/${formatted}EUR`
}

function formatOverlayAmount(amount: number): string {
  const formatted = Number.isInteger(amount) ? String(amount) : amount.toFixed(2)
  return `$${formatted}`
}

export default function HoneymoonFund() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amountCurrency, setAmountCurrency] = useState<AmountCurrency>('eur')
  const [showZelleOverlay, setShowZelleOverlay] = useState(false)
  const [zelleAmount, setZelleAmount] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/contributions/counts')
      .then(async (r) => {
        const raw = await r.json().catch(() => null)
        if (cancelled || raw == null || typeof raw !== 'object' || Array.isArray(raw)) {
          return {}
        }
        const safe: Record<string, number> = {}
        for (const [k, v] of Object.entries(raw)) {
          const n = Number(v)
          if (!Number.isNaN(n) && Number.isFinite(n)) safe[k] = n
        }
        return safe
      })
      .then((data) => {
        if (!cancelled) setCounts(data)
      })
      .catch(() => {
        if (!cancelled) setCounts({})
      })
    return () => {
      cancelled = true
    }
  }, [])

  const selectedActivity = ACTIVITIES.find((a) => a.key === selected)
  const amountNum = parseFloat(amount)

  function handleSelectTile(key: string) {
    setSelected(key)
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  function setCurrencyForMethod(method: PaymentMethod) {
    setAmountCurrency(method === 'zelle' ? 'usd' : 'eur')
  }

  async function copyZelleEmail() {
    try {
      await navigator.clipboard.writeText(ZELLE_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  async function handlePayment(paymentMethod: PaymentMethod) {
    if (!selectedActivity) return

    setCurrencyForMethod(paymentMethod)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      setFormError('Please enter your name.')
      return
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.')
      return
    }
    if (!(amountNum > 0) || !Number.isFinite(amountNum)) {
      setFormError('Please enter an amount.')
      return
    }

    setFormError(null)
    setIsSubmitting(true)

    const paymentUrl =
      paymentMethod === 'paypal' ? buildPayPalUrl(amountNum) : BANK_URL

    const paymentTab =
      paymentMethod === 'zelle'
        ? null
        : window.open(
            paymentMethod === 'paypal' ? paymentUrl : 'about:blank',
            '_blank',
            'noopener,noreferrer'
          )

    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: trimmedName,
          guest_email: trimmedEmail,
          activity: selectedActivity.name,
          amount_cents: Math.round(amountNum * 100),
          payment_method: paymentMethod,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        paymentTab?.close()
        setFormError(
          typeof data.error === 'string'
            ? data.error
            : 'Something went wrong. Please try again.'
        )
        return
      }

      if (paymentMethod === 'bank' && paymentTab) {
        paymentTab.location.href = paymentUrl
      } else if (paymentMethod === 'zelle') {
        setZelleAmount(amountNum)
        setShowZelleOverlay(true)
      }
    } catch {
      paymentTab?.close()
      setFormError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function closeZelleOverlay() {
    setShowZelleOverlay(false)
    setCopied(false)
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
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: 'rgba(45, 41, 38, 0.5)' }}
                >
                  {activity.desc}
                </p>

                <p
                  className="text-xs uppercase font-bold flex items-center justify-center gap-1.5"
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
              Your email
            </p>
            <input
              type="email"
              autoComplete="email"
              placeholder="So we can send you a thank you"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-serif italic text-lg outline-none border-b-2 pb-1 mb-6 bg-transparent transition-colors duration-200 focus:border-[#C37B60]"
              style={{
                borderBottomColor: email ? '#C37B60' : 'rgba(45, 41, 38, 0.15)',
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
                {amountCurrency === 'usd' ? '$' : '\u20AC'}
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
              className="text-sm font-light leading-relaxed mb-6"
              style={{ color: 'rgba(45, 41, 38, 0.45)' }}
            >
              Give whatever feels right &mdash; there&rsquo;s no minimum and no wrong answer.
              {amountCurrency === 'usd' && (
                <span className="block mt-1">Zelle uses US dollars.</span>
              )}
            </p>

            {formError && (
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: '#C37B60' }}
                role="alert"
              >
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onMouseEnter={() => setCurrencyForMethod('bank')}
                onFocus={() => setCurrencyForMethod('bank')}
                onClick={() => handlePayment('bank')}
                className="text-center py-3 rounded-full text-[0.75rem] font-medium tracking-wide transition-opacity duration-200 hover:opacity-85 active:scale-[0.98] disabled:opacity-50"
                style={{
                  backgroundColor: '#1B2A4A',
                  color: '#E8DDB8',
                  letterSpacing: '0.04em',
                }}
              >
                {isSubmitting ? 'One moment…' : 'Bank transfer'}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onMouseEnter={() => setCurrencyForMethod('paypal')}
                onFocus={() => setCurrencyForMethod('paypal')}
                onClick={() => handlePayment('paypal')}
                className="text-center py-3 rounded-full text-[0.75rem] font-medium tracking-wide transition-colors duration-200 hover:bg-[#1B2A4A] hover:text-[#E8DDB8] active:scale-[0.98] disabled:opacity-50"
                style={{
                  border: '1px solid #1B2A4A',
                  color: '#1B2A4A',
                  letterSpacing: '0.04em',
                }}
              >
                {isSubmitting ? 'One moment…' : 'PayPal'}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onMouseEnter={() => setCurrencyForMethod('zelle')}
                onFocus={() => setCurrencyForMethod('zelle')}
                onClick={() => handlePayment('zelle')}
                className="text-center py-3 rounded-full text-[0.75rem] font-medium tracking-wide transition-colors duration-200 hover:bg-[#1B2A4A] hover:text-[#E8DDB8] active:scale-[0.98] disabled:opacity-50"
                style={{
                  border: '1px solid #1B2A4A',
                  color: '#1B2A4A',
                  letterSpacing: '0.04em',
                }}
              >
                {isSubmitting ? 'One moment…' : 'Zelle'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showZelleOverlay && zelleAmount != null && (
          <motion.div
            key="zelle-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(45, 41, 38, 0.45)' }}
            onClick={closeZelleOverlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="zelle-overlay-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-md rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'white' }}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                id="zelle-overlay-title"
                className="text-[10px] uppercase font-bold mb-2"
                style={{ letterSpacing: '0.2em', color: 'rgba(45, 41, 38, 0.5)' }}
              >
                Send via Zelle
              </p>
              <p
                className="font-serif italic text-3xl mb-6"
                style={{ color: '#2D2926' }}
              >
                {formatOverlayAmount(zelleAmount)}
              </p>

              <div
                className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 mb-6"
                style={{ backgroundColor: '#F5F5F0' }}
              >
                <p
                  className="font-serif text-sm break-all text-left"
                  style={{ color: '#2D2926' }}
                >
                  {ZELLE_EMAIL}
                </p>
                <button
                  type="button"
                  onClick={copyZelleEmail}
                  className="flex-shrink-0 text-[0.7rem] uppercase font-bold tracking-wide px-3 py-1.5 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: copied ? '#C37B60' : '#1B2A4A',
                    color: '#E8DDB8',
                    letterSpacing: '0.08em',
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <ol
                className="text-sm text-left space-y-2 mb-6 leading-relaxed"
                style={{ color: 'rgba(45, 41, 38, 0.65)' }}
              >
                <li>1. Open your US bank app</li>
                <li>2. Choose Zelle</li>
                <li>3. Send to the email above</li>
              </ol>

              <p
                className="text-xs mb-6"
                style={{ color: 'rgba(45, 41, 38, 0.4)' }}
              >
                US bank accounts only
              </p>

              <button
                type="button"
                onClick={closeZelleOverlay}
                className="w-full py-3 rounded-full text-[0.75rem] font-medium tracking-wide transition-opacity duration-200 hover:opacity-85"
                style={{
                  backgroundColor: '#1B2A4A',
                  color: '#E8DDB8',
                  letterSpacing: '0.04em',
                }}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
