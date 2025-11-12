import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyFormService } from '@services/survey-services/survey-form.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ELanguages, EQuestionTypes } from '@common/global';
import { SurveyContentComponent } from './components/survey-content/survey-content.component';
import { AnswerModel } from '@models/survey-models/answer.model';
import { ParticipantService } from '@services/survey-services/participant.service';
import { GoldThankYouComponent } from "./gold-thank-you.component";
import { GoldSurveyBodyComponent } from "./gold-survey-body.component";

@Component({
  selector: 'app-gold-survey-form',
  imports: [CommonModule, ReactiveFormsModule, SurveyContentComponent, GoldThankYouComponent, GoldSurveyBodyComponent],
  templateUrl: './gold-survey-form.component.html',
  styleUrl: './gold-survey-form.component.scss'
})
export class GoldSurveyFormComponent {
  //#region Properties
  @Input() surveyForm!: SurveyFormModel;
  @Input() isReviewMode: boolean = false;

  eLanguages = ELanguages;
  selectedLanguage: string = ELanguages.Vietnamese;
  questionTypes: any = EQuestionTypes;
  initParticipant: boolean = false;
  finished: boolean = false;
  currentPaticipantId = signal<string>('');
  answerList: AnswerModel[] = [];
  //#endregion
  //#region Constructor
  constructor(
    private route: ActivatedRoute,
    private surveyFormService: SurveyFormService,
    private participantService: ParticipantService,
    private router: Router
  ) { }

  handleChangeLanguage() {
    this.selectedLanguage = this.selectedLanguage === ELanguages.Vietnamese ? ELanguages.English : ELanguages.Vietnamese;
  }
  //#endregion
  
  // ngOnInit(): void {
  //   const surveyId = this.route.snapshot.paramMap.get('id');    
  //   var validForm = true;
  //   // var validForm = this.surveyFormService.checkValidForm(surveyId);
  //   if (!validForm) {
  //     this.router.navigate(['gold-finish', surveyId]);
  //     return;
  //   }
  //   this.surveyFormService.getReviewFormById(surveyId).subscribe({
  //     next: (res) => {
  //       this.surveyForm = res.data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching survey form:', err);
  //     }
  //   });
  // }

  onUpdateCurrentParticipantId(id: string): void {
    this.currentPaticipantId.set(id);
    console.log('Updated Participant ID:', id);
  }

  onSubmitParticipantForm(answers: AnswerModel[]): void {
    console.log('Final Submitted Answers:', answers);
    this.participantService.addAnswers(answers).subscribe({
      next: (res) => {
        console.log('Answers submitted successfully:', res);
        this.navigateToThankYouPage();
      },
      error: (err) => {
        console.error('Error submitting answers:', err);
      }
    });
  }

  navigateToThankYouPage(): void {
    // Here you can handle the final submission logic, e.g., send data to the server
    this.router.navigate(['gold-thank-you']);
  }
}
