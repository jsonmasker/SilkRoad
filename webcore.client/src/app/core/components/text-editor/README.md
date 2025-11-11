# Text Editor Component# Text Editor Component Usage



A rich text editor component built with Angular and ngx-editor library.The Text Editor component is now integrated with the AngularEditor library and ready to use. Here are some examples of how to use it:



## Features## Basic Usage



- Rich text editing with comprehensive toolbar```typescript

- Form integration with Angular Reactive Formsimport { Component } from '@angular/core';

- Customizable toolbarimport { TextEditorComponent } from './core/components/generals/text-editor';

- Two-way data binding

- Disabled/readonly mode@Component({

- Responsive design  selector: 'app-example',

- TypeScript support  template: `

    <app-text-editor 

## Installation      [(ngModel)]="content"

      placeholder="Enter your content here..."

The ngx-editor package is already installed in this project. The global styles have been imported in `src/scss/styles.scss`.      (contentChanged)="onContentChanged($event)">

    </app-text-editor>

## Basic Usage  `

})

### Import the Componentexport class ExampleComponent {

  content: string = '';

```typescript

import { TextEditorComponent } from './core/components/generals/text-editor';  onContentChanged(content: string) {

```    console.log('Content changed:', content);

  }

### Simple Usage}

```

```html

<app-text-editor ## Using with Reactive Forms

  [(ngModel)]="content"

  placeholder="Enter your content..."```typescript

  height="300px">import { Component } from '@angular/core';

</app-text-editor>import { FormBuilder, FormGroup } from '@angular/forms';

```

@Component({

### Form Integration  selector: 'app-form-example',

  template: `

```typescript    <form [formGroup]="myForm">

import { FormControl, FormGroup } from '@angular/forms';      <app-text-editor 

        formControlName="description"

export class MyComponent {        placeholder="Enter description..."

  form = new FormGroup({        [config]="editorConfig">

    content: new FormControl('')      </app-text-editor>

  });    </form>

}  `

```})

export class FormExampleComponent {

```html  myForm: FormGroup;

<form [formGroup]="form">

  <app-text-editor   editorConfig = {

    formControlName="content"    height: '300px',

    placeholder="Write your content..."    uploadUrl: '/api/upload',

    height="400px">    toolbarHiddenButtons: [

  </app-text-editor>      ['bold', 'italic'],

</form>      ['fontSize']

```    ]

  };

## Component Properties

  constructor(private fb: FormBuilder) {

### Inputs    this.myForm = this.fb.group({

      description: ['']

| Property | Type | Default | Description |    });

|----------|------|---------|-------------|  }

| `placeholder` | `string` | `'Type here...'` | Placeholder text when editor is empty |}

| `height` | `string` | `'300px'` | Height of the editor |```

| `disabled` | `boolean` | `false` | Whether the editor is disabled |

| `toolbar` | `ToolbarItem[][]` | Full toolbar | Custom toolbar configuration |## Custom Configuration



### Outputs```typescript

import { AngularEditorConfig } from '@kolkov/angular-editor';

| Event | Type | Description |

|-------|------|-------------|export class MyComponent {

| `contentChange` | `EventEmitter<string>` | Emitted when content changes |  customConfig: AngularEditorConfig = {

    editable: true,

## Custom Toolbar    spellcheck: true,

    height: '400px',

You can customize the toolbar by passing a custom configuration:    minHeight: '200px',

    placeholder: 'Enter text here...',

```typescript    translate: 'no',

import { ToolbarItem } from 'ngx-editor';    defaultFontName: 'Arial',

    defaultFontSize: '3',

export class MyComponent {    fonts: [

  customToolbar: ToolbarItem[][] = [      {class: 'arial', name: 'Arial'},

    ['bold', 'italic', 'underline'],      {class: 'times-new-roman', name: 'Times New Roman'},

    ['ordered_list', 'bullet_list'],      {class: 'calibri', name: 'Calibri'},

    ['link', 'image']    ],

  ];    customClasses: [

}      {

```        name: 'quote',

        class: 'quote',

```html      },

<app-text-editor       {

  [toolbar]="customToolbar"        name: 'redText',

  [(ngModel)]="content">        class: 'redText'

</app-text-editor>      }

```    ],

    uploadUrl: 'v1/images', // if needed

## Available Toolbar Items    sanitize: true,

    toolbarPosition: 'top'

- **Text Formatting**: `bold`, `italic`, `underline`, `strike`, `code`  };

- **Paragraphs**: `blockquote`, `heading` (h1-h6)}

- **Lists**: `ordered_list`, `bullet_list````

- **Links & Media**: `link`, `image`

- **Colors**: `text_color`, `background_color`## Available Input Properties

- **Alignment**: `align_left`, `align_center`, `align_right`, `align_justify`

- **History**: `undo`, `redo`- `placeholder`: String - Placeholder text for the editor

- `config`: AngularEditorConfig - Custom configuration for the editor

## Examples

## Available Output Events

### Basic Editor

```html- `contentChanged`: EventEmitter<string> - Emits when content changes

<app-text-editor 

  placeholder="Start typing..."## Features

  height="250px"

  (contentChange)="onContentChange($event)">- Rich text editing with toolbar

</app-text-editor>- Customizable toolbar buttons

```- File upload support (when uploadUrl is configured)

- Form control integration (supports both template-driven and reactive forms)

### Read-only Editor- Custom CSS classes for styling content

```html- Responsive design

<app-text-editor - Sanitization for security

  [disabled]="true"- Multiple font options

  [ngModel]="readOnlyContent">- Custom height and width settings

</app-text-editor>

```## Styling



### Minimal ToolbarThe component includes responsive CSS that adapts to mobile devices and provides a clean, professional appearance that matches modern UI frameworks.
```typescript
minimalToolbar: ToolbarItem[][] = [
  ['bold', 'italic'],
  ['link']
];
```

```html
<app-text-editor 
  [toolbar]="minimalToolbar"
  [(ngModel)]="content">
</app-text-editor>
```

## Styling

The component includes comprehensive CSS styling that can be customized by overriding the CSS classes in your component's stylesheet:

```scss
::ng-deep {
  .text-editor-wrapper {
    // Custom styles here
  }
}
```

## Demo Components

- `SimpleEditorDemoComponent`: Basic usage example
- `TextEditorExampleComponent`: Comprehensive examples with forms

## Requirements

- Angular 15+
- ngx-editor 19.0.0-beta.1+
- @angular/forms (for form integration)

## Notes

- The component implements `ControlValueAccessor` for seamless form integration
- Global ngx-editor styles are imported in the main styles file
- The editor automatically destroys itself in `ngOnDestroy` to prevent memory leaks