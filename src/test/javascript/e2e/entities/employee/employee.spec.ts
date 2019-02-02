/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeeComponentsPage, EmployeeDeleteDialog, EmployeeUpdatePage } from './employee.page-object';

const expect = chai.expect;

describe('Employee e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeeUpdatePage: EmployeeUpdatePage;
    let employeeComponentsPage: EmployeeComponentsPage;
    let employeeDeleteDialog: EmployeeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Employees', async () => {
        await navBarPage.goToEntity('employee');
        employeeComponentsPage = new EmployeeComponentsPage();
        await browser.wait(ec.visibilityOf(employeeComponentsPage.title), 5000);
        expect(await employeeComponentsPage.getTitle()).to.eq('Employees');
    });

    it('should load create Employee page', async () => {
        await employeeComponentsPage.clickOnCreateButton();
        employeeUpdatePage = new EmployeeUpdatePage();
        expect(await employeeUpdatePage.getPageTitle()).to.eq('Create or edit a Employee');
        await employeeUpdatePage.cancel();
    });

    it('should create and save Employees', async () => {
        const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();

        await employeeComponentsPage.clickOnCreateButton();
        await promise.all([
            employeeUpdatePage.setFirstNameInput('firstName'),
            employeeUpdatePage.setLastNameInput('lastName'),
            employeeUpdatePage.setEmailInput('email'),
            employeeUpdatePage.setPhoneNumberInput('phoneNumber'),
            employeeUpdatePage.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            employeeUpdatePage.setSalaryInput('5'),
            employeeUpdatePage.setCommissionPctInput('5'),
            employeeUpdatePage.departmentSelectLastOption(),
            employeeUpdatePage.managerSelectLastOption()
        ]);
        expect(await employeeUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await employeeUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await employeeUpdatePage.getEmailInput()).to.eq('email');
        expect(await employeeUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber');
        expect(await employeeUpdatePage.getHireDateInput()).to.contain('2001-01-01T02:30');
        expect(await employeeUpdatePage.getSalaryInput()).to.eq('5');
        expect(await employeeUpdatePage.getCommissionPctInput()).to.eq('5');
        await employeeUpdatePage.save();
        expect(await employeeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Employee', async () => {
        const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
        await employeeComponentsPage.clickOnLastDeleteButton();

        employeeDeleteDialog = new EmployeeDeleteDialog();
        expect(await employeeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Employee?');
        await employeeDeleteDialog.clickOnConfirmButton();

        expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
