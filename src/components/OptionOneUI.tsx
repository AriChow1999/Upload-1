/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  X, Wand2, Plus, Folder,
  FileText, Table, Image as ImageIcon,
  Video, Music, Archive, Code
} from 'lucide-react';
import selectionIcon from '../assets/iconmonstr-selection-17.svg';
import './OptionOneUI.css';

type FileCategory = 'document' | 'spreadsheet' | 'image' | 'video' | 'audio' | 'archive' | 'code' | 'folder';

interface UploadItem {
  id: string;
  name: string;
  type: FileCategory;
}

const OptionOneUI: React.FC = () => {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [selectedModel, setSelectedModel] = useState('5.0');

  const getCategory = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['pdf', 'docx', 'txt', 'md'].includes(ext || '')) return 'document';
    if (['xlsx', 'csv', 'json'].includes(ext || '')) return 'spreadsheet';
    if (['png', 'jpg', 'jpeg', 'webp'].includes(ext || '')) return 'image';
    if (['mp4', 'mov'].includes(ext || '')) return 'video';
    if (['mp3', 'wav'].includes(ext || '')) return 'audio';
    if (['zip', 'rar', '7z'].includes(ext || '')) return 'archive';
    if (['py', 'js', 'tsx', 'ts', 'html', 'css', 'yaml'].includes(ext || '')) return 'code';
    return 'document';
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, mode: 'file' | 'folder') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: UploadItem[] = [];
    if (mode === 'folder') {
      const folderName = files[0].webkitRelativePath.split('/')[0] || "New Folder";
      newItems.push({ id: crypto.randomUUID(), name: folderName, type: 'folder' });
    } else {
      Array.from(files).forEach(f => {
        newItems.push({ id: crypto.randomUUID(), name: f.name, type: getCategory(f.name) });
      });
    }
    setItems(prev => [...prev, ...newItems]);
    e.target.value = '';
  };

  const renderIcon = (item: UploadItem) => {
    const iconSize = 14;
    switch (item.type) {
      case 'folder': return <Folder size={iconSize} className="icon-folder" />;
      case 'document': return <FileText size={iconSize} className="icon-doc" />;
      case 'spreadsheet': return <Table size={iconSize} className="icon-sheet" />;
      case 'image': return <ImageIcon size={iconSize} className="icon-image" />;
      case 'video': return <Video size={iconSize} className="icon-video" />;
      case 'audio': return <Music size={iconSize} className="icon-audio" />;
      case 'archive': return <Archive size={iconSize} className="icon-archive" />;
      case 'code': return <Code size={iconSize} className="icon-code" />;
      default: return <FileText size={iconSize} className="icon-doc" />;
    }
  };

  return (
    <div className="viewport-center">
      <div className="main-card">
        <div className="grey-input-wrapper">
          {items.length > 0 && (
            <div className="pills-scroll-container">
              <div className="pills-inner-flex">
                {items.map((item) => (
                  <div key={item.id} className="compact-pill">
                    <div className="mini-icon-box">{renderIcon(item)}</div>
                    <span className="compact-name">{item.name}</span>
                    <button className="pill-remove" onClick={() => setItems(items.filter(i => i.id !== item.id))}>
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="white-inner-container">
            <textarea placeholder="Add instructions from attached images..." />

            <div className="bottom-actions">
              <div className="actions-left">
                <label htmlFor="file-up" className="util-btn bordered">
                  <Plus size={18} />
                </label>
                <input id="file-up" type="file" multiple onChange={(e) => handleUpload(e, 'file')} style={{ display: 'none' }} />

                <label htmlFor="folder-up" className="util-btn bordered">
                  <Folder size={18} />
                </label>

                {/* Folder Upload Input 
                   Using spread with 'as any' to bypass TypeScript checking for webkitdirectory
                */}
                <input
                  id="folder-up"
                  type="file"
                  onChange={(e) => handleUpload(e, 'folder')}
                  style={{ display: 'none' }}
                  {...({
                    webkitdirectory: ""
                  } as any)}
                />

                <button className="util-btn"><Wand2 size={18} /></button>
                <button className="util-btn"><div className="mini-dashed-circle" /></button>
                <button className="util-btn">
                  <img src={selectionIcon} className="selection-svg" alt="Selection" />
                </button>

                <div className="gpt-selector-wrapper">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" className="gpt-mini-logo" alt="" />
                  <select
                    className="gpt-select-menu"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="5.0">GPT 5.0</option>
                    <option value="5.1">GPT 5.1</option>
                    <option value="5.2">GPT 5.2</option>
                    <option value="5.3">GPT 5.3</option>
                    <option value="5.4">GPT 5.4</option>
                    <option value="5.5">GPT 5.5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionOneUI;