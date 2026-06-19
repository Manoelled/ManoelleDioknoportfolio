'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  url: string;
  description: string;
  color: string;
}

const defaultClients: Client[] = [
  {
    id: 'client-1',
    name: 'Client Website 1',
    url: 'https://example.com',
    description: 'Add your client URL below',
    color: '#BFD7FF',
  },
];

export default function ClientPortalPage() {
  const [clients] = useState<Client[]>(defaultClients);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoadUrl = () => {
    if (!customUrl.trim()) return;
    let url = customUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    setLoading(true);
    setIframeUrl(url);
    setActiveClient(null);
  };

  const handleClientSelect = (client: Client) => {
    setActiveClient(client);
    setIframeUrl(client.url);
    setCustomUrl(client.url);
    setLoading(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 lg:px-16 gap-4"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="hidden sm:inline">Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <span className="text-sm font-extrabold text-gray-900">Client Portal</span>
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 max-w-2xl mx-auto">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-gray-400 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
              placeholder="Enter client website URL..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none min-w-0"
            />
          </div>
          <button
            onClick={handleLoadUrl}
            className="px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-bold hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            Load
          </button>
        </div>
      </div>

      <div className="pt-16 flex flex-1 h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto hidden md:flex">
          <div className="px-4 py-4 border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Clients</p>
          </div>
          <div className="flex-1 py-2">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => handleClientSelect(client)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${activeClient?.id === client.id ? 'bg-gray-50' : ''}`}
              >
                <div
                  className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black text-gray-700"
                  style={{ background: client.color }}
                >
                  {client.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{client.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{client.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100">
            <p className="text-[9px] text-gray-400 text-center leading-relaxed">
              Enter any client URL in the address bar above to preview their site
            </p>
          </div>
        </aside>

        {/* Main iframe area */}
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
          {iframeUrl ? (
            <div className="flex-1 relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500 font-medium">Loading...</p>
                  </div>
                </div>
              )}
              <iframe
                src={iframeUrl}
                className="w-full h-full border-0"
                title="Client website preview"
                onLoad={() => setLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center mb-6 border border-gray-100">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Client Portal</h2>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
                Enter a client website URL in the address bar above, or select a client from the sidebar to preview their site.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                Some sites may block embedding due to their security settings
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
