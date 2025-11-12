import { Component, EventEmitter, Input, input, OnInit, Output, output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EFieldTypes, ELanguages } from '@common/global';
import { SurveyFormModel } from '@models/survey-models/survey-form.model';
import { ParticipantModel } from '@models/survey-models/participant.model';
import { ParticipantInfoModel } from '@models/survey-models/participant-info.model';
import { ParticipantService } from '@services/survey-services/participant.service';
import { ParticipantInfoComponent } from '@components/participant-info/participant-info.component';
import { ParticipantInfoConfigModel } from '@models/survey-models/participant-info-config.model';

@Component({
    selector: 'app-gold-survey-body',
    imports: [ReactiveFormsModule, ParticipantInfoComponent],
    templateUrl: './gold-survey-body.component.html',
    styles: [`
    .surveyTitle {
    font-weight: 600;
    color: #926936;
    text-align: center;
    text-transform: uppercase;
}

.surveyDescription {
    text-align: justify;
}

.form-control {
    border: 1px solid #d8a04d;
    background: #F9F7F1;
}

textarea {
    border: 1px solid #d8a04d;
    border-radius: .25rem;
    background: #F9F7F1;
}

.btnSubmit {
    background-color: #F9F7F1;
    color: #d8a04d;
    font-weight: 700;
    text-decoration: none;
    transition: 300ms all;
    border: 1px solid #d8a04d;
    left: -4px;
    font-size: 16px;
    white-space: nowrap;
    text-align: center;

}
.btnSubmit:hover {
    background-color: #d8a04d;
    color: #fff;
}
  `]
})
export class GoldSurveyBodyComponent {
    @ViewChild('participantInfoComponent') participantInfoComponent!: ParticipantInfoComponent;
    eLanguages = ELanguages;
    @Input() selectedLanguage: string = ELanguages.Vietnamese;
    @Input() surveyForm!: SurveyFormModel;
    @Input() isReviewMode: boolean = false;
    @Output() onUpdateCurrentParticipantId = new EventEmitter<string>();

    participantInfos: ParticipantInfoModel[] = [];

    constructor(private participantService: ParticipantService) { }

    trigger(): void {
        this.participantInfoComponent.onSubmit();
    }

    initParticipantInfo(participantInfos: ParticipantInfoModel[]): void {
        this.participantInfos = participantInfos;
        // this.submitParticipant();
        console.log(this.participantInfos);
    }

    submitParticipant(): void {
        const data: ParticipantModel = {
            surveyFormId: this.surveyForm.id || 0,
            participantInfos: this.participantInfos,
            isReviewMode: this.isReviewMode
        }
        this.participantService.initParticipant(data).subscribe({
            next: (res) => {
                const participant = res.data;
                this.onUpdateCurrentParticipantId.emit(participant.id || '');
            },
            error: (err) => {
                console.error('Error initializing participant:', err);
            }
        });
    }

}
