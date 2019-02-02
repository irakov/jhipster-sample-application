import { element, by, ElementFinder } from 'protractor';

export class RegionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-region div table .btn-danger'));
    title = element.all(by.css('jhi-region div h2#page-heading span')).first();

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

export class RegionUpdatePage {
    pageTitle = element(by.id('jhi-region-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    regionNameInput = element(by.id('field_regionName'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setRegionNameInput(regionName) {
        await this.regionNameInput.sendKeys(regionName);
    }

    async getRegionNameInput() {
        return this.regionNameInput.getAttribute('value');
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

export class RegionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-region-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-region'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
