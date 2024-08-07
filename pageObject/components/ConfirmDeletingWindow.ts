import { Locator, Page } from "@playwright/test";
import { HelperBase } from "../pages/HelperBase";

export class ConfirmDeletingWindow extends HelperBase {

    readonly confirmDeletingBtn: Locator

    constructor(page: Page) {
        super(page);
        this.confirmDeletingBtn = page.locator('#dialBtn_YES > .btnCtn > div');
    }

    async clickConfirmDeletingBtn() {
        await this.confirmDeletingBtn.click();
    }
}

