import React from 'react';
import { Building2, Users, Calendar, Mail, Phone, MessageSquare, TrendingUp, Star } from 'lucide-react';

export function ProspectProfile() {
  const prospects = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      size: '500-1000',
      status: 'Hot Lead',
      lastContact: '2 hours ago',
      nextMeeting: 'Tomorrow, 2:00 PM',
      email: 'john.doe@techcorp.com',
      phone: '+1 (555) 123-4567',
      score: 92,
      contracts: 47,
      engagement: 85,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      notes: [
        'Very interested in workflow automation features',
        'Currently using legacy system, pain points around approval delays',
        'Decision maker confirmed for next demo session'
      ],
      activities: [
        { type: 'demo', description: 'Completed 24-minute demo session', time: '2 hours ago' },
        { type: 'email', description: 'Sent follow-up with ROI calculator', time: '1 day ago' },
        { type: 'meeting', description: 'Initial discovery call completed', time: '3 days ago' }
      ]
    },
    {
      id: 2,
      name: 'Global Manufacturing Inc',
      industry: 'Manufacturing',
      size: '1000+',
      status: 'Qualified',
      lastContact: '1 day ago',
      nextMeeting: 'Next week',
      email: 'sarah.johnson@globalmanuf.com',
      phone: '+1 (555) 987-6543',
      score: 78,
      contracts: 156,
      engagement: 72,
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      notes: [
        'Complex approval hierarchy - needs custom workflows',
        'Compliance requirements are top priority',
        'Evaluating 3 vendors including us'
      ],
      activities: [
        { type: 'demo', description: 'Demo scheduled for next week', time: '1 day ago' },
        { type: 'email', description: 'Sent compliance documentation', time: '2 days ago' },
        { type: 'call', description: 'Qualification call - 45 minutes', time: '1 week ago' }
      ]
    }
  ];

  const [selectedProspect, setSelectedProspect] = React.useState(prospects[0]);

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Prospects List */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Active Prospects</h2>
          <p className="text-sm text-slate-500 mt-1">Track and manage your sales pipeline</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {prospects.map((prospect) => (
            <div
              key={prospect.id}
              onClick={() => setSelectedProspect(prospect)}
              className={`
                p-6 border-b border-slate-200 cursor-pointer transition-colors
                ${selectedProspect.id === prospect.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={prospect.avatar}
                  alt={prospect.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 truncate">{prospect.name}</h3>
                  <p className="text-sm text-slate-500">{prospect.industry}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className={`
                  px-2 py-1 text-xs rounded-full font-medium
                  ${prospect.status === 'Hot Lead' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                  }
                `}>
                  {prospect.status}
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-slate-700 ml-1">{prospect.score}</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-500">Last contact: {prospect.lastContact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prospect Details */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedProspect.avatar}
                  alt={selectedProspect.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{selectedProspect.name}</h1>
                  <p className="text-slate-500">{selectedProspect.industry} • {selectedProspect.size} employees</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{selectedProspect.email}</p>
                  <p className="text-xs text-slate-500">Email</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{selectedProspect.phone}</p>
                  <p className="text-xs text-slate-500">Phone</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{selectedProspect.nextMeeting}</p>
                  <p className="text-xs text-slate-500">Next Meeting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Activity */}
          <div className="grid grid-cols-2 gap-8">
            {/* Key Metrics */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Metrics</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{selectedProspect.score}</p>
                    <p className="text-xs text-slate-500">Lead Score</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{selectedProspect.contracts}</p>
                    <p className="text-xs text-slate-500">Contracts/Year</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{selectedProspect.engagement}%</p>
                    <p className="text-xs text-slate-500">Engagement</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Sales Notes</h3>
                <div className="space-y-3">
                  {selectedProspect.notes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-700">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {selectedProspect.activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${activity.type === 'demo' ? 'bg-blue-100' :
                        activity.type === 'email' ? 'bg-green-100' :
                        activity.type === 'meeting' ? 'bg-purple-100' : 'bg-yellow-100'
                      }
                    `}>
                      {activity.type === 'demo' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'email' && <Mail className="w-5 h-5 text-green-600" />}
                      {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-purple-600" />}
                      {activity.type === 'call' && <Phone className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}