import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class HomePage extends HelperBase {

    readonly signInBtn: Locator;

    constructor(page: Page) {
        super(page)
        this.signInBtn = page.locator("#signin");
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
    }
}