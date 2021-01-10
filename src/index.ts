import { CRUDList } from './components/crud-list'
import { MutableDialog } from './components/mutable-dialog'
import { RWTable } from './components/rw-table'
import { CRUDKV } from './components/crud-kv';
import { CRUDTree } from './components/crud-tree';

import { GraphKanban } from './components/kanban'

import { PDFCard } from './components/pdf-card'
import { TeamCircles } from './components/team-circles';

import { GLBCard } from './components/3d-card';
import { Header } from './components/header';
import { MoreMenu } from './components/more-menu';

import { SearchTable } from './components/search-table';
import { PermissionForm } from './components/permission-form'

import { AccordionList } from './components/accordion-list'

import { WorkhubFileBrowser as FileBrowser } from './components/file-browser'
import { StyledFileDrop as FileDrop } from './components/file-drop';

import { pdfjs } from 'react-pdf';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export { FileDrop, FileBrowser, AccordionList, CRUDList, CRUDTree, CRUDKV, MutableDialog, RWTable, GraphKanban, PDFCard, TeamCircles, GLBCard, Header, MoreMenu, PermissionForm, SearchTable }
