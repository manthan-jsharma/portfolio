"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Brevo from "@getbrevo/brevo";
import BrevoApi from "@getbrevo/brevo";
interface EmailData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const brevo = new BrevoApi({
    headers: {
      "api-key": process.env.YOUR_BREVO_API_KEY,
    },
  });

  const sendEmail = async (emailData: EmailData) => {
    try {
      const response = await brevo.smtp.sendTransacEmail({
        subject: "new message from portfolio",
        htmlContent: `
          <html>
            <body>
              <h1>New Message from Contact Page</h1>
              <p>Name: ${emailData.name}</p>
              <p>Email: ${emailData.email}</p>
              <p>Message: ${emailData.message}</p>
            </body>
          </html>
        `,
        sender: {
          name: "Your Name",
          email: "your-email@example.com",
        },
        to: [
          {
            email: "your-email@example.com",
            name: "Your Name",
          },
        ],
        replyTo: {
          email: emailData.email,
          name: emailData.name,
        },
      });

      console.log(
        "API called successfully. Returned data: " + JSON.stringify(response)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailData: EmailData = {
      name: formState.name,
      email: formState.email,
      message: formState.message,
    };

    sendEmail(emailData)
      .then(() => {
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error(error);
      });

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setFormState({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div ref={sectionRef} className="bg-muted/40 py-24" id="contact">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a project in mind or want to collaborate? Send me a message and
            let's create something amazing together.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6 opacity-0"
        >
          <div className="space-y-2">
            <Input
              name="name"
              placeholder="Your Name"
              value={formState.name}
              onChange={handleChange}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={handleChange}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formState.message}
              onChange={handleChange}
              required
              className="min-h-[150px] bg-background"
            />
          </div>

          <Button
            type="submit"
            className="w-full group"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
      </div>
    </div>
  );
}
