import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar as CalendarIcon, List, Settings, LogOut, Sun, Moon, Cloud } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../lib/auth';
import { useEventStore } from '../lib/store';

function getGreeting() {
  const hour = new Date().getHours();
  const icons = {
    morning: <Sun className="h-6 w-6 text-yellow-500" />,
    afternoon: <Sun className="h-6 w-6 text-orange-500" />,
    evening: <Moon className="h-6 w-6 text-indigo-500" />,
    night: <Moon className="h-6 w-6 text-blue-900" />
  };

  if (hour < 12) return { text: 'Good Morning', icon: icons.morning };
  if (hour < 17) return { text: 'Good Afternoon', icon: icons.afternoon };
  if (hour < 21) return { text: 'Good Evening', icon: icons.evening };
  return { text: 'Good Night', icon: icons.night };
}

export function Dashboard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { events, loading, error } = useEventStore();
  const greeting = getGreeting();

  const navigation = [
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'List View', path: '/list', icon: List },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const upcomingEvents = events
    .filter(event => new Date(event.start_time) > new Date())
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 flex flex-col pt-5 pb-4">
              <div className="flex items-center flex-shrink-0 px-4">
                <CalendarIcon className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CalendaSync</span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={() => logout()}
                className="flex items-center w-full px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  {greeting.icon}
                  <h1 className="ml-2 text-2xl font-semibold text-gray-900">
                    {greeting.text}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {format(new Date(), 'EEEE, MMMM d')}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              {location.pathname === '/calendar' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Upcoming Events
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {upcomingEvents.length}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Cloud className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Error loading events
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>Please check your connection and try again.</p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            onClick={() => window.location.reload()}
                            className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="bg-white shadow rounded-lg">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  children
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}