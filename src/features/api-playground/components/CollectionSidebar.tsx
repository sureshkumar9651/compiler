'use client';

import { useState, useRef } from 'react';
import {
  FolderOpen,
  Plus,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  Edit2,
  Copy,
  Download,
  Upload,
  History,
  X,
} from 'lucide-react';
import { useApiCollectionStore } from '@/store/useApiCollectionStore';
import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';
import { SavedRequest, HistoryEntry } from '@/types/api-playground';
import { ConfirmDialog } from './ConfirmDialog';
import { downloadCollectionJson } from '@/features/api-playground/services/collection-export';
import { importCollectionJson } from '@/features/api-playground/services/collection-export';
import { HttpMethod } from '@/types/api-playground';

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'text-emerald-400',
  POST: 'text-amber-400',
  PUT: 'text-blue-400',
  PATCH: 'text-purple-400',
  DELETE: 'text-red-400',
};

export function CollectionSidebar() {
  const {
    collections,
    requestsByCollection,
    history,
    activeCollectionId,
    createCollection,
    renameCollection,
    deleteCollection: deleteCol,
    setActiveCollection,
    saveRequest,
    deleteRequest: deleteReq,
    duplicateRequest: dupReq,
    clearHistory,
    loadCollectionRequests,
    importCollection,
  } = useApiCollectionStore();

  const { request, loadRequest } = useApiPlaygroundStore();

  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  const [showHistory, setShowHistory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ type: 'collection' | 'request' | 'history'; id: string; colId?: string } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleCollection(id: string) {
    setExpandedCollections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else {
        next.add(id);
        loadCollectionRequests(id);
      }
      return next;
    });
    setActiveCollection(id);
  }

  async function handleCreateCollection() {
    const col = await createCollection('New Collection');
    setEditingId(col.id);
    setEditName(col.name);
    setExpandedCollections((p) => new Set([...p, col.id]));
  }

  async function handleRenameSubmit(id: string) {
    if (editName.trim()) await renameCollection(id, editName.trim());
    setEditingId(null);
  }

  async function handleSaveRequest() {
    const colId = activeCollectionId ?? collections[0]?.id;
    if (!colId) {
      const col = await createCollection('My Collection');
      await _saveToCollection(col.id);
    } else {
      await _saveToCollection(colId);
    }
  }

  async function _saveToCollection(colId: string) {
    const { method, url, params, headers, auth, bodyType, bodyJson, bodyFormPairs } = request;
    await saveRequest({
      collectionId: colId,
      name: url.replace(/^https?:\/\//, '').slice(0, 60) || 'Untitled Request',
      method,
      url,
      params,
      headers,
      authType: auth.type,
      bodyType,
      bodyJson,
      bodyFormPairs,
    });
    if (!expandedCollections.has(colId)) {
      setExpandedCollections((p) => new Set([...p, colId]));
    }
  }

  function loadHistoryEntry(entry: HistoryEntry) {
    loadRequest({
      method: entry.request.method,
      url: entry.request.url,
      params: entry.request.params,
      headers: entry.request.headers,
      auth: { type: entry.request.authType, basicUsername: entry.request.basicUsername },
      bodyType: entry.request.bodyType,
      bodyJson: entry.request.bodyJson,
      bodyFormPairs: entry.request.bodyFormPairs,
    });
  }

  function loadSavedRequest(req: SavedRequest) {
    loadRequest({
      method: req.method,
      url: req.url,
      params: req.params,
      headers: req.headers,
      auth: { type: req.authType, basicUsername: req.basicUsername },
      bodyType: req.bodyType,
      bodyJson: req.bodyJson,
      bodyFormPairs: req.bodyFormPairs,
    });
  }

  async function handleExport(colId: string) {
    const col = collections.find((c) => c.id === colId);
    if (!col) return;
    const reqs = requestsByCollection[colId] ?? [];
    downloadCollectionJson(col, reqs as SavedRequest[], false);
    setOpenMenu(null);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const result = importCollectionJson(text);
    if (!result.ok || !result.data) {
      setImportError(result.error ?? 'Import failed.');
      return;
    }
    await importCollection(result.data.collection, result.data.requests);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="flex flex-col h-full w-64 bg-neutral-950 border-r border-neutral-800">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-neutral-800 shrink-0">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Collections
        </span>
        <div className="flex items-center gap-1">
          <button
            id="api-collection-new-btn"
            onClick={handleCreateCollection}
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            title="New collection"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            id="api-collection-import-btn"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            title="Import collection"
          >
            <Upload className="h-3.5 w-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
            aria-label="Import collection JSON"
          />
        </div>
      </div>

      {importError && (
        <div className="mx-3 mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
          <span className="shrink-0">⚠</span>
          <span>{importError}</span>
          <button onClick={() => setImportError(null)} className="ml-auto"><X className="h-3 w-3" /></button>
        </div>
      )}

      {/* Save current request */}
      <div className="px-3 py-2 border-b border-neutral-800 shrink-0">
        <button
          id="api-save-request-btn"
          onClick={handleSaveRequest}
          className="w-full px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition-colors text-left"
        >
          + Save current request
        </button>
      </div>

      {/* Collections list */}
      <div className="flex-1 overflow-y-auto">
        {collections.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-neutral-600">
            <FolderOpen className="h-8 w-8" />
            <p className="text-xs text-center">No collections yet.<br />Create one to save requests.</p>
          </div>
        )}

        {collections.map((col) => {
          const isExpanded = expandedCollections.has(col.id);
          const reqs = requestsByCollection[col.id] ?? [];

          return (
            <div key={col.id}>
              {/* Collection row */}
              <div className="flex items-center group px-2 py-1.5 hover:bg-neutral-900 transition-colors relative">
                <button
                  onClick={() => toggleCollection(col.id)}
                  className="flex items-center gap-1.5 flex-1 min-w-0 text-left"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                  )}
                  <FolderOpen className="h-3.5 w-3.5 text-amber-400 shrink-0" />

                  {editingId === col.id ? (
                    <input
                      autoFocus
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleRenameSubmit(col.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit(col.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="flex-1 bg-neutral-800 border border-blue-500 rounded px-1 text-xs text-neutral-100 outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="text-xs text-neutral-200 truncate">{col.name}</span>
                  )}
                </button>

                {/* Collection menu */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === col.id ? null : col.id); }}
                    className="p-1 rounded text-neutral-600 hover:text-neutral-300 opacity-0 group-hover:opacity-100 transition-all"
                    aria-label="Collection options"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                  {openMenu === col.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                      <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl overflow-hidden">
                        <button
                          onClick={() => { setEditingId(col.id); setEditName(col.name); setOpenMenu(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-700 transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" /> Rename
                        </button>
                        <button
                          onClick={() => handleExport(col.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-700 transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" /> Export
                        </button>
                        <button
                          onClick={() => { setConfirm({ type: 'collection', id: col.id }); setOpenMenu(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Requests */}
              {isExpanded && (
                <div className="ml-4 border-l border-neutral-800">
                  {reqs.length === 0 && (
                    <p className="px-3 py-2 text-xs text-neutral-600 italic">No saved requests</p>
                  )}
                  {reqs.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center group px-2 py-1.5 hover:bg-neutral-900 transition-colors"
                    >
                      <button
                        onClick={() => loadSavedRequest(req)}
                        className="flex items-center gap-2 flex-1 min-w-0 text-left"
                      >
                        <span className={`text-[10px] font-bold font-mono shrink-0 w-10 ${METHOD_COLORS[req.method]}`}>
                          {req.method}
                        </span>
                        <span className="text-xs text-neutral-300 truncate">{req.name}</span>
                      </button>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => dupReq(req.id, col.id)}
                          className="p-1 text-neutral-600 hover:text-neutral-300 rounded transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setConfirm({ type: 'request', id: req.id, colId: col.id })}
                          className="p-1 text-neutral-600 hover:text-red-400 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* History section */}
        <div className="border-t border-neutral-800 mt-2">
          <button
            id="api-history-toggle-btn"
            onClick={() => setShowHistory((v) => !v)}
            className="flex items-center gap-2 w-full px-3 py-2.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition-colors"
          >
            <History className="h-3.5 w-3.5" />
            History
            {showHistory ? <ChevronDown className="h-3 w-3 ml-auto" /> : <ChevronRight className="h-3 w-3 ml-auto" />}
          </button>

          {showHistory && (
            <div className="ml-4 border-l border-neutral-800">
              {history.length === 0 && (
                <p className="px-3 py-2 text-xs text-neutral-600 italic">No history yet</p>
              )}
              {history.slice(0, 50).map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => loadHistoryEntry(entry)}
                  className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-neutral-900 transition-colors text-left group"
                >
                  <span className={`text-[10px] font-bold font-mono shrink-0 w-10 ${METHOD_COLORS[entry.method]}`}>
                    {entry.method}
                  </span>
                  <span className="text-xs text-neutral-400 truncate flex-1">{entry.url.replace(/^https?:\/\//, '')}</span>
                  {entry.status && (
                    <span className={`text-[10px] font-mono shrink-0 ${entry.status >= 200 && entry.status < 300 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {entry.status}
                    </span>
                  )}
                </button>
              ))}
              {history.length > 0 && (
                <button
                  id="api-clear-history-btn"
                  onClick={() => setConfirm({ type: 'history', id: 'all' })}
                  className="w-full px-3 py-1.5 text-xs text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-colors text-left"
                >
                  Clear history
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirm dialogs */}
      <ConfirmDialog
        isOpen={confirm?.type === 'collection'}
        title="Delete Collection"
        message="This will permanently delete the collection and all its saved requests. This action cannot be undone."
        confirmLabel="Delete Collection"
        onConfirm={() => { if (confirm) deleteCol(confirm.id); setConfirm(null); }}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmDialog
        isOpen={confirm?.type === 'request'}
        title="Delete Request"
        message="This will permanently delete this saved request."
        confirmLabel="Delete Request"
        onConfirm={() => { if (confirm?.colId) deleteReq(confirm.id, confirm.colId); setConfirm(null); }}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmDialog
        isOpen={confirm?.type === 'history'}
        title="Clear History"
        message="This will permanently clear all request history."
        confirmLabel="Clear History"
        onConfirm={() => { clearHistory(); setConfirm(null); }}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
