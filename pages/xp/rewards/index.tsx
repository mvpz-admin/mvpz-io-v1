import React from 'react'
import XpLayout from '../../../core/Layout/XpLayout'
import Image from 'next/image'
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  return (
    <XpLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
  
        <h1 className="text-3xl font-bold text-gray-200 mb-4">No Rewards Yet</h1>
        <p className="text-gray-400 text-center max-w-md mb-8">
          Complete stages and earn XP to unlock exclusive rewards. Keep progressing to access special perks and benefits!
        </p>
        <button 
          onClick={() => router.push("/xp")}
          className="px-6 py-3 bg-ternary text-white rounded-lg font-semibold transition-colors duration-200"
        >
          View Progress
        </button>
      </div>
    </XpLayout>
  )
}

export default index