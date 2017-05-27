const express = require('express');
const app = express();

function convertMonth(value){
            switch (value) {
                case 0:
                    return "January";
                case 1:
                    return "February";
                case 2:
                    return "March";
                case 3:
                    return "April";
                case 4:
                    return "May";
                case 5:
                    return "June";
                case 6:
                    return "July";
                case 7:
                    return "August";
                case 8:
                    return "September";
                case 9:
                    return "October";
                case 10:
                    return "November";
                case 11:
                    return "December";
                case "january":
                    return 00;
                case "february":
                    return 01;
                case "march":
                    return 02;
                case "april":
                    return 03;
                case "may":
                    return 04;
                case "june":
                    return 05;
                case "july":
                    return 06;
                case "august":
                    return 07;
                case "september":
                    return 08;
                case "october":
                    return 09;
                case "november":
                    return 10;
                case "december":
                    return 11;
                default:
                    return "unknown"
            }
        };
        
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get('/', function(req,res){
    res.sendfile('index.html', {root: __dirname });
})

app.get('/:parameter', function(req,res){
    var parameter = req.params.parameter;
    var response = {};
    if (isNaN(parameter)){
        response.unix = parseInt(parameter);
        var parameterArray = parameter.split(" ");
        var month = parameterArray[0];
        var monthNumeral = convertMonth(month.toLowerCase());
        var day = parameterArray[1];
        var year = parameterArray[2]
        var fullDateNumeral = year + "-" + monthNumeral + "-" + day;
        day = String(day).slice(0, -1);
        month = capitalizeFirstLetter(month);
        response.unix = new Date(fullDateNumeral).getTime() / 1000;
        response.natural = month + " " + day + ", " + year;
        if (isNaN(response.unix)) {
            res.send("null")
        } else {
            res.send(response);
        }
    } else {
        var a = new Date(parseInt(parameter) * 1000);
        var monthNumeral = a.getMonth();
        var month = convertMonth(monthNumeral);
        var day = a.getDay();
        var year = a.getFullYear();
        response.unix = parseInt(parameter);
        response.natural = month + " " + day + ", " + year;
        res.send(response);
    }
    
})

app.listen(8080, function(){
    console.log("listening on port 8080");
})
