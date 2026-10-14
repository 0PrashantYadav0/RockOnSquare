import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-light text-white mb-2">Privacy Policy</h1>
        <p className="text-[#c9a84c] text-sm mb-10">Rock One Square · Senflore Hospitality LLP</p>

        <div className="prose prose-sm prose-invert max-w-none space-y-6 text-white/60 leading-relaxed">
          <div className="p-4 border border-[rgba(201,168,76,0.2)] rounded-sm bg-[rgba(201,168,76,0.04)] mb-6">
            <p className="text-white/50 text-xs">
              <strong className="text-[#c9a84c]">Note:</strong> This privacy policy is a placeholder. Before publishing this website, please have this document reviewed and approved by a qualified legal professional in accordance with applicable Indian data protection laws, including the Digital Personal Data Protection Act, 2023.
            </p>
          </div>

          <section>
            <h2 className="text-white text-lg font-medium mb-3">1. Information We Collect</h2>
            <p>When you submit an enquiry on this website, we collect personal information you provide, including your name, mobile number, email address, and the nature of your enquiry.</p>
            <p className="mt-2">We may also automatically collect technical information such as your IP address, browser type, and the pages you visit, for security and analytics purposes.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-3">2. How We Use Your Information</h2>
            <p>We use your personal information solely to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
              <li>Respond to your enquiries and provide information about Rock One Square</li>
              <li>Schedule site visits and follow up on your interest</li>
              <li>Send you relevant project updates (with your consent)</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-3">3. Data Sharing</h2>
            <p>We do not sell, rent, or share your personal information with third parties for their marketing purposes. Your details may be shared with our sales team members at Senflore Hospitality LLP for the purpose of responding to your enquiry.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-3">4. Data Retention</h2>
            <p>We retain your enquiry data for a reasonable period necessary to manage our business relationship and comply with legal requirements. You may request deletion of your data by contacting us.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of the personal information we hold about you. To exercise these rights, please contact us using the details on our Contact page.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-3">6. Contact</h2>
            <p>For privacy-related queries, contact Senflore Hospitality LLP at the address listed on the Contact page.</p>
          </section>

          <p className="text-white/25 text-xs border-t border-white/5 pt-4">
            Last updated: [Date — to be updated before publication]. This policy is subject to change.
          </p>
        </div>
      </div>
    </div>
  )
}
