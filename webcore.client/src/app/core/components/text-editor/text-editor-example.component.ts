import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TextEditorComponent } from './text-editor.component';
import { CommonModule } from '@angular/common';
import { ToolbarItem } from 'ngx-editor';

@Component({
  selector: 'app-text-editor-example',
  standalone: true,
  imports: [TextEditorComponent, ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="example-container">
      <h2>Text Editor Examples</h2>
      
      <!-- Basic Usage -->
      <div class="example-section">
        <h3>Basic Usage</h3>
        <app-text-editor 
          [(ngModel)]="basicContent"
          placeholder="Enter your content here..."
          height="250px">
        </app-text-editor>
        <div class="output">
          <h4>Output:</h4>
          <pre>{{ basicContent }}</pre>
        </div>
      </div>

      <!-- Form Integration -->
      <div class="example-section">
        <h3>Form Integration</h3>
        <form [formGroup]="editorForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Title:</label>
            <input 
              id="title" 
              type="text" 
              formControlName="title" 
              class="form-control"
              placeholder="Enter title">
          </div>
          
          <div class="form-group">
            <label for="content">Content:</label>
            <app-text-editor 
              formControlName="content"
              placeholder="Write your article content..."
              height="300px">
            </app-text-editor>
            <div *ngIf="editorForm.get('content')?.invalid && editorForm.get('content')?.touched" 
                 class="error-message">
              Content is required
            </div>
          </div>
          
          <button type="submit" [disabled]="editorForm.invalid" class="submit-btn">
            Submit Article
          </button>
        </form>
        
        <div *ngIf="submittedData" class="submitted-data">
          <h4>Submitted Data:</h4>
          <p><strong>Title:</strong> {{ submittedData.title }}</p>
          <p><strong>Content:</strong></p>
          <div [innerHTML]="submittedData.content"></div>
        </div>
      </div>

      <!-- Custom Toolbar -->
      <div class="example-section">
        <h3>Custom Toolbar</h3>
        <app-text-editor 
          [(ngModel)]="customContent"
          [toolbar]="customToolbar"
          placeholder="Simple editor with limited toolbar..."
          height="200px">
        </app-text-editor>
      </div>

      <!-- Read-only Mode -->
      <div class="example-section">
        <h3>Read-only Mode</h3>
        <app-text-editor 
          [(ngModel)]="readOnlyContent"
          [disabled]="true"
          height="150px">
        </app-text-editor>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .example-section {
      margin-bottom: 40px;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background-color: #f9fafb;
    }

    .example-section h3 {
      margin-top: 0;
      color: #374151;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 8px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #374151;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
    }

    .form-control:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .error-message {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
    }

    .submit-btn {
      background-color: #3b82f6;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .submit-btn:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .output {
      margin-top: 20px;
      padding: 12px;
      background-color: #f3f4f6;
      border-radius: 4px;
    }

    .output h4 {
      margin-top: 0;
      color: #374151;
    }

    .output pre {
      background-color: #1f2937;
      color: #f9fafb;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }

    .submitted-data {
      margin-top: 20px;
      padding: 16px;
      background-color: #ecfdf5;
      border: 1px solid #10b981;
      border-radius: 4px;
    }

    .submitted-data h4 {
      margin-top: 0;
      color: #047857;
    }
  `]
})
export class TextEditorExampleComponent {
  // Basic usage
  basicContent = '<p>Hello World! This is a <strong>rich text editor</strong> built with <em>ngx-editor</em>.</p>';

  // Form integration
  editorForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  });

  submittedData: any = null;

  // Custom toolbar (simplified)
  customToolbar: ToolbarItem[][] = [
    ['bold', 'italic', 'underline'],
    ['ordered_list', 'bullet_list'],
    ['link']
  ];

  customContent = '<p>This editor has a simplified toolbar with only basic formatting options.</p>';

  // Read-only content
  readOnlyContent = '<p>This is a <strong>read-only</strong> editor. You cannot edit this content.</p><ul><li>Item 1</li><li>Item 2</li></ul>';

  onSubmit(): void {
    if (this.editorForm.valid) {
      this.submittedData = this.editorForm.value;
      console.log('Form submitted:', this.submittedData);
    }
  }
}