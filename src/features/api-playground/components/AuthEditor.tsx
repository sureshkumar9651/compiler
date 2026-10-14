'use client';

import { AuthType } from '@/types/api-playground';
import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

const AUTH_TYPES: { id: AuthType; label: string }[] = [
  { id: 'none', label: 'No Auth' },
  { id: 'bearer', label: 'Bearer Token' },
  { id: 'basic', label: 'Basic Auth' },
];

export function AuthEditor() {
  const { request, setAuth, persistAuthTokens, setPersistAuthTokens } = useApiPlaygroundStore();
  const { auth } = request;
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Auth type selector */}
      <div className="flex gap-2">
        {AUTH_TYPES.map((t) => (
          <button
            key={t.id}
            id={`api-auth-${t.id}`}
            onClick={() => setAuth({ ...auth, type: t.id })}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
              auth.type === t.id
                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Warning banner */}
      {auth.type !== 'none' && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-300 leading-relaxed">
            <p className="font-semibold mb-0.5">Credentials warning</p>
            <p>
              You are about to send credentials to{' '}
              <span className="font-mono text-amber-200">
                {request.url || 'an external domain'}
              </span>
              . Ensure you trust this endpoint. Credentials are{' '}
              <strong>not saved</strong> by default.
            </p>
          </div>
        </div>
      )}

      {/* Bearer Token */}
      {auth.type === 'bearer' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">Bearer Token</label>
          <div className="relative">
            <input
              id="api-auth-bearer-token"
              type={showSecret ? 'text' : 'password'}
              value={auth.bearerToken ?? ''}
              onChange={(e) => setAuth({ ...auth, bearerToken: e.target.value })}
              placeholder="Enter token"
              className="w-full px-3 py-2 pr-10 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 font-mono transition-colors"
              autoComplete="off"
            />
            <button
              onClick={() => setShowSecret((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              aria-label={showSecret ? 'Hide token' : 'Show token'}
            >
              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Basic Auth */}
      {auth.type === 'basic' && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400">Username</label>
            <input
              id="api-auth-basic-username"
              type="text"
              value={auth.basicUsername ?? ''}
              onChange={(e) => setAuth({ ...auth, basicUsername: e.target.value })}
              placeholder="username"
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 font-mono transition-colors"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400">Password</label>
            <div className="relative">
              <input
                id="api-auth-basic-password"
                type={showSecret ? 'text' : 'password'}
                value={auth.basicPassword ?? ''}
                onChange={(e) => setAuth({ ...auth, basicPassword: e.target.value })}
                placeholder="password"
                className="w-full px-3 py-2 pr-10 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 font-mono transition-colors"
                autoComplete="off"
              />
              <button
                onClick={() => setShowSecret((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                aria-label={showSecret ? 'Hide password' : 'Show password'}
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persist opt-in */}
      {auth.type !== 'none' && (
        <label className="flex items-center gap-2.5 text-xs text-neutral-400 cursor-pointer select-none">
          <input
            type="checkbox"
            id="api-auth-persist"
            checked={persistAuthTokens}
            onChange={(e) => setPersistAuthTokens(e.target.checked)}
            className="accent-blue-500"
          />
          Save credentials with this request (stored locally in IndexedDB)
        </label>
      )}
    </div>
  );
}
