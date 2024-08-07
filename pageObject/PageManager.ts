import { Page } from "@playwright/test"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { MailPage } from "./pages/MailPage"
import { DocumentsPage } from "./pages/DocumentsPage"
import { TrashDocumentsPage } from "./pages/TrashDocumentsPage"
import { TrashMailPage } from "./pages/TrashMailPage"

export class PageManager {
    private readonly page: Page
    private readonly homePage: HomePage
    private readonly loginPage: LoginPage
    private readonly mailPage: MailPage
    private readonly documentsPage: DocumentsPage
    private readonly trashDocumentsPage: TrashDocumentsPage
    private readonly trashMailPage: TrashMailPage

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.mailPage = new MailPage(this.page)
        this.documentsPage = new DocumentsPage(this.page)
        this.trashDocumentsPage = new TrashDocumentsPage(this.page)
        this.trashMailPage = new TrashMailPage(this.page)
    }

    onHomePage() {
        return this.homePage
    }

    onLoginPage() {
        return this.loginPage
    }

    onMailPage() {
        return this.mailPage
    }

    onDocumentsPage() {
        return this.documentsPage
    }

    onTrashDocumentPage() {
        return this.trashDocumentsPage
    }

    onTrashMailPage() {
        return this.trashMailPage
    }

    async loginAndClearData(testUser: string, testPassword: string) {
        await this.onHomePage().clickSignInBtn();
        await this.onLoginPage().fillInLogInFormAndSubmit(testUser, testPassword);
        await this.onMailPage().commandMenu.deleteAllItemsInSection();
        await this.onMailPage().clickMailTrashBtn();
        await this.onTrashMailPage().listOfItemsSection.clearTrashSection();
        await this.onMailPage().header.clickDocumentBtn();
        await this.onDocumentsPage().commandMenu.deleteAllItemsInSection();
        await this.onDocumentsPage().clickDocumentsTrashBtn();
        await this.onTrashDocumentPage().listOfItemsSection.clearTrashSection();
        await this.onTrashDocumentPage().header.logOut();
    }
}
