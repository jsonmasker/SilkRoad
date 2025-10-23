import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EColors } from '@common/global';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { cilCloudUpload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { SettingModel } from '@models/system-management-models/setting.model';
import { ToastService } from '@services/helper-services/toast.service';
import { SettingService } from '@services/system-services/setting.service';
import { cilPen, cilSave, cilX, cilExitToApp } from '@coreui/icons';

@Component({
  selector: 'app-settings',
  imports: [TableDirective, CardComponent, ModalBodyComponent, FormControlDirective, FormLabelDirective,
    ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent,
    CardBodyComponent, CardHeaderComponent, SlicePipe, IconDirective],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  deleteById: number = 0;
  settingList: SettingModel[] = [];
  reviewCreateUploadImage: string = '';
  reviewUpdateUploadImage: string = '';
  icons: any = { cilPen, cilSave, cilX, cilExitToApp };

  updateForm: FormGroup = new FormGroup({
    key: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  constructor(private settingService: SettingService, private toastService: ToastService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.settingService.getAllSettings().subscribe((res) => {
      this.settingList = res.data;
    });
  }

//#region  Update Form
updateData(key: string) {
  this.settingService.getSettingByKey(key).subscribe((res) => {
    this.updateForm.patchValue(res.data);
    this.toggleLiveUpdateModel();
  });
}
onSubmitUpdateForm() {
  if (this.updateForm.valid) {
    this.settingService.updateSetting(this.updateForm.value).subscribe((res) => {
      if (res.success) {
        this.toggleLiveUpdateModel();
        this.toastService.showToast(EColors.success, res.message);
        this.getData();
      } else {
        this.toastService.showToast(EColors.danger, res.message);
      }
    });
  }
}

toggleLiveUpdateModel() {
  this.visibleUpdateModal = !this.visibleUpdateModal;
}

handleLiveUpdateModelChange(event: any) {
  this.visibleUpdateModal = event;
}

get valueUpdateForm() { return this.updateForm.get('value'); }
//#endregion



}
