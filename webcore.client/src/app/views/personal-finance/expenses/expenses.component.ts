
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TemplateIdDirective } from '@coreui/angular';
import { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PageInformation, Pagination } from '@models/pagination.model';
import { ToastService } from '@services/helper-services/toast.service';
import { baseUrl, EColors } from '@common/global';
import { DataTableComponent } from "@components/generals/data-table/data-table.component";
import { RangeDatetimePickerComponent } from "@components/generals/range-datetime-picker/range-datetime-picker.component";
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { ExpenseService } from '@services/personal-finance-services/expense.service';
import { ExpenseModel } from '@models/personal-finance-models';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [ModalBodyComponent, FormControlDirective, FormLabelDirective, IconDirective, AccordionButtonDirective, AccordionComponent,
    AccordionItemComponent, ModalComponent, ButtonDirective, FormDirective, ReactiveFormsModule, ModalFooterComponent,
    ModalHeaderComponent, DataTableComponent, TemplateIdDirective, RangeDatetimePickerComponent, SelectSearchComponent]
})
export class ExpensesComponent implements OnInit {
  //#region Properties
  pageInformation: PageInformation = new PageInformation();
  baseUrl: string = baseUrl;
  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  data: Pagination<ExpenseModel> = new Pagination<ExpenseModel>();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilExitToApp, cilLoopCircular, cilCloudUpload, cilCloudDownload, cilX, cilSearch };
  createForm: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500))
  });
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    userId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    note: new FormControl('', Validators.maxLength(500)),
    createdAt: new FormControl(''),
    updatedAt: new FormControl('')
  });

    filterForm: FormGroup = new FormGroup({
    pageIndex: new FormControl(-1),
    pageSize: new FormControl(-1),
    userId: new FormControl(-1),
    fromDate: new FormControl(null),
    toDate: new FormControl(null),
    categoryId: new FormControl(-1),
    searchText: new FormControl(null)
  });
  //#endregion

  constructor(private expenseService: ExpenseService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.getData();
  }
  filter() {
    this.filterForm.patchValue({ pageIndex: this.pageInformation.pageIndex, pageSize: this.pageInformation.pageSize });
    this.getData();
  }
  //#region Main Table
  getData() {
    this.expenseService.getByFilter(this.filterForm.value).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.currentPage = this.data.currentPage;
      this.pageInformation.totalItems = this.data.totalItems;
      this.pageInformation.totalPages = this.data.totalPages;
    });
  }

  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.getData();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
  //#endregion


  //#region Create Form
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      this.expenseService.create(this.createForm.value).subscribe({
        next: (res) => {
          this.toggleLiveCreateModel();
          this.getData();
          this.toastService.showToast(EColors.success, res.message);
          this.createForm.reset();
          this.createForm.patchValue({ isActive: true, priority: 1 });
        },
        error: (failure) => {
          this.toastService.showToast(EColors.danger, failure.error.message);
        }
      });
    }
  }

  toggleLiveCreateModel() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  handleLiveCreateModelChange(event: any) {
    this.visibleCreateModal = event;
  }

  get categoryIdCreateForm() { return this.createForm.get('categoryId'); }
  get subCategoryIdCreateForm() { return this.createForm.get('subCategoryId'); }
  get amountCreateForm() { return this.createForm.get('amount'); }
  get dateCreateForm() { return this.createForm.get('date'); }
  get noteCreateForm() { return this.createForm.get('note'); }

  //#endregion

  //#region Update Form
  updateData(id: number) {
    this.expenseService.getById(id).subscribe((res) => {
      this.updateForm.patchValue(res.data);
      this.toggleLiveUpdateModel();
    });
  }
  onSubmitUpdateForm() {
    if (this.updateForm.valid) {
      this.expenseService.update(this.updateForm.value).subscribe((res) => {
        this.toggleLiveUpdateModel();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  toggleLiveUpdateModel() {
    this.visibleUpdateModal = !this.visibleUpdateModal;
  }

  handleLiveUpdateModelChange(event: any) {
    this.visibleUpdateModal = event;
  }

  get categoryIdUpdateForm() { return this.updateForm.get('categoryId'); }
  get subCategoryIdUpdateForm() { return this.updateForm.get('subCategoryId'); }
  get amountUpdateForm() { return this.updateForm.get('amount'); }
  get dateUpdateForm() { return this.updateForm.get('date'); }
  get noteUpdateForm() { return this.updateForm.get('note'); }
  //#endregion

  //#region Delete
  deleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.expenseService.delete(this.deleteById).subscribe((res) => {
      this.toggleLiveDelete();
      this.getData();
      this.toastService.showToast(EColors.success, res.message);
    }, (failure) => {
      this.toastService.showToast(EColors.danger, failure.error.message);
    });
  }
  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }

  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
  //#endregion
}
