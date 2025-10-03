"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic client-side validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      setIsSubmitting(false);
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("Please enter a subject");
      setIsSubmitting(false);
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Thank you for your message! We'll get back to you soon."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or just want to say hello? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Whether you&apos;re looking for partnership opportunities, have
                feedback about our platform, or just want to chat about anime,
                we&apos;re here to listen.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-400">hello@animachi.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors cursor-pointer">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors cursor-pointer">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors cursor-pointer">
                    <span className="text-white font-bold text-sm">Y</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:ring-purple-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:ring-purple-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:ring-purple-500"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:ring-purple-500 resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
