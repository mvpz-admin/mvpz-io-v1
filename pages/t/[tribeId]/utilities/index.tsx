import React from 'react';

const UtilitiesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-inter px-[10px] pt-[128px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl mb-8">
        <span className="bg-white/10 text-sm px-3 py-1 rounded-full">Exclusive Access</span>
        <h1 className="text-4xl font-semibold mt-4 mb-2">Surge Utilities</h1>
        <p className="text-gray-200 mb-4">Unlock exclusive utilities and benefits that give you an edge in the marketplace.</p>
        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
          Explore Utilities
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {['All', 'Access', 'Rewards', 'Financial'].map((tab) => (
          <button
            key={tab}
            className={`px-[10px] py-2 rounded-lg ${
              tab === 'All' ? 'bg-gray-800' : 'bg-gray-800/50'
            } hover:bg-gray-800 transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Utility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Exclusive Airdrops */}
        <div className="bg-secondary rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gray-700 rounded-lg">🎁</span>
              <h3 className="font-semibold">Exclusive Airdrops</h3>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <span className="text-sm text-purple-400">Rewards</span>
          <p className="text-gray-400 text-sm mb-4">Receive exclusive airdrops of rare cards and special items not available to the general public.</p>
          <button className="w-full bg-black py-2 rounded-lg hover:bg-gray-700 transition">
            View Upcoming
          </button>
        </div>

        {/* Card 2 - Early Access */}
        <div className="bg-secondary rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gray-700 rounded-lg">⏰</span>
              <h3 className="font-semibold">Early Access</h3>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <span className="text-sm text-blue-400">Access</span>
          <p className="text-gray-400 text-sm mb-4">Get early access to new collections and features before they're available to everyone else.</p>
          <button className="w-full bg-black py-2 rounded-lg hover:bg-gray-700 transition">
            See Schedule
          </button>
        </div>

        {/* Card 3 - Reduced Fees */}
        <div className="bg-secondary rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gray-700 rounded-lg">💰</span>
              <h3 className="font-semibold">Reduced Fees</h3>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <span className="text-sm text-green-400">Financial</span>
          <p className="text-gray-400 text-sm mb-4">Enjoy significantly reduced marketplace fees on all your transactions.</p>
          <button className="w-full bg-black py-2 rounded-lg hover:bg-gray-700 transition">
            View Savings
          </button>
        </div>

        {/* Card 4 - Exclusive Events */}
        <div className="bg-secondary rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gray-700 rounded-lg">🎉</span>
              <h3 className="font-semibold">Exclusive Events</h3>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <span className="text-sm text-blue-400">Access</span>
          <p className="text-gray-400 text-sm mb-4">Access to exclusive virtual and real-world events only for Surge members.</p>
          <button className="w-full bg-black py-2 rounded-lg hover:bg-gray-700 transition">
            View Events
          </button>
        </div>

        {/* Card 5 - Staking Rewards */}
        <div className="bg-secondary rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gray-700 rounded-lg">⚡</span>
              <h3 className="font-semibold">Staking Rewards</h3>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <span className="text-sm text-green-400">Financial</span>
          <p className="text-gray-400 text-sm mb-4">Earn passive income by staking your cards and earning rewards over time.</p>
          <button className="w-full bg-black py-2 rounded-lg hover:bg-gray-700 transition">
            Start Staking
          </button>
        </div>

        {/* Card 6 - Whitelist Opportunities */}
        <div className="bg-secondary rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gray-700 rounded-lg">⭐</span>
              <h3 className="font-semibold">Whitelist Opportunities</h3>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <span className="text-sm text-blue-400">Access</span>
          <p className="text-gray-400 text-sm mb-4">Get automatic whitelist spots for partner projects and new collections.</p>
          <button className="w-full bg-black py-2 rounded-lg hover:bg-gray-700 transition">
            View Whitelists
          </button>
        </div>
      </div>

      {/* How Surge Works */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center mb-8">How Surge Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-ternary rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Hold to Earn</h3>
            <p className="text-gray-400">
              Simply hold Surge tokens in your wallet to automatically qualify for all exclusive utilities and benefits. The more tokens you hold, the greater your rewards.
            </p>
            <button className="mt-4 flex items-center text-purple-400 hover:text-purple-300">
              Learn More <span className="ml-2">→</span>
            </button>
          </div>
          <div className="bg-ternary rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Tiered Benefits</h3>
            <p className="text-gray-400">
              Our tiered system provides increasing benefits based on your Surge level. Advance through tiers by increasing your holdings or participating in community activities.
            </p>
            <button className="mt-4 flex items-center text-purple-400 hover:text-purple-300">
              View Tiers <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Surge Ahead?</h2>
        <p className="text-gray-200 mb-6">
          Join the Surge community today and unlock all exclusive utilities to enhance your collecting experience.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            Get Surge Tokens
          </button>
          <button className="bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtilitiesPage;
