import { Component } from '@angular/core';
import { TextEditorComponent } from './text-editor.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-editor-demo',
  standalone: true,
  imports: [TextEditorComponent, FormsModule],
  template: `
    <div style="max-width: 800px; margin: 20px auto; padding: 20px;">
      <h2>Simple Text Editor Demo</h2>
      
      <div style="margin-bottom: 20px;">
        <app-text-editor 
          [placeholder]="'Start typing your content here...'"
          
          (contentChange)="onContentChange($event)">
        </app-text-editor>
      </div>

      <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
        <h3>HTML Output:</h3>
        <pre style="background: #fff; padding: 10px; border-radius: 4px; overflow-x: auto;">{{ htmlContent }}</pre>
      </div>

      <div style="margin-top: 20px; background: #f0f9ff; padding: 15px; border-radius: 8px;">
        <h3>Rendered Content:</h3>
        <div [innerHTML]="htmlContent" style="border: 1px solid #ddd; padding: 15px; background: white; border-radius: 4px;"></div>
      </div>
    </div>
  `
})
export class SimpleEditorDemoComponent {
  htmlContent = '<p>Welcome to the <strong>ngx-editor</strong> demo! Try typing some content above.</p>';

  onContentChange(content: string): void {
    this.htmlContent = content;
  }
}