export const config = {
    testUser: process.env.TESTUSER as string,
    testPassword: process.env.TESTPASSWORD as string,
    timestamp: new Date().getTime(),
    get fileNameForAttaching() {
        return `attachmentFile${this.timestamp}.txt`;
    },
    get emailSubject() {
        return "mail for myself_" + config.timestamp;
    },
    fileText: "file for attaching",
    filePath: __dirname + "/testData/attachmentFiles/",
    get fullPathToFile() {
        return this.filePath + this.fileNameForAttaching;
    },

}