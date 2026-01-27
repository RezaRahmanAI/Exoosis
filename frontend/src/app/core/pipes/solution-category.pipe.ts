import { Pipe, PipeTransform } from '@angular/core';
import { SolutionCategory } from '../models/entities';

@Pipe({
  name: 'solutionCategory',
  standalone: true,
})
export class SolutionCategoryPipe implements PipeTransform {
  transform(value: SolutionCategory): string {
    return SolutionCategory[value] || '';
  }
}
