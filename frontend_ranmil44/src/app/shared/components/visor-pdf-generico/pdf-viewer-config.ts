export interface PdfViewerConfig {
  // Servicio para obtener el PDF
  pdfService: any;
  
  // Configuración básica
  fileName: string;
  documentName?: string;

  serviceParams?: any;
  
  // Configuración de visualización
  autoLoad?: boolean;
  showControls?: boolean;
  showToolbar?: boolean;
  showDownloadButton?: boolean;
  showViewButton?: boolean;
  initialZoom?: number;
  initialView?: 'view' | 'download' | 'none';
  
  // Mensajes personalizables
  messages?: {
    loading?: string;
    success?: string;
    error?: string;
    noDocument?: string;
    successView?: string;
    successDownload?: string;
    errorView?: string;
    errorDownload?: string;
    emptyState?: string;
  };
  
  // Metadata opcional
  metadata?: any;
}