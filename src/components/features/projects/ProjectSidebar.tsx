'use client';

import { useProjectStore } from '@/store/useProjectStore';
import { Plus, MoreVertical, FileCode2, Copy, Trash2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

function formatRelativeTime(timestamp: number) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = Date.now() - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');
  
  const days = Math.floor(hours / 24);
  return rtf.format(-days, 'day');
}

export function ProjectSidebar() {
  const { 
    projects, 
    activeProjectId, 
    selectProject, 
    createProject, 
    deleteProject, 
    duplicateProject
  } = useProjectStore();

  const [search, setSearch] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const sortedProjects = [...projects]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter(p => {
      const name = typeof p.name === 'string' ? p.name : 'Corrupted Project';
      return name.toLowerCase().includes(search.toLowerCase());
    });

  // Close menu on click outside
  useEffect(() => {
    const handleClick = () => setMenuOpenId(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleMenuClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === id ? null : id);
    setDeleteConfirmId(null); // Reset delete confirm if open
  };

  return (
    <div className="w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex flex-col h-full overflow-hidden">
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 space-y-3 shrink-0">
        <button
          onClick={() => createProject()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>

        <div className="relative">
          <Search className="h-4 w-4 absolute left-2.5 top-2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sortedProjects.length === 0 ? (
          <div className="text-center py-6 text-sm text-neutral-500">
            {search ? 'No projects match your search.' : 'No projects found.'}
          </div>
        ) : (
          sortedProjects.map(project => (
            <div
              key={project.id}
              onClick={() => selectProject(project.id)}
              className={`group flex flex-col px-3 py-2 rounded-md cursor-pointer transition-colors relative ${
                activeProjectId === project.id 
                  ? 'bg-blue-100 dark:bg-blue-900/30' 
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileCode2 className={`h-4 w-4 shrink-0 ${activeProjectId === project.id ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400 dark:text-neutral-500'}`} />
                  <span className={`text-sm truncate font-medium ${activeProjectId === project.id ? 'text-blue-900 dark:text-blue-100' : 'text-neutral-700 dark:text-neutral-300'}`}>
                    {typeof project.name === 'string' ? project.name : 'Corrupted Project'}
                  </span>
                </div>
                
                <button
                  onClick={(e) => handleMenuClick(e, project.id)}
                  className={`p-1 -mr-1 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 ${menuOpenId === project.id ? 'opacity-100 bg-neutral-200 dark:bg-neutral-700' : ''}`}
                >
                  <MoreVertical className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                </button>
              </div>
              
              <div className="text-[11px] text-neutral-500 dark:text-neutral-500 ml-6 mt-0.5">
                {formatRelativeTime(project.updatedAt)}
              </div>

              {/* Context Menu Dropdown */}
              {menuOpenId === project.id && (
                <div 
                  className="absolute right-2 top-8 z-10 w-36 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 py-1"
                  onClick={e => e.stopPropagation()}
                >
                  {deleteConfirmId === project.id ? (
                    <div className="px-3 py-2">
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-2 font-medium">Delete project?</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(null); setMenuOpenId(null); }}
                          className="flex-1 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteProject(project.id); setMenuOpenId(null); }}
                          className="flex-1 py-1 text-xs bg-red-600 rounded hover:bg-red-700 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateProject(project.id);
                          setMenuOpenId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                      >
                        <Copy className="h-3.5 w-3.5" /> Duplicate
                      </button>
                      <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-1" />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(project.id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 shrink-0 text-center text-xs text-neutral-400 dark:text-neutral-600 font-medium">
        Projects · {projects.length}
      </div>
    </div>
  );
}
