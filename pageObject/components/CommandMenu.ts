import { Locator, Page } from "@playwright/test";
import { HelperBase } from "../pages/HelperBase";
export class CommandMenu extends HelperBase {

    readonly deleteBtn: Locator;
    readonly chooseAllBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.deleteBtn = page.locator('.icon16-Trash');
        this.chooseAllBtn = page.locator('.icon-checkb');
    }

    async clickChooseAllBtn() {
        await this.chooseAllBtn.click();
    }

    async clickDeleteBtn() {
        await this.deleteBtn.click();
    }

    async deleteAllItemsInSection() {
        await this.clickChooseAllBtn();
        await this.clickDeleteBtn();
    }
}



