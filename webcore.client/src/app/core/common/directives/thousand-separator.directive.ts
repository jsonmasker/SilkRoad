import { Directive, ElementRef, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[appThousandSeparator]',
  standalone: true
})
export class ThousandSeparatorDirective {
  separator = input<string>(',');
  allowDecimal = input<boolean>(true);
  maxDecimals = input<number>(2);
  numericValueChange = output<number | null>();

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const cursorPosition = input.selectionStart;
    let value = input.value;

    // Remove all non-numeric characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    
    // Handle decimal places
    let formattedValue: string;
    if (this.allowDecimal() && cleanValue.includes('.')) {
      const parts = cleanValue.split('.');
      // Only keep the first decimal point
      if (parts.length > 2) {
        parts.splice(2);
      }
      // Limit decimal places
      if (parts[1] && parts[1].length > this.maxDecimals()) {
        parts[1] = parts[1].substring(0, this.maxDecimals());
      }
      parts[0] = this.addThousandSeparator(parts[0]);
      formattedValue = parts.join('.');
    } else {
      formattedValue = this.addThousandSeparator(cleanValue.replace('.', ''));
    }

    // Update input value
    input.value = formattedValue;

    // Emit the raw numeric value
    this.emitNumericValue(cleanValue);

    // Restore cursor position accounting for added separators
    const newCursorPosition = this.calculateCursorPosition(value, formattedValue, cursorPosition);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End',
      'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'
    ];

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
      return;
    }

    // Allow number keys
    if ((event.key >= '0' && event.key <= '9') || allowedKeys.includes(event.key)) {
      return;
    }

    // Allow decimal point if enabled
    if (this.allowDecimal() && event.key === '.' && !(event.target as HTMLInputElement).value.includes('.')) {
      return;
    }

    // Prevent all other keys
    event.preventDefault();
  }

  private addThousandSeparator(value: string): string {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator());
  }

  private calculateCursorPosition(oldValue: string, newValue: string, oldPosition: number): number {
    // Count separators before cursor in old value
    const separatorsBefore = (oldValue.substring(0, oldPosition).match(new RegExp(`\\${this.separator()}`, 'g')) || []).length;
    
    // Find position in clean value (without separators)
    const cleanOldValue = oldValue.replace(new RegExp(`\\${this.separator()}`, 'g'), '');
    const cleanPosition = oldPosition - separatorsBefore;
    
    // Count separators before the same position in new value
    const cleanNewValue = newValue.replace(new RegExp(`\\${this.separator()}`, 'g'), '');
    let newPosition = cleanPosition;
    
    // Add separators count in new value up to clean position
    const newValueUpToPosition = cleanNewValue.substring(0, cleanPosition);
    const formattedUpToPosition = this.addThousandSeparator(newValueUpToPosition);
    newPosition = formattedUpToPosition.length;
    
    // If there's a decimal part, add it
    if (newValue.includes('.') && cleanPosition >= cleanNewValue.indexOf('.')) {
      const decimalIndex = newValue.indexOf('.');
      if (cleanPosition > cleanNewValue.indexOf('.')) {
        newPosition = decimalIndex + (cleanPosition - cleanNewValue.indexOf('.'));
      } else {
        newPosition = decimalIndex;
      }
    }

    return Math.min(newPosition, newValue.length);
  }

  private emitNumericValue(cleanValue: string): void {
    if (cleanValue === '' || cleanValue === '.') {
      this.numericValueChange.emit(null);
      return;
    }
    
    const numericValue = parseFloat(cleanValue);
    if (isNaN(numericValue)) {
      this.numericValueChange.emit(null);
    } else {
      this.numericValueChange.emit(numericValue);
    }
  }
}
