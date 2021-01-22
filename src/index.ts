import { StyledCRUDList as CRUDList } from './components/crud-list'
import { MutableDialog } from './components/mutable-dialog'
import { RWTable } from './components/rw-table'
import { CRUDKV } from './components/crud-kv';
import { CRUDTree } from './components/crud-tree';

import { GraphKanban } from './components/kanban'

import { PDFCard } from './components/pdf-card'
import { StyledCircles as TeamCircles } from './components/team-circles';

import { GLBCard } from './components/3d-card';
import { StyledHeader as Header } from './components/header';
import { MoreMenu } from './components/more-menu';

import { StyledSearchTable as SearchTable } from './components/search-table';
import { StyledPermissionForm as PermissionForm } from './components/permission-form'


import { StyledShortcutLinks as ShortcutLinks } from './components/shortcut-links'
import { StyledAccordionList as AccordionList } from './components/accordion-list'

import { DocumentEditor } from './components/document-editor';
import { StyledFileBrowser as FileBrowser } from './components/file-browser'
import { StyledFileDrop as FileDrop } from './components/file-drop';

import { StyledCalendar as Calendar } from './components/calendar'

/*import { pdfjs } from 'react-pdf';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
*/

//setChonkyDefaults({ iconComponent: ChonkyIconFA });

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export {
  Calendar,
  ShortcutLinks,
  DocumentEditor,
  FileDrop,
  FileBrowser,
  AccordionList,
  CRUDList,
  CRUDTree,
  CRUDKV,
  MutableDialog,
  RWTable,
  GraphKanban,
  PDFCard,
  TeamCircles,
  GLBCard,
  Header,
  MoreMenu,
  PermissionForm,
  SearchTable
}
