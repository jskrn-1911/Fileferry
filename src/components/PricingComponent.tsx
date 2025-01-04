
import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: 'Dedicated support and infrastructure for your company.',
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Team',
    id: 'tier-team',
    href: '#',
    priceMonthly: '$50',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      //   'Marketing automations',
      //   'Custom integrations',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      //   'Marketing automations',
      //   'Custom integrations',
    ],
    featured: true,
  },
]





export default function PricingComponent() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'annual'>('monthly');
  const handlePriceChange = (type: 'monthly' | 'annual') => {
    setActiveTab(type);
  }
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
        loyalty, and driving sales.
      </p>
      <div className="tab-container max-w-[200px] sm:max-w-[400px] mx-auto mt-[50px] text-slate-950">
        <button className={`${activeTab === 'monthly' ? 'active' : ''} tab tab--1`} onClick={() => handlePriceChange('monthly')}>Monthly</button>
        <button className={`${activeTab === 'annual' ? 'active' : ''} tab tab--2`} onClick={() => handlePriceChange('annual')}>Annual</button>
        <div className="indicator" />
      </div>
      <div className="mx-auto mt-16 grid  grid-cols-12  items-center  sm:mt-20  gap-[20px] md:gap-[25px] lg:gap-[36px] max-w-[1300px]">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={`  rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 lg:col-span-4  sm:col-span-6  col-span-12  ${tierIdx === 2 ? 'sm:col-start-4 bg-[#5268ff]' : tierIdx === 1 ? 'bg-[#ebedff]' : 'bg-white/60 '}   `
            }
          >
            <h3
              id={tier.id}
              className={` text-base/7 font-semibold ${tierIdx === 2 ? 'text-[#fff]' : 'text-indigo-600'}`}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={`text-5xl font-semibold tracking-tight ${tierIdx === 2 ? 'text-[#fff]' : 'text-gray-900 '}`}

              >
                {tier.priceMonthly}
              </span>
              <span
                className={` text-base ${tierIdx === 2 ? 'text-[#fff]' : 'text-gray-500'}`}

              >/{activeTab === 'annual' ? 'annual' : 'month'}</span>
            </p>
            <p
              className={` mt-6 text-base/7 ${tierIdx === 2 ? 'text-[#fff]' : 'text-gray-600'}`}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={` mt-8 space-y-3 text-sm/6 sm:mt-10 ${tierIdx === 2 ? 'text-[#fff]' : 'text-gray-600'}`}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <IoCheckmarkOutline
                    aria-hidden="true"
                    className={` h-6 w-5 flex-none ${tierIdx === 2 ? 'text-[#fff]' : 'text-indigo-600'}`}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={`text-indigo-600 border-indigo-500 border transition-all duration-[0.5s] hover:text-white  mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold   sm:mt-10 ${tierIdx === 2 ? 'bg-[#fff] hover:bg-[#5268ff] border-white hover:border-white' : 'hover:bg-indigo-600'}`
              }

            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
