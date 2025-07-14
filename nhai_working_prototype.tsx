import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Activity, Video, Download, Settings, BarChart3, FileText, Home } from 'lucide-react';

const NSVDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLocation, setCurrentLocation] = useState({
    highway: 'NH-48',
    chainage: 125.5,
    lane: 1,
    direction: 'Up',
    gps: '22.3072°N, 73.1812°E'
  });

  const [distressData, setDistressData] = useState([
    { id: 1, type: 'Pavement Roughness', value: '4.2 m/km', severity: 'high', chainage: 125.2, hasVideo: false },
    { id: 2, type: 'Rutting', value: '12.5mm', severity: 'medium', chainage: 125.4, hasVideo: false },
    { id: 3, type: 'Ravelling', value: 'Minor aggregate loss', severity: 'low', chainage: 125.3, hasVideo: false },
    { id: 4, type: 'Longitudinal Cracking', value: '25m length', severity: 'high', chainage: 125.1, hasVideo: true },
    { id: 5, type: 'Transverse Cracking', value: '2.5mm width', severity: 'medium', chainage: 125.3, hasVideo: false }
  ]);

  const [stats, setStats] = useState({
    iri: 3.2,
    rutDepth: 8.5,
    cracksPerKm: 12,
    surveyProgress: 85
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setCurrentLocation(prev => ({
          ...prev,
          chainage: prev.chainage + 0.1
        }));
        
        setStats(prev => ({
          ...prev,
          iri: (prev.iri + (Math.random() - 0.5) * 0.1).toFixed(1),
          rutDepth: (prev.rutDepth + (Math.random() - 0.5) * 0.5).toFixed(1),
          surveyProgress: Math.min(100, prev.surveyProgress + 0.5)
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-orange-100 text-orange-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Live Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-800">Current Survey Location</h3>
            <p className="text-sm text-green-600">
              {currentLocation.highway}, Chainage: {currentLocation.chainage.toFixed(1)} KM
            </p>
            <p className="text-xs text-green-500">
              Lane: {currentLocation.lane} ({currentLocation.direction}) | GPS: {currentLocation.gps}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-green-700">
              {isLive ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.iri}</div>
          <div className="text-sm text-gray-600">IRI (m/km)</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.rutDepth}</div>
          <div className="text-sm text-gray-600">Rut Depth (mm)</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.cracksPerKm}</div>
          <div className="text-sm text-gray-600">Cracks/km</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.surveyProgress}%</div>
          <div className="text-sm text-gray-600">Survey Progress</div>
        </div>
      </div>

      {/* Distress Conditions */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Current Distress Conditions</h3>
        </div>
        <div className="p-4 space-y-3">
          {distressData.map((item) => (
            <div key={item.id} className={`border-l-4 rounded-lg p-3 ${getSeverityColor(item.severity)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">{item.type}</h4>
                  <p className="text-sm text-gray-600">{item.value} at Ch. {item.chainage} KM</p>
                </div>
                <div className="flex items-center space-x-2">
                  {item.hasVideo && (
                    <button className="p-1 bg-gray-800 text-white rounded text-xs">
                      <Video size={14} />
                    </button>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getSeverityBadge(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Download className="inline mr-2" size={16} />
          Export Report
        </button>
        <button 
          onClick={() => setIsLive(!isLive)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            isLive 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Activity className="inline mr-2" size={16} />
          {isLive ? 'Stop Live' : 'Start Live'}
        </button>
      </div>
    </div>
  );

  const MapView = () => (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Highway Map View</h3>
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600">Interactive map with distress overlays</p>
          <p className="text-sm text-gray-500 mt-2">
            Would integrate with Google Maps API or OpenStreetMap
          </p>
        </div>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Reports & Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Historical Trends</h4>
          <div className="bg-gray-100 rounded h-32 flex items-center justify-center">
            <BarChart3 size={32} className="text-gray-400" />
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Distress Distribution</h4>
          <div className="bg-gray-100 rounded h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-gray-600">High: 2 | Medium: 2 | Low: 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">System Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Data Refresh Rate</label>
          <select className="w-full border rounded-lg p-2">
            <option>Real-time (3s)</option>
            <option>Every 10 seconds</option>
            <option>Every 30 seconds</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Alert Threshold</label>
          <select className="w-full border rounded-lg p-2">
            <option>High severity only</option>
            <option>Medium and above</option>
            <option>All severities</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Video Recording</label>
          <select className="w-full border rounded-lg p-2">
            <option>Auto-record for high severity</option>
            <option>Manual recording only</option>
            <option>Continuous recording</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">NHAI NSV Monitor</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-700 rounded">
              <AlertTriangle size={20} />
            </button>
            <button className="p-2 hover:bg-blue-700 rounded">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="flex space-x-6 p-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'map', label: 'Map View', icon: MapPin },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'map' && <MapView />}
        {activeTab === 'reports' && <ReportsView />}
        {activeTab === 'settings' && <SettingsView />}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">NHAI Network Survey Vehicle Real-time Monitoring System</p>
        <p className="text-xs text-gray-400 mt-1">Developed for NHAI Hackathon 2024</p>
      </div>
    </div>
  );
};

export default NSVDashboard;