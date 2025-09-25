import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent,
  FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective, TemplateIdDirective
} from '@coreui/angular';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { SelectedQuestionModel } from '@models/survey-models/survey-form.model';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { IconDirective } from '@coreui/icons-angular';
import { cilPen, cilPlus, cilTrash } from '@coreui/icons';
import { QuestionModel } from '@models/survey-models/question.model';
import { PredefinedAnswerModel } from '@models/survey-models/predefined-answer.model';
import { BookIconComponent } from "@components/icons/book-icon.component";
import { CommonModule } from '@angular/common';


const predefinedAnswerList: PredefinedAnswerModel[] = [
  { id: "1", questionId: "1", nameEN: 'Answer 1', nameVN: 'Câu trả lời 1', priority: 1 },
  { id: "2", questionId: "1", nameEN: 'Answer 2', nameVN: 'Câu trả lời 2', priority: 2 },
  { id: "3", questionId: "2", nameEN: 'Answer 3', nameVN: 'Câu trả lời 3', priority: 3 },
  { id: "4", questionId: "2", nameEN: 'Answer 4', nameVN: 'Câu trả lời 4', priority: 4 },
];

const questionList: QuestionModel[] = [
  { id: "1", questionTypeId: 1, priority: 1, nameEN: 'Question 1', nameVN: 'Câu hỏi 1', predefinedAnswers: [...predefinedAnswerList] },
  { id: "2", questionTypeId: 1, priority: 2, nameEN: 'Question 2', nameVN: 'Câu hỏi 2', predefinedAnswers: [...predefinedAnswerList] },
  { id: "3", questionTypeId: 1, priority: 3, nameEN: 'Question 3', nameVN: 'Câu hỏi 3', predefinedAnswers: [...predefinedAnswerList] },
];

const questionGroupList: QuestionGroupModel[] = [
  { id: "1", nameEN: 'Group 1', nameVN: 'Nhóm 1', priority: 1, questions: [questionList[0], questionList[1]] },
  { id: "2", nameEN: 'Group 2', nameVN: 'Nhóm 2', priority: 2, questions: [questionList[2]] },
];

@Component({
  selector: 'app-create-helper',
  imports: [ReactiveFormsModule, ButtonDirective, CommonModule, TableDirective, IconDirective, BookIconComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent],
  templateUrl: './create-helper.component.html',
  styleUrl: './create.component.scss'
})

export class CreateHelperComponent {
  //#region Variables
  icons: any = { cilPlus, cilTrash, cilPen };

  questionGroups: QuestionGroupModel[] = [...questionGroupList];
  questions: QuestionModel[] = [...questionList];

  showQuestionChildrenByParentId = signal<string | null>(null);
  showPredefinedAnswerChildrenByParentId = signal<string | null>(null);

  visibleCreateQuestionModal = signal(false);
  visibleDeleteQuestionModal = signal(false);
  visibleCreateQuestionGroupModal = signal(false);
  visibleDeleteQuestionGroupModal = signal(false);

  createQuestionGroupForm = new FormGroup({
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  createQuestionForm = new FormGroup({
    questionTypeId: new FormControl(1, [Validators.required]),
    nameEN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    nameVN: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    priority: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  //#endregion
  
  //#region table tree
  toggleQuestionNode(node: QuestionGroupModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showQuestionChildrenByParentId.set(node.id);
    } else {
      this.showQuestionChildrenByParentId.set(null);
    }
  }
  togglePredefinedAnswerNode(node: QuestionModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showPredefinedAnswerChildrenByParentId.set(node.id);
    } else {
      this.showPredefinedAnswerChildrenByParentId.set(null);
    }
  }
  //#endregion
  
  //#endregion form submit
  onSubmitCreateQuestionGroup(): void {
    if (this.createQuestionGroupForm.valid) {
      const newQuestionGroup: QuestionGroupModel = {
        id: (this.questionGroups.length + 1).toString(),
        nameEN: this.createQuestionGroupForm.value.nameEN ?? '',
        nameVN: this.createQuestionGroupForm.value.nameVN ?? '',
        priority: this.createQuestionGroupForm.value.priority ?? 1,
        questions: []
      };
      this.questionGroups.push(newQuestionGroup);
      this.createQuestionGroupForm.reset({ nameEN: '', nameVN: '', priority: 1 });
      this.toggleCreateQuestionGroupModal();
    } else {
      this.createQuestionGroupForm.markAllAsTouched();
    }
  }

  onSubmitCreateQuestion(): void {
    if (this.createQuestionForm.valid) {
      const newQuestion: QuestionModel = {
        id: (this.questions.length + 1).toString(),
        questionTypeId: this.createQuestionForm.value.questionTypeId ?? 1,
        nameEN: this.createQuestionForm.value.nameEN ?? '',
        nameVN: this.createQuestionForm.value.nameVN ?? '',
        priority: this.createQuestionForm.value.priority ?? 1,
        predefinedAnswers: []
      };
      this.questions.push(newQuestion);
      this.createQuestionForm.reset({ questionTypeId: 1, nameEN: '', nameVN: '', priority: 1 });
      this.toggleCreateQuestionModal();
    } else {
      this.createQuestionForm.markAllAsTouched();
    }
  }
  //#endregion


  //#region modal
  toggleCreateQuestionModal(): void {
    this.visibleCreateQuestionModal.set(!this.visibleCreateQuestionModal());
  }
  handleCreateQuestionModalChange(event: any) {
    this.visibleCreateQuestionModal.set(event);
  }

  toggleDeleteQuestionModal(): void {
    this.visibleDeleteQuestionModal.set(!this.visibleDeleteQuestionModal());
  }
  handleDeleteQuestionModalChange(event: any) {
    this.visibleDeleteQuestionModal.set(event);
  }

  toggleCreateQuestionGroupModal(): void {
    this.visibleCreateQuestionGroupModal.set(!this.visibleCreateQuestionGroupModal());
  }
  handleCreateQuestionGroupModalChange(event: any) {
    this.visibleCreateQuestionGroupModal.set(event);
  }

  toggleDeleteQuestionGroupModal(): void {
    this.visibleDeleteQuestionGroupModal.set(!this.visibleDeleteQuestionGroupModal());
  }
  handleDeleteQuestionGroupModalChange(event: any) {
    this.visibleDeleteQuestionGroupModal.set(event);
  }
  //#endregion
}
