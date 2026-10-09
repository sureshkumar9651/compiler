'use client';

import { useProjectStore } from '@/store/useProjectStore';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { buildFileTree, getFileExtension, FileTreeNode } from '@/utils/fileTree';
import {
  Plus,
  MoreVertical,
  Trash2,
  Search,
  Folder,
  ChevronDown,
  ChevronRight,
  Atom,
  FileCode2,
  FilePlus,
  FolderPlus,
  Edit2,
  Copy,
  FileCode,
  FileText,
  FileJson,
  Palette,
  Code2,
  AlertCircle,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

function getFileIcon(path: string) {
  const ext = getFileExtension(path);
  switch (ext) {
    case 'jsx':
    case 'tsx':
      return <Atom className="h-3.5 w-3.5 text-cyan-500 shrink-0" />;
    case 'js':
    case 'ts':
      return <FileCode className="h-3.5 w-3.5 text-yellow-500 shrink-0" />;
    case 'css':
      return <Palette className="h-3.5 w-3.5 text-sky-400 shrink-0" />;
    case 'json':
      return <FileJson className="h-3.5 w-3.5 text-amber-400 shrink-0" />;
    case 'html':
    case 'htm':
      return <Code2 className="h-3.5 w-3.5 text-orange-500 shrink-0" />;
    case 'md':
      return <FileText className="h-3.5 w-3.5 text-blue-400 shrink-0" />;
    default:
      return <FileCode className="h-3.5 w-3.5 text-neutral-400 shrink-0" />;
  }
}

interface TreeItemProps {
  node: FileTreeNode;
  depth: number;
  activeFilePath: string | null;
  expandedFolders: string[];
  onSelectFile: (path: string) => void;
  onToggleFolder: (path: string) => void;
  onNewFile: (parentPath: string) => void;
  onNewFolder: (parentPath: string) => void;
  onRename: (path: string, currentName: string) => void;
  onDelete: (path: string, name: string, isDir: boolean) => void;
  onDuplicate: (path: string) => void;
  onCopyPath: (path: string) => void;
}

function FileTreeNodeItem({
  node,
  depth,
  activeFilePath,
  expandedFolders,
  onSelectFile,
  onToggleFolder,
  onNewFile,
  onNewFolder,
  onRename,
  onDelete,
  onDuplicate,
  onCopyPath,
}: TreeItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDir = node.type === 'directory';
  const isExpanded = expandedFolders.includes(node.path);
  const isActive = !isDir && activeFilePath === node.path;

  const handleContextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="select-none">
      <div
        onClick={() => (isDir ? onToggleFolder(node.path) : onSelectFile(node.path))}
        className={`group flex items-center justify-between py-1 px-2 rounded-md text-xs cursor-pointer transition-colors relative ${
          isActive
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium'
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          {isDir ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
              )}
              <Folder className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            </>
          ) : (
            <span className="ml-4 shrink-0">{getFileIcon(node.path)}</span>
          )}
          <span className="truncate">{node.name}</span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isDir && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNewFile(node.path);
                }}
                className="p-0.5 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                title="New File inside folder"
              >
                <FilePlus className="h-3 w-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNewFolder(node.path);
                }}
                className="p-0.5 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                title="New Folder inside folder"
              >
                <FolderPlus className="h-3 w-3" />
              </button>
            </>
          )}

          <button
            onClick={handleContextClick}
            className="p-0.5 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
            title="More actions"
          >
            <MoreVertical className="h-3 w-3" />
          </button>
        </div>

        {/* Action Popup Menu */}
        {menuOpen && (
          <div
            className="absolute right-2 top-7 z-20 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-xl border border-neutral-200 dark:border-neutral-700 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            {isDir && (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onNewFile(node.path);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <FilePlus className="h-3.5 w-3.5" /> New File
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onNewFolder(node.path);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <FolderPlus className="h-3.5 w-3.5" /> New Folder
                </button>
                <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-1" />
              </>
            )}

            <button
              onClick={() => {
                setMenuOpen(false);
                onRename(node.path, node.name);
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
            >
              <Edit2 className="h-3.5 w-3.5" /> Rename
            </button>

            {!isDir && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDuplicate(node.path);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
              >
                <Copy className="h-3.5 w-3.5" /> Duplicate
              </button>
            )}

            <button
              onClick={() => {
                setMenuOpen(false);
                onCopyPath(node.path);
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
            >
              <Copy className="h-3.5 w-3.5" /> Copy Path
            </button>

            <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-1" />

            <button
              onClick={() => {
                setMenuOpen(false);
                onDelete(node.path, node.name, isDir);
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        )}
      </div>

      {isDir && isExpanded && node.children && (
        <div className="space-y-0.5">
          {node.children.map((child) => (
            <FileTreeNodeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFilePath={activeFilePath}
              expandedFolders={expandedFolders}
              onSelectFile={onSelectFile}
              onToggleFolder={onToggleFolder}
              onNewFile={onNewFile}
              onNewFolder={onNewFolder}
              onRename={onRename}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onCopyPath={onCopyPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectSidebar() {
  const { activeTab } = usePlaygroundStore();
  const {
    projects,
    activeProjectId,
    activeFilePath,
    expandedFolders,
    selectProject,
    switchMode,
    createProject,
    deleteProject,
    duplicateProject,
    selectFile,
    createFile,
    createFolder,
    renameFileOrFolder,
    deleteFileOrFolder,
    duplicateFile,
    toggleFolderExpand,
    fileOperationError,
    clearFileOperationError,
  } = useProjectStore();

  const [search, setSearch] = useState('');
  const [projectMenuId, setProjectMenuId] = useState<string | null>(null);

  // Modal / Input states
  const [modalAction, setModalAction] = useState<
    'new_file' | 'new_folder' | 'rename' | 'delete' | null
  >(null);
  const [modalTargetPath, setModalTargetPath] = useState<string | null>(null);
  const [modalInputValue, setModalInputValue] = useState('');
  const [modalTargetName, setModalTargetName] = useState('');
  const [modalIsDir, setModalIsDir] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId);

  // Filter projects by active tab mode ONLY
  const activeModeProjects = projects.filter((p) => {
    const isReact = p.activeTab === 'react' || p.language === 'react';
    return activeTab === 'react' ? isReact : !isReact;
  });

  const filteredProjects = activeModeProjects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClick = () => {
      setProjectMenuId(null);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleOpenNewFileModal = (parentPath: string | null = null) => {
    clearFileOperationError();
    setModalAction('new_file');
    setModalTargetPath(parentPath);
    setModalInputValue('');
  };

  const handleOpenNewFolderModal = (parentPath: string | null = null) => {
    clearFileOperationError();
    setModalAction('new_folder');
    setModalTargetPath(parentPath);
    setModalInputValue('');
  };

  const handleOpenRenameModal = (path: string, currentName: string) => {
    clearFileOperationError();
    setModalAction('rename');
    setModalTargetPath(path);
    setModalInputValue(currentName);
  };

  const handleOpenDeleteModal = (path: string, name: string, isDir: boolean) => {
    clearFileOperationError();
    setModalAction('delete');
    setModalTargetPath(path);
    setModalTargetName(name);
    setModalIsDir(isDir);
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedNotification(`Copied path: ${path}`);
    setTimeout(() => setCopiedNotification(null), 2000);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalAction) return;

    if (modalAction === 'new_file') {
      const ok = await createFile(modalTargetPath, modalInputValue);
      if (ok) setModalAction(null);
    } else if (modalAction === 'new_folder') {
      const ok = await createFolder(modalTargetPath, modalInputValue);
      if (ok) setModalAction(null);
    } else if (modalAction === 'rename' && modalTargetPath) {
      const ok = await renameFileOrFolder(modalTargetPath, modalInputValue);
      if (ok) setModalAction(null);
    } else if (modalAction === 'delete' && modalTargetPath) {
      await deleteFileOrFolder(modalTargetPath);
      setModalAction(null);
    }
  };

  return (
    <div className="w-full md:w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex flex-col h-full overflow-hidden select-none">
      {/* Workspace Mode Selector Tabs */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Explorer
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleOpenNewFileModal(null)}
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
              title="New File in Active Project"
            >
              <FilePlus className="h-4 w-4" />
            </button>
            {activeTab === 'react' && (
              <button
                onClick={() => handleOpenNewFolderModal(null)}
                className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                title="New Folder in Active Project"
              >
                <FolderPlus className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* New Project or File Button for Active Mode */}
        <button
          onClick={() => {
            if (activeTab === 'javascript') {
              handleOpenNewFileModal(null);
            } else {
              createProject(undefined, undefined, 'react');
            }
          }}
          className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md py-1.5 text-xs transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{activeTab === 'react' ? 'New React JS Project' : 'New JavaScript File'}</span>
        </button>

        {/* Search Input for Active Mode */}
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-2 text-neutral-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'react' ? 'React JS' : 'JavaScript'}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Notifications / Errors */}
      {fileOperationError && (
        <div className="m-2 p-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded text-xs text-red-600 dark:text-red-400 flex items-start gap-1.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="flex-1">{fileOperationError}</div>
        </div>
      )}

      {copiedNotification && (
        <div className="m-2 p-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded text-xs text-blue-600 dark:text-blue-400 font-medium">
          {copiedNotification}
        </div>
      )}

      {/* Workspace Project & File Explorer */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {activeTab === 'javascript' ? (
          (() => {
            const activeProject =
              projects.find((p) => p.id === activeProjectId) ||
              projects.find((p) => p.activeTab !== 'react' && p.language !== 'react');
            const jsFiles = (activeProject?.files || []).filter((f) => f.type === 'file');
            const filteredJsFiles = jsFiles.filter((f) =>
              f.name.toLowerCase().includes(search.toLowerCase())
            );

            if (filteredJsFiles.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-full">
                    <FileCode2 className="h-6 w-6 text-yellow-500" />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    {search ? 'No JavaScript files match your search.' : 'No JavaScript files found.'}
                  </p>
                  <button
                    onClick={() => handleOpenNewFileModal(null)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors"
                  >
                    + Create JavaScript File
                  </button>
                </div>
              );
            }

            return (
              <div className="space-y-1">
                {filteredJsFiles.map((f) => {
                  const displayPath = f.name;
                  const isActive = activeFilePath === f.path || activeFilePath === displayPath;
                  return (
                    <div
                      key={f.id}
                      onClick={() => selectFile(f.path)}
                      className={`group flex items-center justify-between py-1.5 px-2.5 rounded-md text-xs cursor-pointer transition-colors relative ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {getFileIcon(displayPath)}
                        <span className="truncate">{displayPath}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenRenameModal(f.path, f.name);
                          }}
                          className="p-1 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500"
                          title="Rename File"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateFile(f.path);
                          }}
                          className="p-1 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500"
                          title="Duplicate File"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDeleteModal(f.path, f.name, false);
                          }}
                          className="p-1 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-red-500"
                          title="Delete File"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-full">
              <Atom className="h-6 w-6 text-cyan-500" />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {search ? 'No React JS projects match your search.' : 'No React JS projects found.'}
            </p>
            <button
              onClick={() => createProject(undefined, undefined, 'react')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors"
            >
              + Create React Project
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const isProjectActive = activeProjectId === project.id;
            const fileTree = buildFileTree(project.files || []);

            return (
              <div key={project.id} className="space-y-0.5">
                <div
                  onClick={() => selectProject(project.id)}
                  className={`relative group flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                    isProjectActive
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-semibold'
                      : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <Atom className={`h-3.5 w-3.5 shrink-0 ${isProjectActive ? 'text-cyan-500' : 'text-neutral-400'}`} />
                    <span className="truncate">{project.name}</span>
                  </div>

                  <div className={`flex items-center gap-1 transition-opacity ${projectMenuId === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectMenuId(projectMenuId === project.id ? null : project.id);
                      }}
                      className="p-0.5 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Project Context Menu */}
                  {projectMenuId === project.id && (
                    <div
                      className="absolute right-2 top-7 z-30 w-36 bg-white dark:bg-neutral-800 rounded-md shadow-xl border border-neutral-200 dark:border-neutral-700 py-1 text-xs text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          duplicateProject(project.id);
                          setProjectMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                      >
                        <Copy className="h-3.5 w-3.5" /> Duplicate
                      </button>
                      <button
                        onClick={() => {
                          deleteProject(project.id);
                          setProjectMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Render Files for Active React Project */}
                {isProjectActive && (
                  <div className="pl-1 border-l border-neutral-200 dark:border-neutral-800 ml-2 space-y-0.5">
                    {fileTree.map((node) => (
                      <FileTreeNodeItem
                        key={node.path}
                        node={node}
                        depth={0}
                        activeFilePath={activeFilePath}
                        expandedFolders={expandedFolders}
                        onSelectFile={selectFile}
                        onToggleFolder={toggleFolderExpand}
                        onNewFile={handleOpenNewFileModal}
                        onNewFolder={handleOpenNewFolderModal}
                        onRename={handleOpenRenameModal}
                        onDelete={handleOpenDeleteModal}
                        onDuplicate={duplicateFile}
                        onCopyPath={handleCopyPath}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Operation Modals */}
      {modalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-800 w-full max-w-sm p-4 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {modalAction === 'new_file' && 'Create New File'}
              {modalAction === 'new_folder' && 'Create New Folder'}
              {modalAction === 'rename' && 'Rename Item'}
              {modalAction === 'delete' && 'Confirm Deletion'}
            </h3>

            {modalAction === 'delete' ? (
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Are you sure you want to delete {modalIsDir ? 'folder' : 'file'}{' '}
                <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                  &quot;{modalTargetName}&quot;
                </span>
                {modalIsDir ? ' and all of its contents?' : '?'}
              </p>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                    {modalAction === 'new_file' && 'File Name'}
                    {modalAction === 'new_folder' && 'Folder Name'}
                    {modalAction === 'rename' && 'New Name'}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={modalInputValue}
                    onChange={(e) => setModalInputValue(e.target.value)}
                    placeholder={
                      modalAction === 'new_file' ? 'e.g. Button.jsx' : 'e.g. components'
                    }
                    className="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md text-xs outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                {modalTargetPath && (
                  <div className="text-[11px] text-neutral-400">
                    Target directory: <span className="font-mono">{modalTargetPath}</span>
                  </div>
                )}
              </form>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalAction(null)}
                className="px-3 py-1.5 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium"
              >
                Cancel
              </button>
              {modalAction === 'delete' ? (
                <button
                  type="button"
                  onClick={handleModalSubmit}
                  className="px-3 py-1.5 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm"
                >
                  Delete
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleModalSubmit}
                  className="px-3 py-1.5 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer statistics */}
      <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 shrink-0 text-center text-[11px] text-neutral-400 font-medium">
        {activeTab === 'react' ? `React JS Projects · ${activeModeProjects.length}` : 'JavaScript Workspace'}
      </div>
    </div>
  );
}
