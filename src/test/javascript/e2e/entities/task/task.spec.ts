/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaskComponentsPage, TaskDeleteDialog, TaskUpdatePage } from './task.page-object';

const expect = chai.expect;

describe('Task e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let taskUpdatePage: TaskUpdatePage;
    let taskComponentsPage: TaskComponentsPage;
    let taskDeleteDialog: TaskDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Tasks', async () => {
        await navBarPage.goToEntity('task');
        taskComponentsPage = new TaskComponentsPage();
        await browser.wait(ec.visibilityOf(taskComponentsPage.title), 5000);
        expect(await taskComponentsPage.getTitle()).to.eq('Tasks');
    });

    it('should load create Task page', async () => {
        await taskComponentsPage.clickOnCreateButton();
        taskUpdatePage = new TaskUpdatePage();
        expect(await taskUpdatePage.getPageTitle()).to.eq('Create or edit a Task');
        await taskUpdatePage.cancel();
    });

    it('should create and save Tasks', async () => {
        const nbButtonsBeforeCreate = await taskComponentsPage.countDeleteButtons();

        await taskComponentsPage.clickOnCreateButton();
        await promise.all([taskUpdatePage.setTitleInput('title'), taskUpdatePage.setDescriptionInput('description')]);
        expect(await taskUpdatePage.getTitleInput()).to.eq('title');
        expect(await taskUpdatePage.getDescriptionInput()).to.eq('description');
        await taskUpdatePage.save();
        expect(await taskUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Task', async () => {
        const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
        await taskComponentsPage.clickOnLastDeleteButton();

        taskDeleteDialog = new TaskDeleteDialog();
        expect(await taskDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Task?');
        await taskDeleteDialog.clickOnConfirmButton();

        expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
