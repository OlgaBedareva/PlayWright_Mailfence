import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "../pages/HelperBase";

export class Header extends HelperBase{

    readonly documentsIcon: Locator;
    readonly mailsIcon: Locator;
    readonly userDropDwn: Locator;
    readonly userMenuItem: Locator;

    constructor(page: Page) {
        super(page)
        this.documentsIcon = page.locator('.icon24-Documents');
        this.mailsIcon = page.locator('.icon24-Message');
        this.userDropDwn = page.locator('.GCSDBRWBAE.icon-Arrow-down');
        this.userMenuItem = page.locator('.GCSDBRWBGR');
    }

    async clickDocumentBtn() {
        await this.documentsIcon.click();
        const response = await this.interceptAndWait('/gwt', 'POST', 'getDocuments');
        expect(response.ok()).toBeTruthy();

    }

    async clickMailsBtn() {
        this.mailsIcon.click();
    }

    async logOut() {
        await this.clickUserDropDwn()
        await this.userMenuItem.getByText('Выйти').click()
    }

    async clickUserDropDwn() {
        await this.userDropDwn.click()
    }
}

