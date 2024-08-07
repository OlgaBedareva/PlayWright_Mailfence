import { expect } from '@playwright/test'
import { test } from '../test-options'
import { PageManager } from "../pageObject/PageManager";
import { config } from '../config';

test('MailFence Test', async ({ page, clearEnvironment }) => {

  const pm = new PageManager(page)
  await pm.onHomePage().clickSignInBtn()
  await pm.onLoginPage().fillInLogInFormAndSubmit(config.testUser, config.testPassword);
  await pm.onMailPage().header.clickDocumentBtn();
  await pm.onDocumentsPage().uploadDocument(config.fullPathToFile);
  await pm.onDocumentsPage().sendEmailWithAttachedFile(config.fileNameForAttaching);
  await pm.onMailPage().sendEmail(config.testUser, config.emailSubject);
  await pm.onMailPage().reloadPage()
  expect(await pm.onMailPage().waitUntilEmailReceived(config.emailSubject)).toBeTruthy();
  await pm.onMailPage().openEmailItem(config.emailSubject)
  await pm.onMailPage().saveAttachedFileToDocuments()
  await pm.onMailPage().header.clickDocumentBtn();
  const drag = pm.onDocumentsPage().getDocumentByName(config.fileNameForAttaching)
  const drop = pm.onDocumentsPage().trashSection
  await pm.onDocumentsPage().gragAndDrop(drag, drop);
  await pm.onDocumentsPage().clickDocumentsTrashBtn();
  await pm.onTrashDocumentPage().deletedDocumentShouldBeVisible(config.fileNameForAttaching);
})





