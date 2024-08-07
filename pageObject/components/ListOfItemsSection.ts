import { Locator, Page } from "@playwright/test";
import { CommandMenu } from "../components/CommandMenu";
import { ConfirmDeletingWindow } from "../components/ConfirmDeletingWindow";
import { HelperBase } from "../pages/HelperBase";

export class ListOfItemsSection extends HelperBase {

    readonly deletedItemsList: Locator;
    readonly commandMenu: CommandMenu;
    readonly confirmDeletingWindow: ConfirmDeletingWindow;

    constructor(page: Page) {
        super(page)
        this.deletedItemsList = page.locator('.GCSDBRWBLT.GCSDBRWBDU');
        this.commandMenu = new CommandMenu(this.page);
        this.confirmDeletingWindow = new ConfirmDeletingWindow(this.page);
    }

    async clearTrashSection() {
        const intValue = await this.deletedItemsList.count()
        if (intValue > 0) {
            await this.commandMenu.deleteAllItemsInSection();
            await this.confirmDeletingWindow.clickConfirmDeletingBtn();
        }
    }
}




