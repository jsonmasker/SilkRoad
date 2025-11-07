# Word to PDF Converter Component

A modern, user-friendly Angular component for converting Word documents (.doc, .docx) to PDF format with drag-and-drop functionality, progress tracking, and beautiful UI/UX.

## Features

✨ **Modern UI/UX**
- Beautiful gradient design with glassmorphism effects
- Drag and drop file upload
- Responsive design for all screen sizes
- Smooth animations and transitions

🔒 **File Validation**
- Supports .doc and .docx files only
- File size limit (50MB)
- Real-time validation feedback

📊 **Progress Tracking**
- Real-time upload and conversion progress
- Status messages during conversion
- Success/error state handling

⚡ **Performance Optimized**
- Async file processing
- Memory-efficient handling
- Background processing support

## Usage

### 1. Import the Component

```typescript
import { ConvertWordToPdfComponent } from './views/features/convert-word-to-pdf/convert-word-to-pdf.component';

// In your routes or component imports
{
  path: 'convert-word-to-pdf',
  component: ConvertWordToPdfComponent
}
```

### 2. Add to Template

```html
<app-convert-word-to-pdf></app-convert-word-to-pdf>
```

### 3. Backend Integration

The component includes a service (`WordToPdfService`) that handles API communication. To integrate with your backend:

1. Update the API endpoint in `word-to-pdf.service.ts`:
   ```typescript
   private readonly apiUrl = 'https://your-api-domain.com/api/convert';
   ```

2. Uncomment the real API call in the component's `convertFile()` method

3. Implement the backend endpoint (see `BACKEND_IMPLEMENTATION.md`)

## File Structure

```
convert-word-to-pdf/
├── convert-word-to-pdf.component.html     # Template
├── convert-word-to-pdf.component.scss     # Styles
├── convert-word-to-pdf.component.ts       # Component logic
├── word-to-pdf.service.ts                 # API service
├── BACKEND_IMPLEMENTATION.md              # Backend guide
└── README.md                              # This file
```

## Component API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedFile` | `File \| null` | `null` | Currently selected file |
| `convertedFile` | `ConvertedFile \| null` | `null` | Converted PDF file |
| `isConverting` | `boolean` | `false` | Conversion in progress |
| `conversionProgress` | `number` | `0` | Progress percentage (0-100) |
| `maxFileSize` | `number` | `52428800` | Maximum file size (50MB) |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `onDragOver()` | `event: DragEvent` | Handle drag over event |
| `onDragLeave()` | `event: DragEvent` | Handle drag leave event |
| `onDrop()` | `event: DragEvent` | Handle file drop event |
| `onFileSelected()` | `event: Event` | Handle file selection from input |
| `convertFile()` | - | Start conversion process |
| `downloadFile()` | - | Download converted PDF |
| `resetConverter()` | - | Reset component state |

## Customization

### Styling

The component uses SCSS with CSS custom properties. You can customize the appearance by overriding these variables:

```scss
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #27ae60;
  --error-color: #e74c3c;
  --warning-color: #f39c12;
}
```

### File Size Limits

Update the `maxFileSize` property in the component:

```typescript
maxFileSize = 100 * 1024 * 1024; // 100MB
```

### Supported File Types

Modify the validation in `WordToPdfService`:

```typescript
const allowedExtensions = ['.doc', '.docx', '.rtf']; // Add more types
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Demo Mode

The component includes a demo mode that simulates the conversion process without requiring a backend. This is useful for:

- Development and testing
- Demonstrating the UI/UX
- Frontend-only environments

To enable production mode, uncomment the real API calls in the `convertFile()` method.

## Security Considerations

- File type validation on both frontend and backend
- File size limits to prevent abuse
- Virus scanning for uploaded files (backend)
- Rate limiting for API endpoints
- HTTPS for file uploads

## Performance Tips

1. **Large Files**: Consider implementing chunked uploads for files > 10MB
2. **Background Processing**: Use background jobs for conversion-heavy workloads
3. **Caching**: Cache converted files temporarily for re-downloads
4. **CDN**: Serve static assets through a CDN

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your Angular app domain
2. **File Upload Fails**: Check file size limits and supported types
3. **Conversion Timeout**: Increase timeout settings for large files
4. **Memory Issues**: Implement streaming for very large files

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Please select a valid Word document" | Invalid file type | Use .doc or .docx files |
| "File size exceeds limit" | File too large | Reduce file size or increase limit |
| "Conversion failed" | Backend error | Check backend logs and API status |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This component is part of the LulusiaKingdom project.
