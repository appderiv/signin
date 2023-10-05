var colorScheme = new Array();
colorScheme[0] = "#2E3983";
colorScheme[1] = "#228653";
colorScheme[2] = "#BF9730";
colorScheme[3] = "#BF5230";
colorScheme[4] = "#0099CC";
colorScheme[5] = "#FFCB2E";
colorScheme[6] = "#2DB300";
colorScheme[7] = "#2D00B3";
colorScheme[8] = "#F0B400";
colorScheme[9] = "#2E62FF";
colorScheme[10] = "#8600B3";
colorScheme[11] = "#668CFF";
colorScheme[12] = "#8CFF66";
colorScheme[13] = "#B32D00";
colorScheme[14] = "#00B32D";
colorScheme[15] = "#0086B3";
colorScheme[16] = "#00B386";

var coloursOperations = new Array();
coloursOperations[0] = "#135d8c";
coloursOperations[1] = "#a4300b";
coloursOperations[2] = "#179827";
coloursOperations[3] = "#FF9700";

var coloursMediaOperations = new Array();
coloursMediaOperations[0] = "#135d8c";
coloursMediaOperations[1] = "#a4300b";
coloursMediaOperations[2] = "#179827";
coloursMediaOperations[3] = "#FF9700";


// http://colorschemedesigner.com/#57427TKs9S2zp rotate 90deg
var coloursPlans = new Array();
coloursPlans[0] = "#A70069";
coloursPlans[1] = "#00974A";
coloursPlans[2] = "#D73400";
coloursPlans[3] = "#8DCA00";
coloursPlans[4] = "#D78B00";
coloursPlans[5] = "#390092";
coloursPlans[6] = "#D7C000";
coloursPlans[7] = "#00328F";


plotOptions = {
    fillOpacity:0.2,
    lineWidth:1,
    states:{
        hover:{
            lineWidth:1
        }
    },
    marker:{
        enabled:true,
        radius:2,
        states:{
            hover:{
                enabled:true,
                symbol:"circle",
                radius:4,
                lineWidth:1
            }
        }
    }
}

stackPlotOptions = plotOptions;
stackPlotOptions.stacking = 'normal';