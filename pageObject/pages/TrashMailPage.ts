import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";
import { Header } from "../components/Header";
import { ListOfItemsSection } from "../components/ListOfItemsSection";

export class TrashMailPage extends HelperBase {

    readonly header: Header;
    readonly listOfItemsSection: ListOfItemsSection;

    constructor(page: Page) {
        super(page)
        this.header = new Header(this.page);
        this.listOfItemsSection = new ListOfItemsSection(this.page);
    }
}


