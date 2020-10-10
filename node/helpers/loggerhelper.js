/**
  * @author """ Ahmed Kabeer Shaukat """
  * @desc """ Helping Functions for Extracting logs form log files """"
  * @independentfunctions 
  * 1- extractSingleFile(level, date)
  * 2- extractMutipleFiles(level, startDate, endDate, callback)
*/


const fs = require('fs')
const readline = require('readline');
var lineReader = require('line-reader');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const baseDir = './logs/'
const logger = require('./../config/logger');
const { response } = require('express');



const loggerHelpers = {
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   [info,error]
      * @desc """ returns base directory of logs according to level """"
      * @return  info => ./logs/error/ || error => ./logs/info/
    */

    constructDirPathByLevel(level) {
        logger.error("logger --constructDirPathByLevel(level)")
        return `./logs/${level}/`;
    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   {[info,error] , [2020-10-10]}
      * @desc """ 
      *          ~ takes a date (log files are stored with filenames as dates)
      *          ~ concatenates basepath to logs and return complete file 
      *          ~ path 
      *       """
      *         
      * @return  (info,"2020-10-10")=>"./logs/error/error_log-2020-10-20.log"
    */
    contructFileName(level, date) {
        logger.error("logger --contructFileName(level,date)")
        let fileName = `${level}_log-${date}.log`;
        return fileName;

    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (level)
      * @desc """ 
      *          ~ checks level requested is valid 
      *          ~ allowed levels 
      *          ~ [info,error]
      *       """
      *         
      * @return  (info)=>true/false
    */
    checkLevelExists(level) {
        if (level == "info" || level == "error") {
            return true;
        }
        else {
            return false;
        }
    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (path)
      * @desc """ 
      *          ~ takes complete filepath as argument and checks if  
      *          ~ the file exists
      *          ~ [info,error]
      *       """
      *         
      * @return  (./logs/error/error_log-2020-10-20.log)=>true/false
    */
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
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (path,callback)
      * @desc """ 
      *          ~ takes complete filepath as argument &  
      *          ~ reads content of file line by line adds ","
      *          ~ after and wraps whole string with "[]" 
      *          ~ so it can be parsed to JSON easily
      *       """
      * @use     ~ use to read a single file        
      * @return  (./logs/error/error_log-2020-10-20.log)=>true/false
    */
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

    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (startDate,endDate)
      * @desc """ 
      *          ~ as log files are saved as dates  
      *          ~ this function will take start and end date
      *          ~ & will consctuct all possible filenames 
      *          ~ that lies between given date ranges
      *       """     
      * @return  ['2020-10-11.log'.'2020-10-12.log','2020-10-13.log']
    */
    createMultipleFileNamesLists(startDate, endDate) {

        let formatedList = []
        const range = moment.range(startDate, endDate);
        let listDate = Array.from(range.by('day'))

        for (let i = 0; i < listDate.length; i++) {
            formatedList.push(listDate[i].format('YYYY-MM-DD'))
        }

        return formatedList;

    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (level,dateArray) -from above function
      * @desc """ 
      *          ~ get input from above function (filesnames as arary) 
      *          ~ and attaches level base dir to contrcut full files
      *          ~ paths
      *       """      
      * @return  ['2020-10-11.log'.'2020-10-12.log','2020-10-13.log']
    */
    createMultipleFilePathArray(level, dateArray) {
        let pathArray = []
        let baseDir = loggerHelpers.constructDirPathByLevel(level);
        for (let i = 0; i < dateArray.length; i++) {
            let path = loggerHelpers.contructFileName(level, dateArray[i])
            pathArray.push(`${baseDir}${path}`)
        }
        return pathArray;
    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (pathArray) ~ from above function
      * @desc """ 
      *          ~ valid for multiple files  
      *          ~ divides all filepath array in two parts 
      *          ~ (['array of files path that exist on system'] && 
      *          ~ (['array of file paths that dont eixist on system'])
      *       """      
      * @return  two seperate arrays { onlyExistPaths, unExistPaths }
    */
    seperateExistAndNoExistFiles(pathArray) {
        let onlyExistPaths = []
        let unExistPaths = []
        for (let i = 0; i < pathArray.length; i++) {
            let exist = loggerHelpers.checkFileExist(pathArray[i])
            if (exist) {
                onlyExistPaths.push(pathArray[i])

            }
            else {
                unExistPaths.push(pathArray[i])
            }

        }
        return { onlyExistPaths, unExistPaths }
    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (unExistPaths) ~ from above function
      * @desc """ 
      *          ~ valid for multiple files  
      *          ~ contrcuts a response for files that dont exits on sysytem 
      *       """      
    */
    listFilesNotFound(unExistPaths) {
        let unExistPathsArray = []
        if (unExistPaths.length >= 0) {

            for (let i = 0; i < unExistPaths.length; i++) {
                let response = {
                    "filePath": unExistPaths[i],
                    "message": unExistPaths[i],
                    "content": [],
                }
                unExistPathsArray.push(response)
            }
        }
        return unExistPathsArray




    },
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (onlyExistPaths,callback)
      * @desc """ 
      *          ~ valid for multiple files  
      *          ~ reads all existsant files and returns a 
      *          ~ carefully contructed json response
      *       """      
    */
    readAndExtract(onlyExistPaths, callback) {
        for (let i = 0; i < onlyExistPaths.length; i++) {
            loggerHelpers.readSingleFile(onlyExistPaths[i], (fileContent) => {
                //logger.error(JSON.parse(fileContent))
                let contentOfFiles = [];
                let response = {
                    "filePath": onlyExistPaths[i],
                    "content": JSON.parse(fileContent)
                }
                contentOfFiles.push(response)
                return callback(contentOfFiles)

            });

        }
    }
    ,
    /**
      * @author """ Ahmed Kabeer Shaukat """
      * @args   (level, startDate, endDate, callback)
      * @desc """ 
      *          ~ valid for multiple files
      *          ~ returns content of a multiple files 
      *          ~ along with file name and also return all files  
      *          ~ that were demanded but does not exist on sysytem 
      *       """      
    */
    extractMutipleFiles(level, startDate, endDate, callback) {
        let dateArray = loggerHelpers.createMultipleFileNamesLists(startDate, endDate)
        let pathArray = loggerHelpers.createMultipleFilePathArray(level, dateArray)
        let { onlyExistPaths, unExistPaths } = loggerHelpers.seperateExistAndNoExistFiles(pathArray)
        // console.log(onlyExistPaths)
        // console.log(unExistPaths)


        loggerHelpers.readAndExtract(onlyExistPaths, (res) => {
            let response = res
            let filesnotFound = loggerHelpers.listFilesNotFound(unExistPaths)
            //console.log(filesnotFound)
            for (let i = 0; i < filesnotFound.length; i++) {
                // console.log(filesnotFound[i])
                response.push(filesnotFound[i])
            }
            return callback(res)

        })




        // return callback(contentOfFiles)

    },
    /**
         * @author """ Ahmed Kabeer Shaukat """
         * @args   (level, date)
         * @desc """ 
         *          ~ valid for single file
         *          ~ returns content of a single file
         *          ~ 
         *       """      
   */

    extractSingleFile(level, date,callback) {
        let levelExists = loggerHelpers.checkLevelExists(level)
        if (levelExists) {
            let fileName = loggerHelpers.contructFileName(level, date);
            let dirName = loggerHelpers.constructDirPathByLevel(level);
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
                    return callback(response)
                })

            }
            else {
                let response = {
                    "status": 1,
                    "message": "Could not find file",
                    "filePath": completeFilePath
                }
                return callback(response)
            }
           
        }

        

    }

}


module.exports = loggerHelpers