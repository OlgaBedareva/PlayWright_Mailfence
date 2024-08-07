import { test as base } from '@playwright/test'
import { PageManager } from './pageObject/PageManager'
import { HelperBase } from './pageObject/pages/HelperBase'
import { config } from './config';

export type TestOptions = {

    clearEnvironment: string
}

export const test = base.extend<TestOptions>({


    clearEnvironment: async ({ page }, use) => {
        await page.goto('/')
        const pm = new PageManager(page)
        await pm.loginAndClearData(config.testUser, config.testPassword);
        await HelperBase.deleteFolder(config.filePath);
        await HelperBase.createTextDocument(config.filePath, config.fileNameForAttaching, config.fileText);
        await page.goto('/')
        await use('')
    }
})