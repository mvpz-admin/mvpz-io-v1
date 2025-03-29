import React, { useEffect, useState } from 'react'
import { callAPI } from '../../../lib/utils';

interface XpType {
  name: string;
  description: string;
  limit: number;
  xpValue: number;
  earnings: any[];
}

interface Stage {
  id: string;
  name: string;
  order: number;
  description: string;
  rewards: { name: string; description: string; }[];
  xpTypes: XpType[];
}

const Leaderboards = () => {
  const [stages, setStages] = useState<Stage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await callAPI({endpoint : "/v1/xp/xpLeaderboard"});
      setStages(response.data);
    };
    fetchData();
  }, []);

  const calculateTotalXp = (xpTypes: XpType[]) => {
    return xpTypes.reduce((total, type) => {
      return total + (type.earnings.length * type.xpValue);
    }, 0);
  };

  return (
    <div className='relative w-full h-full md:px-20'>
      {stages?.map((stage) => (
        <div key={stage.id} className='space-y-8 relative w-full border-2 border-gray-800 rounded-2xl p-10 mb-8'>
          <h2 className='text-4xl font-bold mb-12'>{stage.name}</h2>
          
          {/* Progress Items */}
          <div className='space-y-8 text-xl'>
            {stage?.xpTypes.map((xpType, index) => (
              <div key={index} className='flex justify-between items-center'>
                <span className='text-xl'>{xpType.name}</span>
                <div className='flex items-center'>
                  {xpType.earnings.length > 0 && (
                    <span className='text-green-400 mr-3 text-2xl'>✓</span>
                  )}
                  <span>{xpType.xpValue} XP</span>
                </div>
              </div>
            ))}

            <div className='flex justify-between items-center pt-6 border-t border-gray-800'>
              <span className='text-gray-400 text-2xl'>Total XP earned</span>
              <span>{calculateTotalXp(stage.xpTypes)} XP</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className='h-2 bg-gray-800 rounded-full mt-6'>
            <div 
              className='h-full bg-green-400 rounded-full'
              style={{ width: `${(calculateTotalXp(stage.xpTypes) / (stage.xpTypes.reduce((total, type) => total + type.xpValue, 0))) * 100}%` }}
            ></div>
          </div>

          {/* Complete Stage Button */}
          <button className='w-full py-6 px-8 rounded-2xl bg-gray-900 mt-8 flex justify-between items-center text-xl'>
            <span className='text-green-400'>Complete {stage.name}</span>
            <span className='text-gray-400'>{stage.rewards[0]?.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Leaderboards;