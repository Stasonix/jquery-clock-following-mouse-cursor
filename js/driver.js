$(document).ready(function() {


// Create two variable with the names of the months and days in an array
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
var ruMonth = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var ruDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];


// Create a newDate() object
var someDay = new Date();

$('#datepick').datetimepicker({
	
		onClose: function(dateText, inst) { 
				
			var mydate = dateText.split(/[.: ]/).map(Number); 
				mydate.day = mydate[0];
				mydate.month = (mydate[1] - 1);
				mydate.year = mydate[2];
				mydate.hours = mydate[3];
				mydate.minutes = mydate[4];
				
				clearInterval(secInterval);
				
				someDay = new Date();
				
				someDay.setFullYear(mydate.year);
				someDay.setDate(mydate.day);
				someDay.setHours(mydate.hours);
				someDay.setMinutes(mydate.minutes);
				someDay.setMonth(mydate.month);
				
				$.cookie( 'wDay' , wDay );				
				
				/* set cookie */
				$.cookie('date', dateText );
				
				startSec(); 
			
		},
	
	});



var secInterval;

function startSec() {

    if ($.cookie('date') != null ) { 
		
		var dateArr = $.cookie('date').split(/[.: ]/).map(Number);
			
			seconds = 0;
			aDay = dateArr[0];
			month = dateArr[1] - 1;
			year = dateArr[2];
			hours = dateArr[3];
			minutes = dateArr[4];
			wDay = $.cookie('wDay');

    }
	else {
	
		seconds = someDay.getSeconds();
		minutes = someDay.getMinutes();
		hours   = someDay.getHours();
		wDay    = someDay.getDay();
		aDay    = someDay.getDate();
		month   = someDay.getMonth();
		year   = someDay.getFullYear();

		
	}

secInterval = setInterval( function() {
	
	seconds++;
	
	if (seconds>59) { 
	
		seconds = 0; 
		
		minutes++;
		
		if (minutes > 59) {
                
            minutes = 0;
            
			hours++;
			
			if (hours > 23) {
			
			
				hours = 0;
				
				/* a day of the week */
				wDay++;
				
				if ( wDay > 6 ) {
				
					wDay = 0;
					
				}
				
				
				/* days */
				aDay++;
				
				/* months */
				switch (month) {
				
					case 0: maxDays = 31; break; // january
					case 1: maxDays = ( ( year % 4 ) == 0) ? 29 : 28 ;    break; // february
					case 2: maxDays = 31; break; // march
					case 3: maxDays = 30; break; // april
					case 4: maxDays = 31; break; // may
					case 5: maxDays = 30; break; // june
					case 6: maxDays = 31; break; // july
					case 7: maxDays = 31; break; // august
					case 8: maxDays = 30; break; // september
					case 9: maxDays = 31; break; // october
					case 10: maxDays = 30; break; // november
					case 11: maxDays = 31; break; // december
				
				}
				
				if ( aDay > maxDays ) {  
				
										
					aDay = 1 ; 
				
					month++;
					
					
					/* years */
					if ( month > 11 )
					{
						
						month = 0;
						
						year++;
					
					}
				
				}
			
			
			}
			
			
        }
	
	}

	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	
	// Add a leading zero to minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
	
	// Add a leading zero to the hours value
	$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
	
	
	// Output the day, date, month and year    
    $('#Date').html(ruDays[wDay] + " " + aDay + ' ' + ruMonth[month] + ' ' + year);
	
	},1000);


}
	
startSec();


$('table.ui-datepicker-calendar tr:first-child th span').live('click',function(){
	$('table.ui-datepicker-calendar tr:first-child th span').removeClass('highlight');
	$(this).toggleClass('highlight'); 
	txtwDay = $(this).text();
	switch (txtwDay)
	{
	
		case "Вс": wDay = 0; break;
		case "Пн": wDay = 1; break;
		case "Вт": wDay = 2; break;
		case "Ср": wDay = 3; break;
		case "Чт": wDay = 4; break;
		case "Пт": wDay = 5; break;
		case "Сб": wDay = 6; break;
	
	}
	
	$.cookie( 'wDay' , wDay );
	
});
 
 
}); 