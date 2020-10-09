const fs = require('fs')
const readline = require('readline');
var lineReader = require('line-reader');

const baseDir = './logs/'
const logger = require('./../config/logger');
const { response } = require('express');
const loggerHelpers = {

    contructBaseDir(level) {
        logger.error("logger --contructBaseDir(level)")
        return `./logs/${level}/`;
    },

    contructFileName(level, date) {
        logger.error("logger --contructFileName(level,date)")
        let fileName = `${level}_log-${date}.log`;
        return fileName;

    },
    checkFileExist(path) {

        logger.error("logger -- checkFileExist(path)")
        try {
            if (fs.existsSync(path)) {
                logger.error("logger -- checkFileExist(path) --file found")
                return true;
            }
        } catch (err) {
            logger.error("logger -- checkFileExist(path) --file not  found")
            logger.error(path)
            return false;
        }
    },
    //Read a single File Line by Line
    readSingleFile(path, callback) {
        let stringContent = "";
        logger.error("logger --  readSingleFile(path)")
        lineReader.eachLine(`${path}`, function (line) {

            stringContent += line + ","

        }, function (err) {
            if (err) throw err;
            //remove last , from string content to avoid JSON parsing error
            stringContent = stringContent.substring(0, stringContent.length - 1);
            //add brackets to make a JSON array 
            stringContent = `[${stringContent}]`
            return callback(stringContent)
        });




    },
    createMultipleFilePathArray(level,startDate,endDate){
    
    },
    readMutipleFiles(path) {

    },
    findSingleFile(level, date) {
        let fileName = loggerHelpers.contructFileName(level, date);
        let dirName = loggerHelpers.contructBaseDir(level);
        let completeFilePath = `${dirName}${fileName}`
        let fileExist = loggerHelpers.checkFileExist(completeFilePath)
        if (fileExist) {
            loggerHelpers.readSingleFile(completeFilePath, function (fileContent) {
                //logger.error(JSON.parse(fileContent))
                let response = {
                    "status": 0,
                    "message": "success",
                    "filePath": completeFilePath,
                    "content": JSON.parse(fileContent)
                }
                return response
            })

        }
        else {
            let response = {
                "status": 1,
                "message": "Could not find file",
                "filePath": completeFilePath
            }
        }
        return response
    }


}


module.exports = loggerHelpers