import { Component, ViewEncapsulation, signal, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptionModel } from '@models/option.model';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'app-tree-select-v1',
  imports: [FormsModule, NzTreeSelectModule],
  templateUrl: './tree-select-v1.component.html',
  styleUrl: './tree-select-v1.component.scss'
})
export class TreeSelectV1Component{
 placeholder = input<string>('Please select');
  expandKeys = input<any[]>([]);
  options = input<OptionModel[]>([]);
  selectedValue = input<any>(null);
  isDisabled = input<boolean>(false);
  onChangeValue = output<any[]>();
  nodes: NzTreeNodeOptions[] = [];

  onChangeInput(event: any) {
      if (typeof event === 'string' ) {
        const myArray = event.split("_");
        this.onChangeValue.emit(myArray);
      }else{
        const myArray = [event];
        this.onChangeValue.emit(myArray);
      }
  }

  ngOnChanges(): void {
   this.nodes = this.handleData(this.options());
  }

  handleData(options: OptionModel[]): NzTreeNodeOptions[] {
    return options.map(option => ({
      title: option.name,
      key: option.parentId ? option.parentId + '_' + option.id : option.id,
      isLeaf: !option.children?.length,
      children: option.children ? this.handleData(option.children) : [],
      // selectable: !option.children?.length
    }));
  }
}
