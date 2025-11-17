import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageInformation, Pagination } from '@models/pagination.model';
import { cilPlus, cilTrash, cilPen, cilSave, cilSearch, cilX, cilExitToApp } from '@coreui/icons';
import { RouterLink } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, TemplateIdDirective } from '@coreui/angular';
import { DataTableComponent } from '@components/generals/data-table/data-table.component';
import { IconDirective } from '@coreui/icons-angular';
import { QuestionGroupLibraryService } from '@services/survey-services/question-group-library.service';
import { QuestionLibraryService } from '@services/survey-services/question-library.service';
import { QuestionTypeService } from '@services/survey-services/question-type.service';
import { OptionModel } from '@models/option.model';
import { SelectSearchComponent } from "@components/selects/select-search/select-search.component";
import { QuestionLibraryModel } from '@models/survey-models/question-library.model';
import { CommonModule } from '@angular/common';
import { BookIconComponent } from "@components/icons/book-icon.component";
import { ToastService } from '@services/helper-services/toast.service';
import { EColors } from '@common/global';

@Component({
  selector: 'app-index',
  imports: [ReactiveFormsModule, DataTableComponent, RouterLink, CommonModule, AccordionButtonDirective, AccordionComponent, AccordionItemComponent, TemplateIdDirective,
    IconDirective, SelectSearchComponent, BookIconComponent, ModalComponent, ModalBodyComponent, ButtonDirective, ModalFooterComponent, ModalHeaderComponent ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  //#region Variables
  data: Pagination<QuestionLibraryModel> = new Pagination<QuestionLibraryModel>();
  questionGroupLibraries: OptionModel[] = [];
  questionTypes: OptionModel[] = [];
  pageInformation: PageInformation = new PageInformation();
  icons: any = { cilPlus, cilTrash, cilPen, cilSave, cilSearch, cilX, cilExitToApp };
  showChildrenByParentId = signal<number | null>(null);

  trashPageInformation: PageInformation = new PageInformation();
  visibleDelete: boolean = false;
  visibleTrashModal: boolean = false;
  deleteById: number = 0;
  trashData: Pagination<QuestionLibraryModel> = new Pagination<QuestionLibraryModel>();

  filterForm: FormGroup = new FormGroup({
    questionGroupId: new FormControl(-1),
    questionTypeId: new FormControl(-1),
    searchText: new FormControl('')
  });
  //#endregion
  //#region Constructor and hooks
  constructor(private questionLibraryService: QuestionLibraryService,
    private questionGroupLibraryService: QuestionGroupLibraryService,
    private toastService: ToastService,
    private questionTypeService: QuestionTypeService) { }
  ngOnInit() {
    this.questionGroupLibraryService.getOptionList().subscribe((res) => {
      this.questionGroupLibraries = res.data;
    });
    this.questionTypeService.getOptionList().subscribe((res) => {
      this.questionTypes = res.data;
    });
    this.getData();
  }
  getData() {
    this.questionLibraryService.getAll(this.pageInformation.pageIndex, this.pageInformation.pageSize).subscribe((res) => {
      this.data = res.data;
      console.log(this.data);
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

  onChangeQuestionGroup(event: any) {
    this.filterForm.patchValue({
      questionGroupId: event.target.value
    });
    this.getData();
  }
  filter() {
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
  //table tree
  toggleNode(node: QuestionLibraryModel): void {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.showChildrenByParentId.set(node.id);
    } else {
      this.showChildrenByParentId.set(null);
    }
  }
  //#endregion
    //#region Trash
    getTrashData() {
      this.questionLibraryService.getAllDeleted(this.trashPageInformation.pageIndex, this.trashPageInformation.pageSize).subscribe((res) => {
        this.trashData = res.data;
        this.trashPageInformation.currentPage = this.trashData.currentPage;
        this.trashPageInformation.totalItems = this.trashData.totalItems;
        this.trashPageInformation.totalPages = this.trashData.totalPages;
      });
    }
    onTrashPageIndexChange(index: any) {
      this.trashPageInformation.pageIndex = index;
      this.getTrashData();
    }
    onTrashPageSizeChange(size: any) {
      this.trashPageInformation.pageSize = size;
      this.trashPageInformation.pageIndex = 1;
      this.getTrashData();
    }
    toggleLiveTrashModal() {
      this.getTrashData();
      this.visibleTrashModal = !this.visibleTrashModal;
    }
    handleLiveTrashModalChange(event: any) {
      this.visibleTrashModal = event;
    }
    restoreData(id: number) {
      this.questionLibraryService.restore(id).subscribe((res) => {
        this.getTrashData();
        this.getData();
        this.toastService.showToast(EColors.success, res.message);
      });
    }
    deleteDataTrash(id: number) {
      this.questionLibraryService.delete(id).subscribe((res) => {
        this.getTrashData();
        this.toastService.showToast(EColors.success, res.message);
      });
    }
    //#endregion
   //#region Delete
  softDeleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  onConfirmDelete() {
    this.questionLibraryService.softDelete(this.deleteById).subscribe((res) => {
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
