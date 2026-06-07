"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { ContactSchema, type ContactForm } from "@/lib/schemas";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data, errors, isSubmitting, setValue, handleSubmit, reset } = useForm(ContactSchema);

  const onSubmit = async (formData: ContactForm) => {
    try {
      setError(null);
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          subject: formData.subject || "General Inquiry",
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while sending your message");
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-green-200 bg-green-50 p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-green-800">Message Sent Successfully!</h2>
          <p className="mb-4 text-green-700">
            Thank you for contacting us. We&#39;ll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setError(null);
              reset();
            }}
            variant="outline"
            className="bg-transparent">
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          We&#39;d love to hear from you. Send us a message and we&#39;ll respond as soon as
          possible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="h-full rounded-xl border p-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Address</h3>
                  <p className="text-muted-foreground">
                    Osaka Riverview Apartment
                    <br />
                    Jl. Raya Boulevard Osaka PIK 2, Salembaran, Kec. Kosambi, Kabupaten Tangerang, Banten 15214
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Phone</h3>
                  <p className="text-muted-foreground">
                    Support: 08xxxxxxxx
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
                  <p className="text-muted-foreground">
                    niscalis.official@gmail.com  
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="mb-4 font-semibold text-gray-900">Frequently Asked</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Order Status</h4>
                  <p className="text-muted-foreground text-sm">
                    Track your order in your account dashboard
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Returns</h4>
                  <p className="text-muted-foreground text-sm">30-day return policy on all items</p>
                </div>
                {/* <div>
                  <h4 className="text-sm font-medium text-gray-900">Shipping</h4>
                  <p className="text-muted-foreground text-sm">Free shipping on orders over $100</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Send us a Message</h2>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}
              className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={data.firstName || ""}
                    onChange={(e) => setValue("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={data.lastName || ""}
                    onChange={(e) => setValue("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={data.email || ""}
                    onChange={(e) => setValue("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(+62) 812-3456-1111"
                    value={data.phone || ""}
                    onChange={(e) => setValue("phone", e.target.value)}
                  />
                </div>
              </div>


              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  value={data.subject || ""}
                  onChange={(e) => setValue("subject", e.target.value)}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Please describe your inquiry in detail..."
                  value={data.message || ""}
                  onChange={(e) => setValue("message", e.target.value)}
                  className={`focus:ring-primary w-full resize-none rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                  I&#39;d like to receive updates about new products and promotions
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">Visit Our Store</h2>
        <div className="relative h-96 overflow-hidden rounded-xl bg-gray-100">
          {/* Placeholder for map - in a real app, you'd use Google Maps, Mapbox, etc. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="text-muted-foreground mb-2 text-lg font-semibold">Interactive Map</h3>
              <p className="text-gray-500">Jl. Raya Boulevard Osaka PIK 2, Salembaran, Kec. Kosambi, Kabupaten Tangerang, Banten 15214</p>
              <Button
                variant="outline"
                className="mt-4 bg-white"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/Osaka+Riverview+Apartment/@-6.0580861,106.6785316,16.8z/data=!4m6!3m5!1s0x2e6a0574f2e0a831:0x7393c86ad49b95!8m2!3d-6.057847!4d106.6785641!16s%2Fg%2F11g1mwkpcy?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
                    "_blank"
                  )
                }>
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Phone className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Call Us</h3>
          <p className="text-muted-foreground text-balance">
            Speak directly with our customer service team for immediate assistance.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Email Support</h3>
          <p className="text-muted-foreground text-balance">
            Send us an email and we&#39;ll respond within 24 hours during business days.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <MapPin className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Visit Store</h3>
          <p className="text-muted-foreground text-balance">
            Come visit our physical location to see our products in person.
          </p>
        </div>
      </div>
    </div>
  );
}
