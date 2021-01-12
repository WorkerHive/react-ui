import { StyledCRUDList as CRUDList, CRUDListProps } from './components/crud-list'
import { MutableDialog, MutableDialogProps } from './components/mutable-dialog'
import { RWTable, RWTableProps } from './components/rw-table'
import { CRUDKV, CRUDKVProps } from './components/crud-kv';
import { CRUDTree, CRUDTreeProps } from './components/crud-tree';

import { GraphKanban, GraphKanbanProps } from './components/kanban'

import { PDFCard, PDFCardProps } from './components/pdf-card'
import { StyledCircles as TeamCircles, TeamCirclesProps } from './components/team-circles';

import { GLBCard, GLBCardProps } from './components/3d-card';
import { StyledHeader as Header, HeaderProps } from './components/header';
import { MoreMenu, MoreMenuProps } from './components/more-menu';

import { StyledSearchTable as SearchTable, SearchTableProps } from './components/search-table';
import { StyledPermissionForm as PermissionForm, PermissionFormProps } from './components/permission-form'


import { StyledShortcutLinks as ShortcutLinks, ShortcutLinksProps } from './components/shortcut-links'
import { StyledAccordionList as AccordionList, AccordionListProps } from './components/accordion-list'

import { DocumentEditor, DocumentEditorProps } from './components/document-editor';
import { StyledFileBrowser as FileBrowser, FileBrowserProps } from './components/file-browser'
import { StyledFileDrop as FileDrop, FileDropProps } from './components/file-drop';

import { pdfjs } from 'react-pdf';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export {
  FileDropProps,
  FileBrowserProps,
  DocumentEditorProps,
  AccordionListProps,
  ShortcutLinksProps,
  PermissionFormProps,
  SearchTableProps,
  MoreMenuProps,
  GLBCardProps,
  MutableDialogProps,
  HeaderProps,
  TeamCirclesProps,
  CRUDKVProps,
  CRUDTreeProps,
  CRUDListProps,
  PDFCardProps,
  GraphKanbanProps,
  RWTableProps,
  ShortcutLinks, DocumentEditor, FileDrop, FileBrowser, AccordionList, CRUDList, CRUDTree, CRUDKV, MutableDialog, RWTable, GraphKanban, PDFCard, TeamCircles, GLBCard, Header, MoreMenu, PermissionForm, SearchTable }
