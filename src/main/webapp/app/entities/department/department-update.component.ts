import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
    selector: 'jhi-department-update',
    templateUrl: './department-update.component.html'
})
export class DepartmentUpdateComponent implements OnInit {
    department: IDepartment;
    isSaving: boolean;

    locations: ILocation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected departmentService: DepartmentService,
        protected locationService: LocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ department }) => {
            this.department = department;
        });
        this.locationService
            .query({ filter: 'department-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILocation[]>) => response.body)
            )
            .subscribe(
                (res: ILocation[]) => {
                    if (!this.department.location || !this.department.location.id) {
                        this.locations = res;
                    } else {
                        this.locationService
                            .find(this.department.location.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ILocation) => (this.locations = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(this.departmentService.create(this.department));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartment>>) {
        result.subscribe((res: HttpResponse<IDepartment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }
}
