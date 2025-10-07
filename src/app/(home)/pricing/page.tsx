"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Core",
    price: 52,
    note: "For first 6 months",
    features: [
      "Employee Records Management",
      "Employee Self-Service Portal",
      "Leave Requests, Approvals & Accruals",
      "Onboarding Checklists",
      "Company Library, Org Chart + More",
      "Up to 5 Admin Users",
      "3 Implementation Sessions Included",
    ],
  },
  {
    name: "Premium",
    price: 65,
    note: "For first 6 months",
    features: [
      "All Core HR functionality",
      "Recruitment & Applicant Tracking",
      "Performance Reviews & Employee Goals",
      "Enhanced Approval Workflows",
      "Timesheets & Clock-in / Clock-Out",
      "eSignatures",
      "Up to 10 Admin Users",
      "3 Implementation Sessions Included",
    ],
  },
  {
    name: "VIP",
    price: 94,
    note: "For first 6 months",
    features: [
      "All Premium features + extra support",
      "Priority Support",
      "Dedicated Account Manager",
      "Custom Domain (CNAME)",
      "Custom Leave Displays",
      "Custom Employee Training Video",
      "Unlimited Admin Users",
      "5 Implementation Sessions Included",
    ],
  },
]

const PricingPage = () => {
  return (
    <div className="min-h-screen px-2 bg-muted/20 flex flex-col items-center py-10">
      {/* Short Headings */}
      
      <h1 className="text-3xl text-center font-bold text-foreground mb-8">
        Choose the Right Plan for Your Team
      </h1>

      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="flex flex-col justify-between border-primary/10 shadow-md  transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">
                {plan.name}
              </CardTitle>
              <p className="text-4xl font-bold mt-2">${plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.note}</p>
            </CardHeader>

            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4" variant="default">
                Choose {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-muted-foreground text-sm">
        Try HR Partner for yourself — No credit card required.
      </p>
    </div>
  )
}

export default PricingPage
