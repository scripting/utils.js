//string and date utility routines for Small Picture Javascript code.
  function stringKBytes (num)  { 
		return (Math.round (num / 1024) + "K");
		}
	function sameDay (d1, d2)  { 
		d1 = new Date (d1);
		d2 = new Date (d2);
		return ((d1.getFullYear () == d2.getFullYear ()) && (d1.getMonth () == d2.getMonth ()) && (d1.getDate () == d2.getDate ()));
		}
	function dayOfWeekToString (theDay)  { 
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		return (weekday[theDay]);
		}
	function timeString (when, flIncludeSeconds)  { 
		var hour = when.getHours (), minutes = when.getMinutes (), ampm = "AM", s;
		if (hour >= 12)  { 
			ampm = "PM";
			}
		if (hour > 12)  { 
			hour -= 12;
			}
		if (minutes < 10)  { 
			minutes = "0" + minutes;
			}
		if (flIncludeSeconds)  { 
			var seconds = when.getSeconds ();
			if (seconds < 10)  { 
				seconds = "0" + seconds;
				}
			s = hour + ":" + minutes + ":" + seconds + ampm;
			}
		else  { 
			s = hour + ":" + minutes + ampm;
			}
		return (s);
		}
	function viewDate (when, flShortDayOfWeek)  { 
		var now = new Date ();
		when = new Date (when);
		if (sameDay (when, now))  { 
			return (timeString (when, false)) //2/9/13 by DW;
			}
		else  { 
			var oneweek = 1000 * 60 * 60 * 24 * 7;
			var cutoff = now - oneweek;
			if (when > cutoff)   { //within the last week
				var s = dayOfWeekToString (when.getDay ());
				if (flShortDayOfWeek)  { 
					s = s.substring (0, 2);
					}
				return (s);
				}
			else  { 
				return (when.toLocaleDateString ());
				}
			}
		}
	function isAlpha (ch)  { 
		return (((ch >= 'a') && (ch <= 'z')) || ((ch >= 'A') && (ch <= 'Z')));
		}
	function isNumeric (ch)  { 
		return ((ch >= '0') && (ch <= '9'));
		}
	function random (lower, upper)  { 
		var range = upper - lower + 1;
		return (Math.floor ((Math.random () * range) + lower));
		}
	function getRandomPassword (ctchars)  { 
		var s= "", ch;
		while (s.length < ctchars)  { 
			ch = String.fromCharCode (random (33, 122));
			if (isAlpha (ch) || isNumeric (ch))  { 
				s += ch;
				}
			}
		return (s.toLowerCase ());
		}
	function getCanonicalName (text)  { 
		var s = "", ch, flNextUpper = false;
		for (var i = 0; i < text.length; i++)  { 
			ch = text [i];
			if (isAlpha (ch) || isNumeric (ch))  { 
				if (flNextUpper)  { 
					ch = ch.toUpperCase ();
					flNextUpper = false;
					}
				else  { 
					ch = ch.toLowerCase ();
					}
				s += ch;
				}
			else  { 
				if (ch == ' ')  { 
					flNextUpper = true;
					}
				}
			}
		return (s);
		}
	function secondsSince (when)  { //2/1/13 by DW
		var now = new Date ();
		return ((now - when) / 1000);
		}
	function yesterday (when)   { //3/1/13 by DW
		if (when == undefined)  { 
			when = new Date ();
			}
		return (when - (24 * 60 * 60 * 1000));
		}
	function filledString (s, ct)  { 
		var theString = "";
		for (var i = 0; i <= ct; i++)  { 
			theString += s;
			}
		return (theString);
		}
	function deleteObject (id)  { 
		var x = document.getElementById (id);
		x.parentNode.removeChild (x);
		}
	function getURLParameter (name)  { 
		return (decodeURI ((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]));
		}
