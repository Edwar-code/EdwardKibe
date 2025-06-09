'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const ContactForm: React.FC = () => {
  const t = useTranslations('Contact.contactForm')
  // form data which handleChange sets on change (change event) for the message input
  const [formData, setFormData] = useState({
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false) // State to track submitting to avoid double submissions
  const [successMessage, setSuccessMessage] = useState('') //
  const [messageError, setMessageError] = useState('') // State for message error validation

  // Message validation function
  const isValidMessage = (message: string): boolean => {
    return message.trim().length >= 20 // Minimum 20 characters
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    if (e.target.name === 'message') {
      // Validate message as user types
      if (!isValidMessage(e.target.value)) {
        setMessageError('Message must be at least 14 characters long.')
      } else {
        setMessageError('')
      }
    }
  }

  // final form data api request to WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')
    setMessageError('') // Clear message error before submitting

    if (!isValidMessage(formData.message)) {
      setMessageError('Message must be at least 14 characters long.')
      return
    }

    setIsSubmitting(true)

    try {
      const message = encodeURIComponent(formData.message)
      const phoneNumber = '+254740330448'
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
      
      // Redirect to WhatsApp to send the message
      window.open(whatsappUrl, '_blank')

      setSuccessMessage('Your message has been sent successfully to WhatsApp!')
      setFormData({ message: '' }) // Reset form
    } catch (error) {
      console.error('Failed to send message:', error)
      setSuccessMessage('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // form with only the message input
  return (
    <form onSubmit={handleSubmit} className="mx-6">
      <div className="container py-10 md:flex md:flex-col md:items-center md:justify-center ">
        <h2 className="text-2xl font-serif mb-4 dark:text-white/90 text-black/90 text-center">
          {t('header')}
        </h2>
        <div className="mb-4 md:mb-6">
          <label
            htmlFor="message"
            className="block text-base font-semibold dark:text-white/60 text-black/60"
          >
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className={`mt-1 block w-full md:w-[420px] lg:w-[550px] px-3 py-2 border rounded-md shadow-sm text-gray-950 dark:text-white focus:outline-none focus ring-2 dark:ring-sky-400 ring-amber-300 dark:focus:ring-sky-300 focus:ring-orange-400 focus:ring-4 dark:hover:ring-sky-400 hover:ring-amber-300 hover:ring-4 dark:focus-within:hover:ring-sky-300 focus-within:hover:ring-orange-400 focus-within:hover:ring-4 bg-brown0 dark:bg-gray8  ${
              messageError
                ? 'border-red-500 focus:ring-red-500/70 focus:ring-2'
                : ''
            }`}
          />
          {messageError && (
            <p className="mt-2 text-sm text-red-600">{messageError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-[420px] lg:w-[550px] py-3 px-3 bg-gradient-to-r mt-4 from-amber-300 dark:from-emerald-300 to-orange-500 dark:to-sky-400 text-gray-950 font-semibold
          button-animation focus:ring-1 dark:focus-visible:ring-white focus-visible:ring-black hover:ring-2 dark:hover:ring-sky-200 hover:ring-amber-300 hover:text-black "
          aria-label="Submit and Send message"
        >
          {isSubmitting ? t('sending') : t('send')}
        </button>
        {successMessage && (
          <p className="mt-4 text-center text-emerald-400">{successMessage}</p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
