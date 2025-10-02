# Survey Form Creation Workflow
### Frontend Components
- **CreateComponent** (`create.component.ts`): Main component for survey form creation
- **CreateHelperComponent** (`create-helper.component.ts`): Helper component for managing question groups and questions
- **Services**: 
  - `SurveyFormService`: Handles survey form CRUD operations
  - `QuestionGroupLibraryService`: Manages question group libraries
  - `QuestionLibraryService`: Manages question libraries
  - `QuestionTypeService`: Handles question type operations

### Data Models
- **SurveyFormModel**: Represents the main survey form structure
- **QuestionGroupModel**: Represents question groups within a survey
- **QuestionModel**: Represents individual questions
- **PredefinedAnswerModel**: Represents predefined answer options

## Workflow Steps

### 1. Survey Information Setup
The first step involves creating the basic survey information:

#### Form Fields:
- **Name** (*required*): Internal name for the survey
- **TitleEN** (*required*): English title displayed to participants
- **TitleVN** (*required*): Vietnamese title displayed to participants
- **DescriptionEN**: Optional English description
- **DescriptionVN**: Optional Vietnamese description
- **Start Date**: Survey activation date
- **End Date**: Survey expiration date
- **IsActive**: Boolean flag to activate/deactivate survey

#### Validation:
- Required field validation for Name, TitleEN, and TitleVN
- Form state management using Angular Reactive Forms
- Real-time validation feedback

### 2. Question Groups Management
The second step allows creating and managing question groups:

#### Features:
- **Create Question Groups**: Add new question groups with priority ordering
- **Library Integration**: Import question groups from the question group library
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Hierarchical Display**: Tree-like structure showing groups and their questions

#### Question Group Fields:
- **NameEN** (*required*): English name for the question group
- **NameVN** (*required*): Vietnamese name for the question group
- **Priority** (*required*): Display order (1-255)

#### Modal Operations:
- Create Question Group Modal (with library search integration)
- Update Question Group Modal (with pre-populated form data)
- Delete Question Group Modal (with confirmation and impact warning)

### 3. Questions Management
The third step handles individual question creation and management:

#### Question CRUD Operations:
- **Create Questions**: Add new questions with library integration
- **Update Questions**: Edit existing questions with all properties
- **Delete Questions**: Remove questions with confirmation dialog
- **Library Search**: Search and select from question library using tree-select component
- **Question Types**: Support for multiple question types:
  - Open-ended questions
  - Closed-ended questions (with predefined answers)
  - Multiple choice questions
  - Hybrid questions (both predefined and custom answers)
  - Rating questions

#### Question Fields:
- **QuestionTypeId** (*required*): Type of question
- **NameEN** (*required*): English question text
- **NameVN** (*required*): Vietnamese question text
- **Priority** (*required*): Display order within group/survey

#### Modal Operations:
- Create Question Modal
- Update Question Modal (with pre-populated data and predefined answers)
- Delete Question Modal (with confirmation and question details)

#### Predefined Answers:
For certain question types (closed-ended, multiple choice, hybrid), the system supports:
- **Dynamic Answer Management**: Add/remove predefined answer options during creation/update
- **Multilingual Support**: English and Vietnamese answer texts
- **Priority Ordering**: Control display order of answer options
- **State Preservation**: Predefined answers are maintained during question updates

### 4. Advanced Features

#### Library Integration:
- **Question Group Library**: Reusable question group templates
- **Question Library**: Reusable question templates with predefined answers
- **Cloning Mechanism**: When selected from library, items are cloned to allow independent modifications

#### UI/UX Features:
- **Expandable Tree Structure**: Hierarchical display of groups → questions → answers
- **Modal-based Editing**: Clean, focused editing experience
- **Real-time Validation**: Immediate feedback on form errors
- **Responsive Design**: Works across different screen sizes

#### Form State Management:
- **Reactive Forms**: Angular reactive forms for robust form handling
- **Signal-based State**: Modern Angular signals for reactive UI updates
- **Form Validation**: Comprehensive client-side validation

## Technical Implementation

### Component Structure:
```
CreateComponent (Main)
├── Survey Information Form
└── CreateHelperComponent
    ├── Question Groups Table
    ├── Questions Table
    ├── Create/Update/Delete Modals
    └── Predefined Answers Management
```

### Data Flow:
1. **Form Initialization**: Load question types and library options
2. **User Input**: Capture survey details and question structure
3. **Validation**: Real-time form validation and error handling
4. **Library Integration**: Search and import from question libraries
5. **State Management**: Track form state and user interactions
6. **Submission**: Prepare and submit complete survey form data

### Key Services Integration:
- **Authentication**: Secure API calls with token management
- **Error Handling**: Comprehensive error handling with retry logic
- **API Integration**: RESTful API calls for CRUD operations
- **Internationalization**: Support for English and Vietnamese languages

## Supported Question Types
The system supports various question types through the `EQuestionTypes` enum:
- **Open-ended**: Free text responses
- **Closed-ended**: Predefined answer options only
- **Multiple Choice**: Multiple predefined options
- **Hybrid**: Combination of predefined options and free text
- **Rating**: Numeric rating scales

## Database Integration
The system integrates with a comprehensive database structure:
- **SurveyForm**: Main survey entity
- **QuestionGroup**: Optional grouping mechanism
- **Question**: Core question entity (can belong to group or survey directly)
- **PredefinedAnswer**: Answer options for structured questions
- **Participants**: Survey response tracking

## Flexibility Features
- **Mixed Structure**: Surveys can have both grouped and standalone questions
- **Template System**: Reusable question and group libraries
- **Multilingual**: Full English and Vietnamese support
- **Priority-based Ordering**: Flexible question and group ordering
- **Independent Modification**: Library items are cloned, allowing survey-specific customization

This workflow provides a comprehensive, flexible, and user-friendly approach to creating survey forms with rich question structures and multilingual support.