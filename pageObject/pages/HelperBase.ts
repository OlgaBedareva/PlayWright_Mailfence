import { Locator, Page, Response, expect } from "@playwright/test";
import * as path from 'path';
import { promises as fs } from 'fs';

export class HelperBase {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async reloadPage() {
        await this.page.reload({ waitUntil: 'load' })
        const response = await this.interceptAndWait('/gwt', 'POST', 'getMeetingsRequestsToAnswer');
        expect(response.ok()).toBeTruthy();
    }

    static async createTextDocument(filePath: string, fileName: string, fileContent: string) {
        const filePathForDocument = path.join(filePath, fileName);
        await fs.mkdir(filePath, { recursive: true });
        await fs.writeFile(filePathForDocument, fileContent, 'utf-8');
    }

    async interceptAndWait(urlSubstring: string, method: string, payloadString: string): Promise<Response> {
        const response = await this.page.waitForResponse((response: Response) => {
            if (response.url().includes(urlSubstring) && response.status() === 200 && response.request().method() === method) {
                const request = response.request();
                const postData = request.postData();
                return postData ? postData.includes(payloadString) : false;
            }
            return false;
        });
        return response;
    }

    static async deleteFolder(folderPath: string): Promise<void> {
        try {
            await fs.rm(folderPath, { recursive: true, force: true });
        } catch (err) {
            throw err;
        }
    }

    async gragAndDrop(drag: Locator, drop: Locator) {

        await drag.waitFor({ state: 'visible', timeout: 10000 });
        await drop.waitFor({ state: 'visible', timeout: 10000 });

        const dragBox = await this.getCoordinate(drag);
        const dropBox = await this.getCoordinate(drop);

        await this.page.mouse.move(dragBox.x + dragBox.width / 2, dragBox.y + dragBox.height / 2);
        await this.page.mouse.down({ button: 'left' });
        await this.page.mouse.move(dragBox.x + dragBox.width / 2 - 5, dragBox.y + dragBox.height / 2 - 5);
        await this.page.mouse.move(dropBox.x + dropBox.width / 2, dropBox.y + dropBox.height / 2);
        await this.page.mouse.up({ button: 'left' });
    }

    async getCoordinate(element: Locator) {
        const elementBox = await element.boundingBox();
        if (!elementBox) {
            throw new Error('Element not found');
        }
        return elementBox;
    }

}