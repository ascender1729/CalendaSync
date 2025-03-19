import React from 'react';
import { Check, Star } from 'lucide-react';
import type { PricingTier } from '../../data/pricing';

interface PricingCardProps {
  tier: PricingTier;
  isAnnual?: boolean;
}

export function PricingCard({ tier, isAnnual = false }: PricingCardProps) {
  // Calculate monthly price (no change for monthly billing)
  const monthlyPrice = tier.price;

  // Calculate annual total before discount
  const annualTotal = +(monthlyPrice * 12).toFixed(2);

  // Calculate discounted annual price (20% off total)
  const discountedAnnualTotal = isAnnual
    ? +(annualTotal * (1 - (tier.annualDiscount || 0) / 100)).toFixed(2)
    : annualTotal;

  // Calculate monthly equivalent when paying annually
  const monthlyEquivalent = +(discountedAnnualTotal / 12).toFixed(2);

  // Calculate total savings for annual plan
  const annualSavings = +(annualTotal - discountedAnnualTotal).toFixed(2);

  // Display price is either monthly price or monthly equivalent of annual price
  const displayPrice = isAnnual ? monthlyEquivalent : monthlyPrice;

  return (
    <div 
      className={`relative rounded-2xl bg-white p-8 shadow-lg flex flex-col transform transition-all duration-300 hover:scale-105 ${
        tier.isPopular 
          ? 'ring-2 ring-indigo-600 shadow-xl' 
          : 'ring-1 ring-gray-200 hover:ring-indigo-300'
      }`}
    >
      {tier.badge && (
        <div className="absolute -top-4 right-8">
          <div className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white flex items-center">
            {tier.badge === 'Most Popular' && <Star className="w-3 h-3 mr-1" />}
            {tier.badge}
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
        <p className="mt-2 text-gray-500">{tier.description}</p>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">
              ${displayPrice}
            </span>
            <span className="text-gray-500 ml-1">/month</span>
          </div>
          {isAnnual && tier.price > 0 && (
            <div className="mt-1 text-sm">
              <span className="text-green-600 font-medium">
                Save ${annualSavings}/year
              </span>
              <span className="text-gray-500 ml-2">
                (${discountedAnnualTotal}/year)
              </span>
            </div>
          )}
        </div>
      </div>

      <ul className="mb-8 space-y-4 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full rounded-xl px-6 py-3 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 ${
          tier.isPopular
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600'
        }`}
      >
        {tier.ctaText || `Get started with ${tier.name}`}
      </button>
    </div>
  );
}