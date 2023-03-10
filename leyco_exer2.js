/*
    Name: Charlize Althea D. Leyco
    Date: March 1, 2023
    Section: UV-4L

    This program has the following functions:
    1. generateUniqueID - has two string parameters for the first name and last name
        -generates a unique id by concatenating the first letter of the first name (lowercase), the last name (lowercase), and a unique
        alphanumeric string of length 8
    2. addAccount() - has an array parameter containing 3 strings and a number for the first name, last name, email, age
        - returns true if the following conditions are true:
            i. all fields are present
            ii. the first name, last name, and email are non-empty strings
            iii. the email is in a valid format (use the validator package)
            iv. age is at least 18
        - creates a file (user.txt) if aforementioned conditions are true
            i. file has this format - first name,last name,email,age,uniqueID
*/

//imports the installed npm
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { writeFile } from 'node:fs';

//function that generates the unique id
function generateUniqueID(fname, lname) {
    var fnamelower = fname[0].toLowerCase();
    var lnamelower = lname.toLowerCase();
    var comb = ""; 
    var ran = uuidv4();
    var random = ran.substring(0,7);

    comb = fnamelower + lnamelower + random;

    return comb;
}

//function that creates and add information into a file
function addAccount(information) {
    var fname = information[0];
    var lname = information[1];
    var email = information[2];
    var age = information[3];
    var info ="";

    if(information.length == 4) {

        //checks if the first three inputs are strings and if the last input is a number
        if((typeof(fname) == 'string') && (typeof(lname) == 'string') && (typeof(email) == 'string') && (typeof(age) == 'number')) {

            //checks the first and last name are non empty strings, the age is over 18, and the email is valid
            if((fname.length > 0) && (lname.length > 0) && (age > 18) && (validator.isEmail(email))){

                //stores the information in this format <first name, last name, email, age, generatedID
                for(var i = 0; i < 4; i++) {
                    info = info + information[i] + ",";
                }
                info = info + generateUniqueID(fname, lname)

                //writes and stores info into a file
                const data = new Uint8Array(Buffer.from(info));
                writeFile('users.txt', data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export {addAccount, generateUniqueID}; 
//console.log(addAccount(["Alan", "Turing", "aturing@w3c.com", 25]));
