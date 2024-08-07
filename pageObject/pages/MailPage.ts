import { Locator, Page, expect, Response, request } from "@playwright/test";
import { HelperBase } from "./HelperBase";
import { Header } from "../components/Header";
import { CommandMenu } from "../components/CommandMenu";

export class MailPage extends HelperBase {

    readonly mailToInput: Locator;
    readonly passwordInput: Locator;
    readonly subjectInput: Locator;
    readonly subjectsList: Locator;
    readonly sendBtn: Locator;
    readonly attachedFile: Locator;
    readonly contextMenuItemsOfAttachedFile: Locator;
    readonly saveDocumentBtn: Locator;
    readonly treeItemLabel: Locator;
    readonly trashSection: Locator;
    readonly createMailBtn: Locator;
    readonly header: Header;
    readonly commandMenu: CommandMenu;

    constructor(page: Page) {
        super(page)
        this.header = new Header(this.page);
        this.commandMenu = new CommandMenu(this.page);
        this.mailToInput = page.locator('#mailTo > .GCSDBRWBPL');
        this.passwordInput = page.locator('#Password');
        this.subjectInput = page.locator('#mailSubject');
        this.subjectsList = page.locator('.listSubject');
        this.sendBtn = page.locator('#mailSend');
        this.attachedFile = page.locator('.GCSDBRWBKRB');
        this.contextMenuItemsOfAttachedFile = page.locator('.GCSDBRWBGR');
        this.saveDocumentBtn = page.locator('#dialBtn_OK');
        this.treeItemLabel = page.locator('.treeItemLabel');
        this.trashSection = page.locator('.GCSDBRWBDX > .treeItemLabel').getByText('Trash');
        this.createMailBtn = page.getByText('Создать')
    }

    async typeRecipientsMail(recipientsMail: string) {
        await this.mailToInput.fill(recipientsMail);
    }
    async typeMailsSubject(subjectText: string) {
        await this.subjectInput.fill(subjectText);
    }
    async clickSendBtn() {
        await this.sendBtn.click()
        const response = await this.interceptAndWait('/gwt', 'POST', 'putMessage');
        expect(response.ok()).toBeTruthy();
        await this.createMailBtn.waitFor({ state: 'visible' });
    }

    async sendEmail(recipientsMail: string, subjectText: string) {
        await this.typeRecipientsMail(recipientsMail);
        await this.typeMailsSubject(subjectText);
        await this.clickSendBtn();
    }

    async waitUntilEmailReceived(subject: string) {

        let isVisible = await this.page.locator(`.listSubject[title="${subject}"]`).isVisible();
        if (isVisible) {
            return true;
        }

        await this.page.waitForTimeout(3000);
        await this.reloadPage()
        isVisible = await this.page.locator(`.listSubject[title="${subject}"]`).isVisible();
        return isVisible;
    }

    async openEmailItem(subject: string) {
        await this.subjectsList.getByText(subject).click()
    }

    async saveAttachedFileToDocuments() {
        await this.attachedFile.click({ button: 'right' });
        await this.contextMenuItemsOfAttachedFile.getByText('Сохранить в документах').click()
        const response = await this.interceptAndWait('/gwt', 'POST', 'getDirectoriesTree');
        expect(response.ok()).toBeTruthy();

        await this.treeItemLabel.getByText("Мои документы").click()
        await expect(this.saveDocumentBtn).toBeVisible();
        await expect(this.saveDocumentBtn).not.toHaveAttribute('disabled');

        await this.page.waitForFunction((selector) => {
            const element = document.querySelector(selector);
            return element && !element.classList.contains('GCSDBRWBMB');
        }, '#dialBtn_OK');

        this.saveDocumentBtn.click()
        await expect(this.saveDocumentBtn).not.toBeVisible();
    }

    async clickMailTrashBtn() {
        await this.trashSection.click();
        const response = await this.interceptAndWait('/gwt', 'POST', 'getFolderMessages');
        expect(response.ok()).toBeTruthy();
    }
}
