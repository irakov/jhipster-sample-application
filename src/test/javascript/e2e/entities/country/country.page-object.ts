import { element, by, ElementFinder } from 'protractor';

export class CountryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-country div table .btn-danger'));
    title = element.all(by.css('jhi-country div h2#page-heading span')).first();

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

export class CountryUpdatePage {
    pageTitle = element(by.id('jhi-country-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    countryNameInput = element(by.id('field_countryName'));
    regionSelect = element(by.id('field_region'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCountryNameInput(countryName) {
        await this.countryNameInput.sendKeys(countryName);
    }

    async getCountryNameInput() {
        return this.countryNameInput.getAttribute('value');
    }

    async regionSelectLastOption() {
        await this.regionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async regionSelectOption(option) {
        await this.regionSelect.sendKeys(option);
    }

    getRegionSelect(): ElementFinder {
        return this.regionSelect;
    }

    async getRegionSelectedOption() {
        return this.regionSelect.element(by.css('option:checked')).getText();
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

export class CountryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-country-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-country'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
