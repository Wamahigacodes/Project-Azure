import React, { useState, useEffect } from 'react';
import { Cloud, Brain, Database, Lock, Zap, Trophy, Star, CheckCircle, ArrowRight, Lightbulb, Users, Target, Award, Flame, Heart, Timer, Medal, Crown, Sparkles, Server, Globe, Shield, Cpu } from 'lucide-react';

const AzureGamePresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [badges, setBadges] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [caseSolutions, setCaseSolutions] = useState({});
  const [showCaseResults, setShowCaseResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [multiplier, setMultiplier] = useState(1);
  const [powerUps, setPowerUps] = useState({ hint: 3, timeFreeze: 1, doublePoints: 2 });
  const [activePowerUp, setActivePowerUp] = useState(null);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(xp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      unlockAchievement('Level Up!', `Reached Level ${newLevel}! 🎉`);
      setLives(Math.min(lives + 1, 5));
    }
  }, [xp]);

  const unlockAchievement = (title, description) => {
    const achievement = { title, description, time: new Date().toLocaleTimeString() };
    setAchievements([...achievements, achievement]);
    setShowAchievement(achievement);
    setTimeout(() => setShowAchievement(null), 3000);
  };

  const addBadge = (badgeName) => {
    if (!badges.includes(badgeName)) {
      setBadges([...badges, badgeName]);
      unlockAchievement('New Badge!', `Earned: ${badgeName} 🏆`);
    }
  };

  const usePowerUp = (type) => {
    if (powerUps[type] > 0) {
      setPowerUps({...powerUps, [type]: powerUps[type] - 1});
      setActivePowerUp(type);
      
      if (type === 'doublePoints') {
        setMultiplier(2);
        setTimeout(() => {
          setMultiplier(1);
          setActivePowerUp(null);
        }, 30000);
      }
      
      unlockAchievement('Power-Up Activated!', `${type} is now active! ⚡`);
    }
  };

  const slides = [
    {
      type: 'welcome',
      title: 'Welcome to Azure Cloud Quest! 🎮',
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <Cloud className="w-32 h-32 text-blue-500 animate-bounce" />
              <Sparkles className="w-12 h-12 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
            </div>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Epic Cloud Adventure Awaits!
          </h2>
          <p className="text-2xl text-gray-700">Complete challenges, earn XP, unlock badges!</p>
          
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-lg transform hover:scale-105 transition">
              <Trophy className="w-12 h-12 mx-auto mb-2" />
              <p className="font-bold text-lg">Earn Points</p>
              <p className="text-sm">Answer correctly!</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-6 rounded-lg transform hover:scale-105 transition">
              <Flame className="w-12 h-12 mx-auto mb-2" />
              <p className="font-bold text-lg">Build Streaks</p>
              <p className="text-sm">Consecutive wins!</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-6 rounded-lg transform hover:scale-105 transition">
              <Award className="w-12 h-12 mx-auto mb-2" />
              <p className="font-bold text-lg">Unlock Badges</p>
              <p className="text-sm">Collect them all!</p>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto">
            <h3 className="font-bold text-xl mb-3">Game Rules:</h3>
            <ul className="text-left space-y-2">
              <li>❤️ You have 3 lives - don't lose them all!</li>
              <li>⚡ Use power-ups strategically</li>
              <li>🔥 Build streaks for bonus points</li>
              <li>⏱️ Speed bonuses for quick answers</li>
              <li>🏆 Earn badges and level up!</li>
            </ul>
          </div>
        </div>
      )
    },
    
    {
      type: 'content',
      session: 1,
      title: 'Azure Cloud Basics - Level 1 🌐',
      challenge: 'Read carefully - quiz coming soon!',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold mb-4">What is Azure Cloud?</h3>
            <p className="text-xl">Think of it as a MASSIVE gaming server - but for everything! 🎮</p>
            <p className="text-lg mt-3">Microsoft Azure is a cloud computing platform with 200+ products and services to help you build, run, and manage applications across multiple clouds, on-premises, and at the edge.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-5 rounded-lg border-4 border-blue-300 transform hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-10 h-10 text-blue-600" />
                <h4 className="font-bold text-xl">Pay-As-You-Go</h4>
              </div>
              <p className="text-lg mb-2">Like Netflix - pay monthly for what you use!</p>
              <p className="text-sm text-gray-600">No huge upfront costs. Scale costs with usage. Cancel anytime.</p>
              <div className="mt-3 bg-blue-200 p-2 rounded text-sm font-semibold">💡 Save up to 72% vs traditional IT</div>
            </div>
            
            <div className="bg-green-50 p-5 rounded-lg border-4 border-green-300 transform hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-10 h-10 text-green-600" />
                <h4 className="font-bold text-xl">Instant Scaling</h4>
              </div>
              <p className="text-lg mb-2">Need more power? Get it in seconds!</p>
              <p className="text-sm text-gray-600">Auto-scale during traffic spikes. Scale down when quiet. Handle millions of users.</p>
              <div className="mt-3 bg-green-200 p-2 rounded text-sm font-semibold">⚡ From 1 to 1000 servers instantly</div>
            </div>
            
            <div className="bg-purple-50 p-5 rounded-lg border-4 border-purple-300 transform hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-10 h-10 text-purple-600" />
                <h4 className="font-bold text-xl">Enterprise Security</h4>
              </div>
              <p className="text-lg mb-2">Protected by Microsoft's best security!</p>
              <p className="text-sm text-gray-600">24/7 monitoring. Built-in DDoS protection. 90+ compliance certifications.</p>
              <div className="mt-3 bg-purple-200 p-2 rounded text-sm font-semibold">🔒 $1 billion+ invested annually</div>
            </div>
            
            <div className="bg-orange-50 p-5 rounded-lg border-4 border-orange-300 transform hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-10 h-10 text-orange-600" />
                <h4 className="font-bold text-xl">Global Reach</h4>
              </div>
              <p className="text-lg mb-2">Access from anywhere on Earth! 🌍</p>
              <p className="text-sm text-gray-600">60+ regions. 140+ countries. Low latency worldwide. 99.99% uptime SLA.</p>
              <div className="mt-3 bg-orange-200 p-2 rounded text-sm font-semibold">🌐 More regions than AWS + Google</div>
            </div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg border-4 border-yellow-400 animate-pulse">
            <p className="text-center text-xl font-bold text-yellow-800">
              🎯 CHALLENGE: Remember these 4 benefits for the quiz! +50 XP each!
            </p>
          </div>
        </div>
      )
    },

    {
      type: 'content',
      session: 1,
      title: 'Azure Core Services - Your Toolkit! 🛠️',
      challenge: 'Master these services!',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold mb-3">The Essential Azure Services</h3>
            <p className="text-xl">Think of these as your superpowers! 💪</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-3">
              <Server className="w-10 h-10 text-blue-600" />
              <h3 className="text-2xl font-bold">1. Virtual Machines (VMs)</h3>
            </div>
            <p className="text-lg mb-2">Your own computer in the cloud!</p>
            <div className="bg-white p-4 rounded-lg mt-3">
              <p className="font-semibold mb-2">What you can do:</p>
              <ul className="space-y-1 text-gray-700">
                <li>✅ Run any operating system (Windows, Linux, etc.)</li>
                <li>✅ Host websites and applications</li>
                <li>✅ Run databases and development environments</li>
                <li>✅ Choose from 700+ VM configurations</li>
              </ul>
              <p className="text-sm text-blue-700 mt-3 font-semibold">💡 Real Example: Netflix uses VMs to encode videos in different qualities!</p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-10 h-10 text-green-600" />
              <h3 className="text-2xl font-bold">2. Azure Storage & Databases</h3>
            </div>
            <p className="text-lg mb-2">Store EVERYTHING safely in the cloud!</p>
            <div className="bg-white p-4 rounded-lg mt-3">
              <p className="font-semibold mb-2">Storage types:</p>
              <ul className="space-y-1 text-gray-700">
                <li>📁 <strong>Blob Storage:</strong> Files, images, videos (unlimited!)</li>
                <li>📊 <strong>SQL Database:</strong> Structured data (like Excel on steroids)</li>
                <li>📝 <strong>Cosmos DB:</strong> Global database for massive apps</li>
                <li>🗃️ <strong>File Storage:</strong> Network drives in the cloud</li>
              </ul>
              <p className="text-sm text-green-700 mt-3 font-semibold">💡 Real Example: Spotify stores 80+ million songs in Azure Storage!</p>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-10 h-10 text-purple-600" />
              <h3 className="text-2xl font-bold">3. Azure AI & Machine Learning</h3>
            </div>
            <p className="text-lg mb-2">Add intelligence to your apps!</p>
            <div className="bg-white p-4 rounded-lg mt-3">
              <p className="font-semibold mb-2">AI capabilities:</p>
              <ul className="space-y-1 text-gray-700">
                <li>👁️ <strong>Computer Vision:</strong> Analyze images & videos</li>
                <li>🗣️ <strong>Speech Services:</strong> Voice recognition & text-to-speech</li>
                <li>💬 <strong>Language Understanding:</strong> Build chatbots</li>
                <li>🤖 <strong>ML Studio:</strong> Create custom AI models (no PhD needed!)</li>
              </ul>
              <p className="text-sm text-purple-700 mt-3 font-semibold">💡 Real Example: Uber uses Azure AI to detect and blur license plates automatically!</p>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-10 h-10 text-orange-600" />
              <h3 className="text-2xl font-bold">4. Azure Functions (Serverless)</h3>
            </div>
            <p className="text-lg mb-2">Run code without managing servers!</p>
            <div className="bg-white p-4 rounded-lg mt-3">
              <p className="font-semibold mb-2">Perfect for:</p>
              <ul className="space-y-1 text-gray-700">
                <li>⚡ Auto-resize images when uploaded</li>
                <li>📧 Send automated emails</li>
                <li>🔄 Process data in real-time</li>
                <li>💰 Pay only when code runs (milliseconds!)</li>
              </ul>
              <p className="text-sm text-orange-700 mt-3 font-semibold">💡 Real Example: Starbucks uses Functions to process millions of mobile orders!</p>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-10 h-10 text-red-600" />
              <h3 className="text-2xl font-bold">5. Azure Security & Networking</h3>
            </div>
            <p className="text-lg mb-2">Protect everything like Fort Knox! 🏰</p>
            <div className="bg-white p-4 rounded-lg mt-3">
              <p className="font-semibold mb-2">Security features:</p>
              <ul className="space-y-1 text-gray-700">
                <li>🔐 <strong>Key Vault:</strong> Store passwords & secrets safely</li>
                <li>🛡️ <strong>Security Center:</strong> 24/7 threat detection</li>
                <li>🌐 <strong>CDN:</strong> Fast global content delivery</li>
                <li>🚪 <strong>Firewall:</strong> Block bad traffic automatically</li>
              </ul>
              <p className="text-sm text-red-700 mt-3 font-semibold">💡 Real Example: BMW uses Azure Security to protect 14 million connected cars!</p>
            </div>
          </div>
        </div>
      )
    },

    {
      type: 'content',
      session: 1,
      title: 'Real-World Magic: Build Instagram Clone! 📱',
      challenge: 'See how it all comes together!',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-lg">
            <h3 className="text-4xl font-bold mb-4">Project: PhotoShare Social Network</h3>
            <p className="text-xl">Let's build a complete app using Azure services!</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg border-4 border-purple-400">
            <h4 className="text-2xl font-bold mb-4 text-purple-800">App Requirements:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-lg">📸 Upload photos & videos</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-lg">👥 10 million users worldwide</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-lg">⚡ Super fast globally</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-lg">🤖 Auto-detect inappropriate content</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Azure App Service</h4>
                <p className="text-gray-700 mb-2">Hosts the website and mobile app backend</p>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="text-sm font-semibold">Why: Auto-scales from 100 to 1 million users instantly!</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Azure Blob Storage</h4>
                <p className="text-gray-700 mb-2">Stores billions of photos and videos</p>
                <div className="bg-green-100 p-3 rounded">
                  <p className="text-sm font-semibold">Why: Unlimited storage, costs pennies per GB!</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Azure AI Vision</h4>
                <p className="text-gray-700 mb-2">Automatically scans every photo uploaded</p>
                <div className="bg-purple-100 p-3 rounded">
                  <p className="text-sm font-semibold">Why: Detects inappropriate content in 0.3 seconds!</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-orange-50 p-5 rounded-lg border-l-4 border-orange-600">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Azure SQL Database</h4>
                <p className="text-gray-700 mb-2">Stores user profiles, comments, likes, followers</p>
                <div className="bg-orange-100 p-3 rounded">
                  <p className="text-sm font-semibold">Why: Handles 100,000+ database queries per second!</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-red-50 p-5 rounded-lg border-l-4 border-red-600">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">5</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Azure CDN</h4>
                <p className="text-gray-700 mb-2">Delivers photos fast to users worldwide</p>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-sm font-semibold">Why: User in Japan loads photos in 0.2 seconds!</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-pink-50 p-5 rounded-lg border-l-4 border-pink-600">
              <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">6</div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-2">Azure Functions</h4>
                <p className="text-gray-700 mb-2">Auto-creates thumbnails when photos upload</p>
                <div className="bg-pink-100 p-3 rounded">
                  <p className="text-sm font-semibold">Why: Processes images in background, zero server management!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h4 className="font-bold text-3xl mb-3">Result: World-Class App! 🌟</h4>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>✅ 99.99% uptime</div>
              <div>✅ Lightning fast globally</div>
              <div>✅ Scales to millions</div>
              <div>✅ Enterprise security</div>
            </div>
          </div>
        </div>
      )
    },

    {
      type: 'mini-game',
      session: 1,
      title: 'BOSS BATTLE: Azure Knowledge Quiz! 🎮',
      questions: [
        {
          id: 1,
          question: 'What is the MAIN cost advantage of Azure Cloud?',
          options: [
            'You must buy expensive servers upfront',
            'Pay only for what you use (like Netflix)',
            'You can only work from the office',
            'More expensive than traditional servers'
          ],
          correct: 1,
          xpReward: 50,
          hint: 'Think about subscription services...'
        },
        {
          id: 2,
          question: 'Which Azure service would you use to store millions of photos?',
          options: [
            'Azure Virtual Machines',
            'Azure Functions',
            'Azure Blob Storage',
            'Azure Brain Power'
          ],
          correct: 2,
          xpReward: 50,
          hint: 'It\'s designed for files and media!'
        },
        {
          id: 3,
          question: 'Azure AI Services can help you build:',
          options: [
            'Physical robots only',
            'Image recognition and chatbots',
            'Office furniture',
            'Paper documents'
          ],
          correct: 1,
          xpReward: 50,
          hint: 'Think intelligent applications...'
        },
        {
          id: 4,
          question: 'What does Azure Functions let you do?',
          options: [
            'Buy more servers',
            'Run code without managing servers',
            'Only send emails',
            'Build robots'
          ],
          correct: 1,
          xpReward: 75,
          hint: 'Serverless computing!'
        },
        {
          id: 5,
          question: 'How many global regions does Azure have?',
          options: [
            'Only 5 regions',
            'Just in the USA',
            '60+ regions worldwide',
            '10 regions total'
          ],
          correct: 2,
          xpReward: 75,
          hint: 'More than any other cloud provider!'
        }
      ]
    },

    {
      type: 'content',
      session: 2,
      title: 'SESSION 2: Real Crisis Challenge! 🚨',
      challenge: 'Time to become a Cloud Solution Architect!',
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <Lightbulb className="w-32 h-32 text-yellow-500 animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            EMERGENCY: GameZone Needs YOU!
          </h2>
          <p className="text-2xl text-gray-700">Put on your solution architect hat 🎩</p>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg max-w-3xl mx-auto">
            <p className="text-2xl font-bold mb-4">Your Mission:</p>
            <p className="text-xl">Match each business problem with the correct Azure service!</p>
            <p className="text-lg mt-4">⚡ This is a multiple-choice challenge - NO WRITING required!</p>
          </div>
        </div>
      )
    },

    {
      type: 'content',
      session: 2,
      title: 'The GameZone Crisis 🎮💥',
      challenge: 'Understand the problems first!',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-16 h-16" />
              <div>
                <h3 className="text-4xl font-bold">GameZone Online Game Store</h3>
                <p className="text-xl">A growing company in BIG trouble!</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-100 p-6 rounded-lg border-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">1</div>
                <h4 className="font-bold text-2xl text-red-800">Website Crashes</h4>
              </div>
              <p className="text-lg mb-3">During new game launches, their website crashes because too many people visit at once!</p>
              <div className="bg-red-200 p-4 rounded-lg">
                <p className="font-bold text-red-900">💸 Impact: Losing $10,000 per minute</p>
                <p className="text-red-800 mt-2">Current: 5 fixed servers that can't handle spikes</p>
              </div>
            </div>

            <div className="bg-orange-100 p-6 rounded-lg border-4 border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">2</div>
                <h4 className="font-bold text-2xl text-orange-800">Slow Globally</h4>
              </div>
              <p className="text-lg mb-3">Customers in Asia and Europe complain the website is extremely slow. All servers are only in the US!</p>
              <div className="bg-orange-200 p-4 rounded-lg">
                <p className="font-bold text-orange-900">😡 Impact: Customers canceling orders</p>
                <p className="text-orange-800 mt-2">Current: Users in Tokyo wait 8 seconds to load a page</p>
              </div>
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg border-4 border-yellow-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">3</div>
                <h4 className="font-bold text-2xl text-yellow-800">Security Risks</h4>
              </div>
              <p className="text-lg mb-3">They store customer payment info and game keys, but worry about hackers and data breaches!</p>
              <div className="bg-yellow-200 p-4 rounded-lg">
                <p className="font-bold text-yellow-900">⚠️ Impact: Could lose customer trust forever</p>
                <p className="text-yellow-800 mt-2">Current: Basic firewall, no advanced protection</p>
              </div>
            </div>

            <div className="bg-purple-100 p-6 rounded-lg border-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">4</div>
                <h4 className="font-bold text-2xl text-purple-800">No Recommendations</h4>
              </div>
              <p className="text-lg mb-3">Competitors use AI to recommend games. GameZone has no smart features and is losing sales!</p>
              <div className="bg-purple-200 p-4 rounded-lg">
                <p className="font-bold text-purple-900">📉 Impact: 30% less sales than competitors</p>
                <p className="text-purple-800 mt-2">Current: No AI capabilities at all</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <h4 className="font-bold text-2xl mb-4 text-yellow-400">📊 Current Situation:</h4>
            <ul className="space-y-2 text-lg">
              <li>• 5 physical servers in one US data center</li>
              <li>• Takes 2-3 weeks to add more capacity</li>
              <li>• No global presence</li>
              <li>• Basic security only</li>
              <li>• No AI or smart features</li>
              <li>• Losing customers to competitors daily</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      type: 'case-matching',
      session: 2,
      title: 'FINAL BOSS: Match Solutions! 🎯',
      challenge: 'Match each problem with the RIGHT Azure service!',
      problems: [
        {
          id: 'crash',
          problem: 'Website crashes during traffic spikes',
          icon: '💥',
          options: [
            'Azure App Service with Auto-Scaling',
            'Azure CDN',
            'Azure Machine Learning',
            'Azure Storage'
          ],
          correct: 0,
          explanation: 'Azure App Service with Auto-Scaling automatically adds more servers during high traffic and scales down when quiet. Perfect for handling unpredictable spikes!'
        },
        {
          id: 'slow',
          problem: 'Slow for international users',
          icon: '🌍',
          options: [
            'Azure Virtual Machines',
            'Azure CDN (Content Delivery Network)',
            'Azure Functions',
            'Azure Security Center'
          ],
          correct: 1,
          explanation: 'Azure CDN caches content in 140+ locations worldwide. Users get content from the nearest server, making it super fast globally!'
        },
        {
          id: 'security',
          problem: 'Need better security for customer data',
          icon: '🔒',
          options: [
            'Azure Blob Storage',
            'Azure AI Vision',
            'Azure Security Center + Key Vault',
            'Azure CDN'
          ],
          correct: 2,
          explanation: 'Azure Security Center provides 24/7 threat detection, and Key Vault safely encrypts and stores sensitive data like passwords and payment info!'
        },
        {
          id: 'ai',
          problem: 'Want AI-powered game recommendations',
          icon: '🤖',
          options: [
            'Azure Storage',
            'Azure Virtual Machines',
            'Azure Machine Learning',
            'Azure App Service'
          ],
          correct: 2,
          explanation: 'Azure Machine Learning analyzes customer behavior and purchase history to recommend games they\'ll love, just like Netflix recommendations!'
        }
      ]
    },

    {
      type: 'victory',
      title: '🎉 QUEST COMPLETE! 🎉',
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center animate-bounce">
            <Crown className="w-40 h-40 text-yellow-500" />
          </div>
          
          <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            VICTORY!
          </h2>

          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-lg">
              <Star className="w-16 h-16 mx-auto mb-3" />
              <p className="text-5xl font-bold mb-2">{score}</p>
              <p className="text-2xl">Total Points</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 rounded-lg">
              <Trophy className="w-16 h-16 mx-auto mb-3" />
              <p className="text-5xl font-bold mb-2">Level {level}</p>
              <p className="text-2xl">{xp} XP Earned</p>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-8 rounded-lg">
              <Flame className="w-16 h-16 mx-auto mb-3" />
              <p className="text-5xl font-bold mb-2">{streak}</p>
              <p className="text-2xl">Max Streak</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-lg">
              <Award className="w-16 h-16 mx-auto mb-3" />
              <p className="text-5xl font-bold mb-2">{badges.length}</p>
              <p className="text-2xl">Badges Earned</p>
            </div>
          </div>

          <div className="bg-yellow-100 p-8 rounded-lg border-4 border-yellow-400">
            <h3 className="text-3xl font-bold mb-6 text-yellow-800">🏆 YOUR BADGES 🏆</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {badges.map((badge, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-110 transition">
                  <Medal className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                  <p className="font-bold">{badge}</p>
                </div>
              ))}
              {badges.length === 0 && <p className="text-gray-600 text-xl">Complete challenges to earn badges!</p>}
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-4">🎓 You Mastered:</h3>
            <div className="text-left text-xl space-y-3 max-w-2xl mx-auto">
              <p>✅ Azure Cloud fundamentals and benefits</p>
              <p>✅ Core services: VMs, Storage, AI, Functions, Security</p>
              <p>✅ Real-world application architecture</p>
              <p>✅ Problem-solving with cloud solutions</p>
              <p>✅ Matching business needs to Azure services</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-4">🚀 Next Steps:</h3>
            <div className="text-xl space-y-2">
              <p>🌐 Get Azure Free Account ($200 credit!)</p>
              <p>📚 Start AZ-900 Certification</p>
              <p>💻 Build your first cloud app</p>
              <p>🎮 Join Azure gaming challenges</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleQuizAnswer = (questionId, selectedOption) => {
    setQuizAnswers({...quizAnswers, [questionId]: selectedOption});
  };

  const handleCaseAnswer = (problemId, selectedOption) => {
    setCaseSolutions({...caseSolutions, [problemId]: selectedOption});
  };

  const submitQuiz = () => {
    const currentQuiz = slides[currentSlide].questions;
    let correct = 0;
    let totalXP = 0;
    
    currentQuiz.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        correct++;
        totalXP += q.xpReward * multiplier;
      }
    });

    if (correct === currentQuiz.length) {
      setStreak(streak + 1);
      addBadge('Perfect Score!');
      unlockAchievement('Perfect!', `${correct}/${currentQuiz.length} correct! 🌟`);
    } else {
      setStreak(0);
      setLives(Math.max(0, lives - (currentQuiz.length - correct)));
    }

    setScore(score + totalXP);
    setXp(xp + totalXP);
    setShowQuizResults(true);
    
    if (correct >= 3) addBadge('Quiz Master');
    if (timer < 60) addBadge('Speed Demon');
    
    setIsTimerRunning(false);
  };

  const submitCaseStudy = () => {
    const currentCase = slides[currentSlide].problems;
    let correct = 0;
    let totalXP = 0;
    
    currentCase.forEach(p => {
      if (caseSolutions[p.id] === p.correct) {
        correct++;
        totalXP += 100 * multiplier;
      }
    });

    if (correct === currentCase.length) {
      setStreak(streak + 1);
      addBadge('Cloud Architect');
      addBadge('Problem Solver Master');
      addBadge('Solution Legend');
      unlockAchievement('LEGENDARY!', 'Perfect case study! 🌟');
    } else if (correct >= 3) {
      addBadge('Cloud Architect');
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setLives(Math.max(0, lives - 1));
    }

    setScore(score + totalXP);
    setXp(xp + totalXP);
    setShowCaseResults(true);
  };

  const nextSlide = () => {
    setShowQuizResults(false);
    setShowCaseResults(false);
    setQuizAnswers({});
    setCaseSolutions({});
    setTimer(0);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      if (slides[currentSlide + 1].type === 'mini-game') {
        setIsTimerRunning(true);
      }
    }
  };

  const prevSlide = () => {
    setShowQuizResults(false);
    setShowCaseResults(false);
    setIsTimerRunning(false);
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-2xl z-50 animate-bounce">
          <div className="flex items-center gap-3">
            <Trophy className="w-12 h-12" />
            <div>
              <p className="font-bold text-xl">{showAchievement.title}</p>
              <p>{showAchievement.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Super Game HUD */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-2xl p-6 mb-6 border-4 border-yellow-500">
          <div className="grid grid-cols-4 gap-4">
            {/* Score */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-lg text-white text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{score}</p>
              <p className="text-sm font-semibold">SCORE</p>
            </div>

            {/* Level & XP */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-lg text-white text-center">
              <Crown className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">L{level}</p>
              <div className="w-full bg-purple-900 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{width: `${(xp % 100)}%`}}
                />
              </div>
              <p className="text-xs mt-1">{xp % 100}/100 XP</p>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-lg text-white text-center">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{streak}</p>
              <p className="text-sm font-semibold">STREAK 🔥</p>
            </div>

            {/* Lives */}
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-lg text-white text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Heart 
                    key={i}
                    className={`w-6 h-6 ${i < lives ? 'fill-red-300' : 'fill-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold">LIVES</p>
            </div>
          </div>

          {/* Badges Bar */}
          {badges.length > 0 && (
            <div className="mt-4 bg-slate-700 p-3 rounded-lg">
              <p className="text-white font-bold mb-2">🏆 Badges: {badges.length}</p>
              <div className="flex gap-2 flex-wrap">
                {badges.map((badge, idx) => (
                  <span key={idx} className="bg-yellow-500 text-xs px-3 py-1 rounded-full font-bold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active Power-Up */}
          {activePowerUp && (
            <div className="mt-4 bg-green-600 p-3 rounded-lg text-white text-center animate-pulse">
              <p className="font-bold">⚡ {activePowerUp.toUpperCase()} ACTIVE!</p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 mb-6 border-2 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Quest Progress</span>
            <span className="text-white font-semibold">{currentSlide + 1} / {slides.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
              style={{width: `${((currentSlide + 1) / slides.length) * 100}%`}}
            >
              <span className="text-xs font-bold text-white">{Math.round(((currentSlide + 1) / slides.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6 min-h-[600px] border-4 border-purple-500">
          {slide.challenge && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-6 text-center">
              <p className="font-bold text-xl">⚔️ CHALLENGE: {slide.challenge}</p>
            </div>
          )}

          {isTimerRunning && (
            <div className="bg-yellow-100 p-4 rounded-lg mb-6 flex items-center justify-center gap-3 border-2 border-yellow-500">
              <Timer className="w-6 h-6 text-yellow-700" />
              <p className="font-bold text-xl text-yellow-800">Time: {timer}s {timer < 30 && '⚡ SPEED BONUS AVAILABLE!'}</p>
            </div>
          )}

          <h2 className="text-4xl font-bold mb-6 text-gray-800">{slide.title}</h2>
          
          {slide.type === 'mini-game' && !showQuizResults ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold mb-2">⚔️ BOSS BATTLE ⚔️</h3>
                <p className="text-xl">Defeat all questions to proceed!</p>
              </div>

              {slide.questions.map((q, idx) => (
                <div key={q.id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-4 border-purple-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl">Question {idx + 1}: {q.question}</h3>
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">
                      {q.xpReward} XP
                    </span>
                  </div>
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleQuizAnswer(q.id, optIdx)}
                        className={`w-full text-left p-4 rounded-lg border-4 transition transform hover:scale-105 ${
                          quizAnswers[q.id] === optIdx
                            ? 'border-purple-600 bg-purple-100 font-bold'
                            : 'border-gray-300 hover:border-purple-400 bg-white'
                        }`}
                      >
                        <span className="text-lg">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length !== slide.questions.length}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-6 rounded-lg font-bold text-2xl hover:from-green-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                ⚔️ ATTACK! (Submit Answers)
              </button>
            </div>
          ) : slide.type === 'mini-game' && showQuizResults ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg text-center">
                <Trophy className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">BATTLE RESULTS!</h3>
              </div>

              {slide.questions.map((q, idx) => {
                const isCorrect = quizAnswers[q.id] === q.correct;
                return (
                  <div key={q.id} className={`p-6 rounded-lg border-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-lg">Question {idx + 1}: {q.question}</p>
                      <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
                    </div>
                    <p className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? `Correct! +${q.xpReward * multiplier} XP!` : 'Wrong Answer!'}
                    </p>
                    {!isCorrect && (
                      <p className="text-gray-700 mt-2">Correct answer: <strong>{q.options[q.correct]}</strong></p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : slide.type === 'case-matching' && !showCaseResults ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg text-center">
                <h3 className="text-4xl font-bold mb-3">⚔️ FINAL BOSS BATTLE ⚔️</h3>
                <p className="text-2xl">Match ALL problems correctly to win!</p>
                <p className="text-xl mt-2">Each correct = 100 XP! Perfect score = 3 LEGENDARY BADGES!</p>
              </div>

              {slide.problems.map((problem, idx) => (
                <div key={problem.id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-4 border-purple-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{problem.icon}</span>
                    <h3 className="font-bold text-2xl flex-1">{problem.problem}</h3>
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">
                      100 XP
                    </span>
                  </div>
                  
                  <p className="font-semibold text-lg mb-3 text-purple-800">Choose the BEST Azure solution:</p>
                  
                  <div className="space-y-3">
                    {problem.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleCaseAnswer(problem.id, optIdx)}
                        className={`w-full text-left p-5 rounded-lg border-4 transition transform hover:scale-105 ${
                          caseSolutions[problem.id] === optIdx
                            ? 'border-purple-600 bg-purple-100 font-bold shadow-lg'
                            : 'border-gray-300 hover:border-purple-400 bg-white'
                        }`}
                      >
                        <span className="text-lg">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                {powerUps.hint > 0 && !activePowerUp && (
                  <button
                    onClick={() => {
                      usePowerUp('hint');
                      alert('💡 HINT:\n\n• Crashes? Think AUTO-SCALING\n• Slow globally? Think CONTENT DELIVERY\n• Security? Think ENCRYPTION & MONITORING\n• AI features? Think MACHINE LEARNING');
                    }}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition flex items-center gap-2"
                  >
                    <Lightbulb className="w-5 h-5" />
                    Use Hint ({powerUps.hint} left)
                  </button>
                )}
                
                {powerUps.doublePoints > 0 && !activePowerUp && (
                  <button
                    onClick={() => usePowerUp('doublePoints')}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    2x Points ({powerUps.doublePoints} left)
                  </button>
                )}
              </div>

              <button
                onClick={submitCaseStudy}
                disabled={Object.keys(caseSolutions).length !== slide.problems.length}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-lg font-bold text-2xl hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                🚀 SUBMIT FINAL SOLUTION {multiplier > 1 && `(${multiplier}x POINTS!)`}
              </button>
            </div>
          ) : slide.type === 'case-matching' && showCaseResults ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg text-center">
                <Trophy className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">FINAL BOSS DEFEATED!</h3>
              </div>

              {slide.problems.map((problem, idx) => {
                const isCorrect = caseSolutions[problem.id] === problem.correct;
                return (
                  <div key={problem.id} className={`p-6 rounded-lg border-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{problem.icon}</span>
                      <p className="font-semibold text-xl flex-1">{problem.problem}</p>
                      <span className="text-4xl">{isCorrect ? '✅' : '❌'}</span>
                    </div>
                    
                    <p className={`font-bold text-xl mb-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? `Correct! +${100 * multiplier} XP!` : 'Incorrect Solution'}
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold text-lg mb-2">✅ Correct Answer:</p>
                      <p className="text-xl text-blue-700 font-bold mb-3">{problem.options[problem.correct]}</p>
                      <p className="text-gray-700">{problem.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>{slide.content}</div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed border-4 border-gray-500"
          >
            ← Back
          </button>
          
          {slide.session && (
            <div className="text-center bg-slate-800 px-6 py-3 rounded-lg border-2 border-purple-500">
              <p className="text-white font-bold text-lg">Session {slide.session}</p>
            </div>
          )}

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border-4 border-purple-500"
          >
            Next <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AzureGamePresentation;