import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorIntlService extends MatPaginatorIntl {
  translate: TranslateService;

  override getRangeLabel = function (page, pageSize, length) {
    const of = this.translate ? this.translate.instant('paginatore.di') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    super.itemsPerPageLabel = this.translate.instant('paginatore.elementi_per_pagina');
    super.nextPageLabel = this.translate.instant('paginatore.pagina_successiva');
    super.previousPageLabel = this.translate.instant('paginatore.pagina_precedente');
    this.changes.next();
  }
}
