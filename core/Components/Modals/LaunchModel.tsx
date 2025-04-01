import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home({setShowOnboarding}: {setShowOnboarding: (show: boolean) => void}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userType, setUserType] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 30
  })
  const [userInfo, setUserInfo] = useState<any>({
    name: '',
    instagram: '',
    school: '',
    sports: '',
    position: '',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          clearInterval(timer)
          localStorage.setItem('hasSeenOnboarding', 'true')
          setShowOnboarding(false)
          return { hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          userType,
          ...userInfo
        }),
      })
      
      if (!response.ok) throw new Error('Subscription failed')
      setSubmitted(true)
      setShowModal(false)
      setEmail('')
     
    } catch (error) {
     
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 min-h-screen w-full bg-black text-white overflow-hidden z-50">


      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="md:block hidden absolute inset-0 bg-[url('https://res.cloudinary.com/dv667zlni/image/upload/v1742380720/Crick_1_xeyl6s.webp')] bg-cover bg-center bg-no-repeat opacity-40" />
        <div className="md:hidden block absolute inset-0 bg-[url('https://res.cloudinary.com/dg0ahswkh/image/upload/v1742451679/Untitled_design_vyoo9f.webp')] bg-cover bg-center bg-no-repeat opacity-40 scale-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Ambient light effect */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-0 z-30">
        <div className="w-full max-w-3xl text-center space-y-6 sm:space-y-8">
          {/* Version badge */}
          <div className="inline-flex px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-xs font-medium text-white/70">
              Coming Soon • V1.2
            </p>
          </div>

          {/* Company Logo */}
          <div className="flex justify-center items-center ">
            <img 
              src="/images/logos/logo-transparent.png" 
              alt="MVPz Logo" 
              className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </div>

          {/* Main content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-indigo-400/80">
                Launching in
              </p>
              <div className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white/90 !font-monumentUltraBold flex justify-center items-center ">
                <div>{`${String(timeLeft.hours).padStart(2, '0')}`}<span className="text-indigo-400/80 text-2xl ml-1">h</span></div> <span className='mx-4'>:</span><div> {`${String(timeLeft.minutes).padStart(2, '0')}`}<span className="text-indigo-400/80 text-2xl ml-1">m</span></div> <span className='mx-4'>:</span> <div>{`${String(timeLeft.seconds).padStart(2, '0')}`}<span className="text-indigo-400/80 text-2xl ml-1">s</span></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-inter text-white/60 font-light max-w-xl mx-auto px-4 sm:px-0">
                With a fresh new interface and several new features V1.2 is ready for launch. Get ready for a social platform just for NCAA college sports. Where sports fans get unprecedented access to athlete created content
              </p>
            </div>
          </div>

          {/* Email signup */}
          <div className="max-w-sm mx-auto pt-2 sm:pt-4 px-4 sm:px-0">
            {!submitted ? (
              <form onSubmit={() => {}} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access"
                  className="flex-1 px-3 py-2.5 text-xs text-white bg-white/5 border border-white/10 rounded-lg placeholder-white/30 focus:outline-none focus:border-white/20 focus:ring-0"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-medium rounded-lg bg-white text-black hover:bg-white/90 w-full sm:w-auto"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="text-xs text-white/70">
                ✨ You'll be the first to know when we launch
              </div>
            )}
          </div>

          {/* Minimal social links */}
          <div className="flex justify-center items-center space-x-6 pt-2 sm:pt-4">
            <a 
              href="https://x.com/mvpz_sport" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-white/60 transition-colors duration-200"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/mvpz_sport/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-white/60 transition-colors duration-200"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@mvpz.sports" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-white/60 transition-colors duration-200"
            >
              <span className="sr-only">TikTok</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.48 6.37 6.37 0 002.14-4.77V8.73a8.16 8.16 0 004.59 1.42V6.69h-1z"/>
              </svg>
            </a>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-black/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10">
            {!userType ? (
              // User Type Selection
              <div>
                <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 font-inter">
                  <h3 className="text-xl sm:text-2xl font-bold text-white/90 text-center">Choose Your Path</h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/60 text-center font-light">
                    Select how you want to join the community
                  </p>
                </div>
                <div className="px-6 sm:px-8 pb-8 sm:pb-10">
                  <div className="space-y-3">
                    <button
                      onClick={() => setUserType('athlete')}
                      className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <div className="text-sm text-white/90 font-semibold">Athlete</div>
                          <div className="text-xs text-white/40 font-medium">Create your athlete profile</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setUserType('fan')}
                      className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-left font-inter">
                          <div className="text-sm text-white/90 font-semibold">Sports Fan</div>
                          <div className="text-xs text-white/40 font-medium">Join as a fan and follow athletes</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // User Info Form
              <div>
                <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 font-inter">
                  <button 
                    onClick={() => setUserType(null)}
                    className="mb-6 text-xs text-white/40 hover:text-white/60 transition-colors duration-200 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <h3 className="text-xl sm:text-2xl font-bold text-white/90">
                    {userType === 'athlete' ? 'Athlete Profile' : 'Fan Profile'}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/60 font-light">
                    {userType === 'athlete' 
                      ? 'Fill some details'
                      : 'Tell us about your interests'
                    }
                  </p>
                </div>
                <form onSubmit={handleFinalSubmit} className="px-6 sm:px-8 pb-8 sm:pb-10">
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">Name</label>
                      <input
                        type="text"
                        required
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        className="w-full px-4 py-2.5 sm:py-3 text-sm text-white bg-white/5 border border-white/5 rounded-xl placeholder-white/20 focus:outline-none focus:border-white/10 focus:ring-0 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">Instagram</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">@</span>
                        <input
                          type="text"
                          required
                          value={userInfo.instagram}
                          onChange={(e) => setUserInfo({...userInfo, instagram: e.target.value})}
                          className="w-full pl-8 pr-4 py-3 text-sm text-white bg-white/5 border border-white/5 rounded-xl placeholder-white/20 focus:outline-none focus:border-white/10 focus:ring-0 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">School</label>
                      <input
                        type="text"
                        required
                        value={userInfo.school}
                        onChange={(e) => setUserInfo({...userInfo, school: e.target.value})}
                        className="w-full px-4 py-3 text-sm text-white bg-white/5 border border-white/5 rounded-xl placeholder-white/20 focus:outline-none focus:border-white/10 focus:ring-0 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        {userType === 'athlete' ? 'Sport' : 'Favorite Sport'}
                      </label>
                      <input
                        type="text"
                        required
                        value={userInfo.sports}
                        onChange={(e) => setUserInfo({...userInfo, sports: e.target.value})}
                        className="w-full px-4 py-3 text-sm text-white bg-white/5 border border-white/5 rounded-xl placeholder-white/20 focus:outline-none focus:border-white/10 focus:ring-0 transition-all duration-200"
                      />
                    </div>
                    {userType === 'athlete' && (
                      <div>
                        <label className="block text-xs text-white/40 mb-2 font-medium">Position</label>
                        <input
                          type="text"
                          required
                          value={userInfo.position}
                          onChange={(e) => setUserInfo({...userInfo, position: e.target.value})}
                          className="w-full px-4 py-3 text-sm text-white bg-white/5 border border-white/5 rounded-xl placeholder-white/20 focus:outline-none focus:border-white/10 focus:ring-0 transition-all duration-200"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-4 py-3.5 text-sm font-medium rounded-xl bg-white text-black hover:bg-white/90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        'Continue'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                        setUserType(null)
                        setUserInfo({name: '', instagram: '', school: '', sports: '', position: ''})
                      }}
                      className="w-full mt-3 px-4 py-3.5 text-sm font-medium text-white/60 hover:text-white/90 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
