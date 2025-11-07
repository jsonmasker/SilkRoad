# Word to PDF Converter - Backend Implementation Guide

## Overview
This document provides guidance for implementing the backend API to support the Word to PDF converter frontend.

## Required Backend Endpoint

### POST /api/convert/word-to-pdf

**Description:** Converts a Word document to PDF format.

**Request:**
- Content-Type: multipart/form-data
- Body: FormData with 'file' field containing the Word document

**Response:**
- Content-Type: application/pdf
- Body: PDF file as binary data

## C# ASP.NET Core Implementation Example

### 1. Install Required NuGet Packages

```xml
<PackageReference Include="DocumentFormat.OpenXml" Version="2.20.0" />
<PackageReference Include="iTextSharp" Version="5.5.13.3" />
<!-- OR -->
<PackageReference Include="Aspose.Words" Version="23.x.x" />
```

### 2. Create the Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ConvertController : ControllerBase
{
    private readonly IWordToPdfConverter _converter;
    private readonly ILogger<ConvertController> _logger;

    public ConvertController(IWordToPdfConverter converter, ILogger<ConvertController> logger)
    {
        _converter = converter;
        _logger = logger;
    }

    [HttpPost("word-to-pdf")]
    public async Task<IActionResult> ConvertWordToPdf(IFormFile file)
    {
        try
        {
            // Validate file
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            // Check file type
            var allowedExtensions = new[] { ".doc", ".docx" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest("Only .doc and .docx files are supported");
            }

            // Check file size (50MB limit)
            if (file.Length > 50 * 1024 * 1024)
            {
                return BadRequest("File size exceeds 50MB limit");
            }

            // Convert file
            using var inputStream = new MemoryStream();
            await file.CopyToAsync(inputStream);
            inputStream.Position = 0;

            var pdfBytes = await _converter.ConvertWordToPdfAsync(inputStream);
            
            var fileName = Path.GetFileNameWithoutExtension(file.FileName) + ".pdf";
            
            return File(pdfBytes, "application/pdf", fileName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error converting Word to PDF");
            return StatusCode(500, "An error occurred during conversion");
        }
    }
}
```

### 3. Create the Conversion Service Interface

```csharp
public interface IWordToPdfConverter
{
    Task<byte[]> ConvertWordToPdfAsync(Stream wordStream);
}
```

### 4. Implementation using Aspose.Words (Recommended)

```csharp
using Aspose.Words;
using System.IO;
using System.Threading.Tasks;

public class AsposeWordToPdfConverter : IWordToPdfConverter
{
    public async Task<byte[]> ConvertWordToPdfAsync(Stream wordStream)
    {
        // Load the Word document
        var document = new Document(wordStream);
        
        // Convert to PDF
        using var pdfStream = new MemoryStream();
        document.Save(pdfStream, SaveFormat.Pdf);
        
        return pdfStream.ToArray();
    }
}
```

### 5. Alternative Implementation using DocumentFormat.OpenXml + iTextSharp

```csharp
// Note: This is more complex and may not preserve all formatting
public class OpenXmlWordToPdfConverter : IWordToPdfConverter
{
    public async Task<byte[]> ConvertWordToPdfAsync(Stream wordStream)
    {
        // This is a simplified example - full implementation would be much more complex
        // Consider using Aspose.Words for production use
        
        using var document = WordprocessingDocument.Open(wordStream, false);
        var body = document.MainDocumentPart.Document.Body;
        
        using var pdfStream = new MemoryStream();
        var pdfDocument = new iTextSharp.text.Document();
        var writer = PdfWriter.GetInstance(pdfDocument, pdfStream);
        
        pdfDocument.Open();
        
        // Extract text and add to PDF (this is very basic)
        var text = body.InnerText;
        pdfDocument.Add(new Paragraph(text));
        
        pdfDocument.Close();
        
        return pdfStream.ToArray();
    }
}
```

### 6. Register Services in Program.cs

```csharp
// Add to your Program.cs or Startup.cs
builder.Services.AddScoped<IWordToPdfConverter, AsposeWordToPdfConverter>();

// Configure CORS if needed
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200") // Your Angular app URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAngularApp");
```

## Security Considerations

1. **File Validation:** Always validate file types and sizes
2. **Virus Scanning:** Consider integrating virus scanning for uploaded files
3. **Rate Limiting:** Implement rate limiting to prevent abuse
4. **Authentication:** Add authentication if required
5. **Temporary File Cleanup:** Ensure temporary files are cleaned up

## Performance Optimization

1. **Async Processing:** Use async/await for I/O operations
2. **Memory Management:** Dispose of streams and documents properly
3. **Caching:** Consider caching converted files if appropriate
4. **Background Processing:** For large files, consider background job processing

## Testing

```csharp
[Test]
public async Task ConvertWordToPdf_ValidFile_ReturnsValidPdf()
{
    // Arrange
    var converter = new AsposeWordToPdfConverter();
    var wordFile = File.OpenRead("test.docx");
    
    // Act
    var pdfBytes = await converter.ConvertWordToPdfAsync(wordFile);
    
    // Assert
    Assert.IsNotNull(pdfBytes);
    Assert.IsTrue(pdfBytes.Length > 0);
    // Additional PDF validation...
}
```

## Frontend Integration

Once the backend is implemented, update the Angular service to call the actual API:

1. Remove the demo simulation code
2. Uncomment the real API call in `convertFile()` method
3. Update the API URL in `WordToPdfService`

The frontend is already prepared to handle:
- Progress reporting
- Error handling
- File validation
- Success states
