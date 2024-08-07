import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class LoginPage extends HelperBase {

    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        super(page)
        this.loginInput = page.locator('#UserID');
        this.passwordInput = page.locator('#Password');
        this.submitBtn = page.locator('input[type="submit"]');
    }

    async fillInLogInFormAndSubmit(login: string, password: string) {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
        const response = await this.interceptAndWait('/gwt', 'POST', 'getMeetingsRequestsToAnswer');
        expect(response.ok()).toBeTruthy();
    }
}


