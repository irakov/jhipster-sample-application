import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterIgorApplicationSharedModule } from 'app/shared';
import {
    JobComponent,
    JobDetailComponent,
    JobUpdateComponent,
    JobDeletePopupComponent,
    JobDeleteDialogComponent,
    jobRoute,
    jobPopupRoute
} from './';

const ENTITY_STATES = [...jobRoute, ...jobPopupRoute];

@NgModule({
    imports: [JhipsterIgorApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [JobComponent, JobDetailComponent, JobUpdateComponent, JobDeleteDialogComponent, JobDeletePopupComponent],
    entryComponents: [JobComponent, JobUpdateComponent, JobDeleteDialogComponent, JobDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterIgorApplicationJobModule {}
