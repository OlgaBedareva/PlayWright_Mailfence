import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";
import { ListOfItemsSection } from "../components/ListOfItemsSection";
import { Header } from "../components/Header";

export class TrashDocumentsPage extends HelperBase {

    readonly listOfItemsSection: ListOfItemsSection
    readonly header: Header

    constructor(page: Page) {
        super(page)
        this.listOfItemsSection = new ListOfItemsSection(this.page)
        this.header = new Header(this.page)
    }

    async deletedDocumentShouldBeVisible(filename: string) {
        await expect(this.page.locator(`.GCSDBRWBGT .GCSDBRWBPJB[title='${filename}']`)).toBeVisible()
    }
}



