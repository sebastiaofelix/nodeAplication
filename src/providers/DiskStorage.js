const fs = require('fs');
const path = require('path');
const uploading = require('../config/upload');

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploading.TMP_FOLDER, file),
      path.resolve(uploading.UPLOADS_FOLDER, file),
    );

    return file;
  }

  async deleteFile(file){
    const filePath = path.resolve(uploading.UPLOADS_FOLDER, file);

    try{
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
