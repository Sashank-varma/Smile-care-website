##🦷 AI-Based Dental Appointment Automation System

An intelligent appointment booking system for dental clinics that automatically contacts patients after form submission using n8n automation and AI voice calling.

📌 Project Description

This project automates the patient appointment process for a dental clinic.
When a patient submits an appointment request through the clinic website, the system instantly triggers an automated workflow that places a confirmation call using an AI voice agent.

This reduces manual receptionist work and improves patient experience.

🎯 Objectives

Automate appointment booking

Instantly contact patients after form submission

Reduce manual phone calls

Improve clinic efficiency

Store appointment data for tracking and analysis

✨ Features
🌐 Website

Responsive dental clinic landing page

Appointment booking form

Input validation

Clean and user-friendly UI

🤖 Automation

n8n webhook integration

Automatic workflow execution

Secure API authentication (Bearer Token)

📞 AI Voice Agent

Human-like conversation

Confirms patient details

Schedules appointments

Professional and friendly tone

📊 Data Management

Appointment data stored in Google Sheets

Real-time updates

Easy access for doctors/admins

🧩 System Architecture
Patient → Website Form
        → n8n Webhook (Production)
        → HTTP Request Node (API)
        → AI Voice Agent
        → Patient Call Confirmation
        → Google Sheets / Dashboard

🚀 Technologies Used
Frontend

HTML

CSS

JavaScript

Automation & Backend

n8n

Webhooks

HTTP Request Node

Bearer Token Authentication

AI & Telephony

Retell AI / OmniDimen AI

Twilio (Phone number & calling)

Data Storage

Google Sheets

📋 Appointment Form Fields

Patient Name

Phone Number

Email Address

Clinic Name

Service Required

🔗 Webhook Details

Method: POST

Webhook Type: Production

Authentication: Bearer Token

Example:

Authorization: Bearer YOUR_API_KEY


✅ Production webhook is used for live website integration.

🧪 Test vs Production Webhook
Webhook Type	Usage
Test URL	Used only inside n8n
Production URL	Used in live website
🎨 UI Design

Medical-themed color palette

Simple and clean layout

Mobile-friendly design

Easy navigation

📱 Responsive Design

Desktop

Tablet

Mobile

Touch-optimized inputs

🛠️ Setup Instructions
1️⃣ Frontend Setup

Download project files

Open index.html

Update webhook URL in JavaScript file

2️⃣ n8n Setup

Create a webhook node

Copy production webhook URL

Add HTTP Request node

Configure API key

Connect AI calling workflow

3️⃣ AI Calling Setup

Purchase phone number (Twilio)

Configure SIP trunk

Connect with AI voice platform

Test call flow

🔐 Security

API keys stored securely in n8n

No sensitive data exposed in frontend

HTTPS webhooks used

🎓 Academic Use

Suitable for college mini/major project

Real-time automation use case

AI + Web + Cloud integration

Demonstrates modern healthcare automation

📄 License

This project is created for educational purposes.

✅ Built for Smart Dental Healthcare Automation 🦷🤖

If you want: