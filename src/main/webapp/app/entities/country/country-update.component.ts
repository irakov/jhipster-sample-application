import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from 'app/entities/region';

@Component({
    selector: 'jhi-country-update',
    templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent implements OnInit {
    country: ICountry;
    isSaving: boolean;

    regions: IRegion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected countryService: CountryService,
        protected regionService: RegionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ country }) => {
            this.country = country;
        });
        this.regionService
            .query({ filter: 'country-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IRegion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRegion[]>) => response.body)
            )
            .subscribe(
                (res: IRegion[]) => {
                    if (!this.country.region || !this.country.region.id) {
                        this.regions = res;
                    } else {
                        this.regionService
                            .find(this.country.region.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IRegion>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IRegion>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IRegion) => (this.regions = [subRes].concat(res)),
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
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(this.countryService.create(this.country));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>) {
        result.subscribe((res: HttpResponse<ICountry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRegionById(index: number, item: IRegion) {
        return item.id;
    }
}
