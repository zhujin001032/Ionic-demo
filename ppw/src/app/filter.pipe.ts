import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(city: any, term?: any): any {
    if (term === undefined) {
      return city;
    }

    return city.filter(function (cityItem) {
      return cityItem.name.includes(term) || cityItem.py.includes(term.toLowerCase()) || cityItem.pinyin.includes(term.toLowerCase());
    });
  }

}
