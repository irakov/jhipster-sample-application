import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'region',
                loadChildren: './region/region.module#JhipsterIgorApplicationRegionModule'
            },
            {
                path: 'country',
                loadChildren: './country/country.module#JhipsterIgorApplicationCountryModule'
            },
            {
                path: 'location',
                loadChildren: './location/location.module#JhipsterIgorApplicationLocationModule'
            },
            {
                path: 'department',
                loadChildren: './department/department.module#JhipsterIgorApplicationDepartmentModule'
            },
            {
                path: 'task',
                loadChildren: './task/task.module#JhipsterIgorApplicationTaskModule'
            },
            {
                path: 'employee',
                loadChildren: './employee/employee.module#JhipsterIgorApplicationEmployeeModule'
            },
            {
                path: 'job',
                loadChildren: './job/job.module#JhipsterIgorApplicationJobModule'
            },
            {
                path: 'job-history',
                loadChildren: './job-history/job-history.module#JhipsterIgorApplicationJobHistoryModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterIgorApplicationEntityModule {}
