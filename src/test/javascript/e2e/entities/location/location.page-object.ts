import { element, by, ElementFinder } from 'protractor';

export class LocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-location div table .btn-danger'));
    title = element.all(by.css('jhi-location div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class LocationUpdatePage {
    pageTitle = element(by.id('jhi-location-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    streetAddressInput = element(by.id('field_streetAddress'));
    postalCodeInput = element(by.id('field_postalCode'));
    cityInput = element(by.id('field_city'));
    stateProvinceInput = element(by.id('field_stateProvince'));
    countrySelect = element(by.id('field_country'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStreetAddressInput(streetAddress) {
        await this.streetAddressInput.sendKeys(streetAddress);
    }

    async getStreetAddressInput() {
        return this.streetAddressInput.getAttribute('value');
    }

    async setPostalCodeInput(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode);
    }

    async getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateProvinceInput(stateProvince) {
        await this.stateProvinceInput.sendKeys(stateProvince);
    }

    async getStateProvinceInput() {
        return this.stateProvinceInput.getAttribute('value');
    }

    async countrySelectLastOption() {
        await this.countrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async countrySelectOption(option) {
        await this.countrySelect.sendKeys(option);
    }

    getCountrySelect(): ElementFinder {
        return this.countrySelect;
    }

    async getCountrySelectedOption() {
        return this.countrySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class LocationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-location-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-location'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
