import conf from "../conf/conf.js";
import { Client, ID, Storage } from "appwrite";

export class UploadFile {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.bucket = new Storage(this.client);
  }
  async uploadImg(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteImg(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  filePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId, 350, // width (optional)
      250,);
  }
}

const uploadFile = new UploadFile();
export default uploadFile;
