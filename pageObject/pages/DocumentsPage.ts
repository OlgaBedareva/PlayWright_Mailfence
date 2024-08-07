import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./HelperBase";
import { Header } from "../components/Header";
import { CommandMenu } from "../components/CommandMenu";

export class DocumentsPage extends HelperBase {

    readonly ctreateDocumentBtn: Locator;
    readonly contextMenuItem: Locator;
    readonly trashSection: Locator;
    readonly header: Header;
    readonly commandMenu: CommandMenu;

    constructor(page: Page) {
        super(page)
        this.header = new Header(this.page);
        this.commandMenu = new CommandMenu(this.page);
        this.ctreateDocumentBtn = page.locator('#new_doc > input');
        this.contextMenuItem = page.locator('.GCSDBRWBPQ');
        this.trashSection = page.locator('#doc_tree_trash');
    }

    async clickSendBtn() {
        await this.contextMenuItem.getByText('Отправить').click();
    }
    async uploadDocument(filePath: string) {
        await this.page.setInputFiles('#new_doc > input', filePath);
    }

    async rightclickOfCreatedDocument(fileName: string) {
        await this.page.locator(`.GCSDBRWBPJB[title="${fileName}"]`).click({ button: 'right' })
    }

    async sendEmailWithAttachedFile(fileName: string) {
        await this.rightclickOfCreatedDocument(fileName);
        await this.clickSendBtn();
    }

    async clickDocumentsTrashBtn() {
        await this.trashSection.click();
        const response = await this.interceptAndWait('/gwt', 'POST', 'getDocuments');
        expect(response.ok()).toBeTruthy();
    }

    getDocumentByName(fileName: string): Locator {
        return this.page.locator(`.GCSDBRWBPJB[title="${fileName}"]`);
    }
}



