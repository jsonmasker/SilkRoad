import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective } from '@coreui/angular';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { IconDirective } from '@coreui/icons-angular';
import { cilExitToApp, cilPen, cilPlus, cilSave, cilTrash, cilX } from '@coreui/icons';
import { CommonModule } from '@angular/common';
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';
import { QuestionGroupModel } from '@models/survey-models/question-group.model';
import { QuestionModel } from '@models/survey-models/question.model';
import { UpdateHelperComponent } from './update-helper.component';
import { TextEditorComponent } from '@components/text-editor/text-editor.component';
import { ToolbarItem } from 'ngx-editor';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';

@Component({
  selector: 'app-update',
  imports: [FormControlDirective, FormLabelDirective, CardComponent, CardBodyComponent, ReactiveFormsModule, FormDirective, ButtonDirective, CommonModule, RouterLink,
    IconDirective, RangeDatetimePickerComponent, FormSelectDirective, TextEditorComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, UpdateHelperComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  //#region Variables
  initData: SurveyFormModel | null = null;
  initQuestionGroups: QuestionGroupModel[] = [];
  initQuestions: QuestionModel[] = [];
  initialTimeRange: Date[] = [];
  initDescriptionEN: string = '';
  initDescriptionVN: string = '';
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilX };
    customToolbar: ToolbarItem[][] = [
      ['bold', 'italic', 'underline'],
      ['ordered_list', 'bullet_list'],
      ['link']
    ];

  disableForm: boolean = true;

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    formStyleId: new FormControl(1, Validators.required),
    name: new FormControl('', Validators.required),
    titleEN: new FormControl('', Validators.required),
    titleVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl(''),
    descriptionVN: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isActive: new FormControl(false),
    isLimited: new FormControl(false),
    maxParticipants: new FormControl(0),
    questionGroups: new FormControl([]),
    questions: new FormControl([])
  });
  //#endregion
  constructor(
    private surveyFormService: SurveyFormService,
    private toastService: ToastService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.surveyFormService.getEagerById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.initQuestionGroups = response.data.questionGroups;
          this.initQuestions = response.data.questions;
          this.initialTimeRange = [new Date(response.data.startDate), new Date(response.data.endDate)];
          this.initDescriptionEN = response.data.descriptionEN;
          this.initDescriptionVN = response.data.descriptionVN;
          this.updateForm.patchValue(response.data);
          this.updateForm.disable();
          this.initData = response.data;
        }
      }
    });
  }
  onDateRangeChange(event: any) {
    if (event && event.length === 2) {
      this.updateForm.patchValue({
        startDate: event[0],
        endDate: event[1]
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      this.surveyFormService.update(this.updateForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastService.showToast(EColors.success, 'Survey form updated successfully');
            this.initData = this.updateForm.value;
            this.disableUpdateForm();
          } else {
            this.toastService.showToast(EColors.danger, res.message);
          }
        }
      });
    }
  }

  get formStyleId() { return this.updateForm.get('formStyleId'); }
  get name() { return this.updateForm.get('name'); }
  get titleEN() { return this.updateForm.get('titleEN'); }
  get titleVN() { return this.updateForm.get('titleVN'); }
  get startDate() { return this.updateForm.get('startDate'); }
  get endDate() { return this.updateForm.get('endDate'); }
  get isLimited() { return this.updateForm.get('isLimited'); }
  get maxParticipants() { return this.updateForm.get('maxParticipants'); }

  enableUpdateForm() {
    this.disableForm = false;
    this.updateForm.enable();
  }

  disableUpdateForm() {
    this.disableForm = true;
    this.updateForm.disable();
    // Revert form to initial data
    if(this.initData){
      this.updateForm.patchValue(this.initData);
      this.initialTimeRange = [new Date(this.initData.startDate), new Date(this.initData.endDate)];
      this.initDescriptionEN = this.initData.descriptionEN;
      this.initDescriptionVN = this.initData.descriptionVN;
    }
  }
}
