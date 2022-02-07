'use strict';

const { Service } = require('egg');
const fs = require('fs');
const path = require('path');
const cwdUpload = path.join('/www/', 'upload');

class File extends Service {
  async folder(params) {
    const pathJoin = path.join(cwdUpload, params.path);
    if (!fs.existsSync(pathJoin)) {
      fs.mkdirSync(pathJoin);
      return true;
    }
    return false;
  }
  async addition(params) {
    const { ctx } = this;
    try {
      for (const file of params.files) {
        const pathJoin = path.join(cwdUpload, params.body.path, file.filename);
        fs.writeFileSync(pathJoin, fs.readFileSync(file.filepath));
      }
      return true;
    } catch (err) {
      return false;
    } finally {
      await ctx.cleanupRequestFiles();
    }
  }
  async remove(params) {
    const pathJoin = path.join(cwdUpload, params.path);
    if (pathJoin.indexOf('.') === -1) {
      if (fs.readdirSync(pathJoin).length !== 0) {
        return false;
      }
      fs.rmdirSync(pathJoin);
    } else {
      fs.unlinkSync(pathJoin);
    }
    return true;
  }
  async obtain(params) {
    const files = fs.readdirSync(path.join(cwdUpload, params.path));
    console.log(files);
    const fileInfo = [];
    for (const file of files) {
      const suffix = path.extname(file);
      if (path.extname(file) === '') {
        fileInfo.unshift({
          name: file,
          type: suffix,
        });
      } else {
        fileInfo.push({
          name: file,
          type: suffix,
        });
      }
    }
    return fileInfo;
  }
}

module.exports = File;
